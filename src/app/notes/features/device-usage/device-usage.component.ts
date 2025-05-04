import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaptureService } from '../../../notes/data-access/captures.service';

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
    this.requestCamera();
    this.requestLocation();
  }

  async requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoRef.nativeElement.srcObject = stream;
    } catch (err) {
      alert('No se pudo acceder a la cámara');
      console.error(err);
    }
  }

  requestLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      },
      (err) => {
        alert('No se pudo obtener la ubicación');
        console.error(err);
      }
    );
  }

  async takePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoRef.nativeElement.videoWidth;
    canvas.height = this.videoRef.nativeElement.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(this.videoRef.nativeElement, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    this.photoDataUrl = dataUrl;

    const blob = await (await fetch(dataUrl)).blob();

    try {
      await this.captureService.uploadPhotoWithLocation(blob, this.location!);
      alert('✅ Foto guardada con éxito');
    } catch (error) {
      alert('❌ Error al guardar la foto');
      console.error(error);
    }
  }

  goBackToMenu() {
    this.router.navigateByUrl('/');
  }
}
