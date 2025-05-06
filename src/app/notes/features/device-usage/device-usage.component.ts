import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaptureService } from '../../data-access/captures.service';
import { SupabaseService } from '../../../shared/data-access/supabase.service';



@Component({
  selector: 'app-device-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.scss']
})
export class DeviceUsageComponent implements OnInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

  photoDataUrl: string | null = null;
  location: { lat: number; lng: number } | null = null;

  constructor(
    private router: Router,
    private captureService: CaptureService
  ) {}

  ngOnInit() {
    console.log('🟡 Iniciando componente: DeviceUsageComponent');
    this.requestCamera();
    this.requestLocation();

    this.captureService.getSession().then((result) => {
      console.log('🧪 Sesión actual:', result);
    });


  }





  async requestCamera() {
    try {
      console.log('📸 Solicitando acceso a la cámara...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoRef.nativeElement.srcObject = stream;
      console.log('✅ Cámara activada con éxito');
    } catch (err) {
      console.error('❌ No se pudo acceder a la cámara:', err);
      alert('No se pudo acceder a la cámara');
    }
  }

  requestLocation() {
    console.log('📍 Solicitando ubicación del usuario...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        console.log('✅ Ubicación obtenida:', this.location);
      },
      (err) => {
        console.error('❌ Error al obtener la ubicación:', err);
        alert('No se pudo obtener la ubicación');
      }
    );
  }

  async takePhoto() {


    console.log('📷 Tomando foto desde video...');
    const canvas = document.createElement('canvas');
    canvas.width = this.videoRef.nativeElement.videoWidth;
    canvas.height = this.videoRef.nativeElement.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(this.videoRef.nativeElement, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    this.photoDataUrl = dataUrl;

    console.log('🧪 Convirtiendo foto a Blob...');
    const blob = await (await fetch(dataUrl)).blob();


    const sessionResult = await this.captureService.getSession();
    console.log('🧪 Sesión Supabase:', sessionResult);

    if (!sessionResult.data.session) {
      alert('⚠️ No hay sesión activa. Debes iniciar sesión antes de guardar la foto.');
      return;
    }



    try {
      await this.captureService.uploadPhotoWithLocation(blob, this.location!);
      alert('✅ Foto guardada con éxito');
    } catch (error) {
      alert('❌ Error al guardar la foto:\n' + JSON.stringify(error, null, 2));
      console.error('📛 Error detallado:', error);
    }

  }

  goBackToMenu() {
    this.router.navigateByUrl('/');
  }
}
