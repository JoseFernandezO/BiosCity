import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- nuevo


import { Note, NotesService } from '../../data-access/notes.service';
import { AuthService } from '../../../auth/data-access/auth.service';

interface NoteForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-note-list',
  standalone: true,

  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './note-list.component.html',
  styles: ``,
})
export default class NoteListComponent implements AfterViewInit, OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  notesService = inject(NotesService);

  noteSelected: Note | null = null;

  form = this._formBuilder.group<NoteForm>({
    title: this._formBuilder.control(null, Validators.required),
    description: this._formBuilder.control(null),
  });

  cameraPermissionGranted = false;
  locationPermissionGranted = false;
  errorMessage: string | null = null;

  async logOut() {
    await this._authService.signOut();
    this._router.navigateByUrl('/auth/log-in');
  }

  ngOnInit(): void {
    this.requestPermissions();
  }

  ngAfterViewInit() {
    this.notesService.getAllNotes();
  }

  requestPermissions() {
    // Pedir permiso de cámara
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.cameraPermissionGranted = true;
        stream.getTracks().forEach(track => track.stop()); // Paramos la cámara después de pedir permiso
      })
      .catch(err => {
        this.errorMessage = 'No se pudo acceder a la cámara: ' + err.message;
      });

    // Pedir permiso de ubicación
    navigator.geolocation.getCurrentPosition(
      position => {
        this.locationPermissionGranted = true;
      },
      error => {
        this.errorMessage = 'No se pudo acceder a la ubicación: ' + error.message;
      }
    );
  }

  goToDeviceUsage() {
    this._router.navigate(['/device-usage']); // ← esta ruta la configuraremos luego
  }

  newNote() {
    if (this.form.invalid) return;

    if (this.noteSelected) {
      // Editar
      this.notesService.updateNote({
        title: this.form.value.title ?? '',
        description: this.form.value.description!,
        id: this.noteSelected.id,
      });
    } else {
      this.notesService.insertNote({
        title: this.form.value.title ?? '',
        description: this.form.value.description!,
      });
    }

    this.form.reset();
    this.noteSelected = null;
  }

  editNote(note: Note) {
    this.noteSelected = note;

    this.form.setValue({
      title: this.noteSelected.title,
      description: this.noteSelected.description,
    });
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note.id);
  }
}
