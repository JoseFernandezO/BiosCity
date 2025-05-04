import { Injectable } from '@angular/core';
import { SupabaseService } from '../../shared/data-access/supabase.service';

@Injectable({ providedIn: 'root' })
export class CaptureService {
  constructor(private supabaseService: SupabaseService) {}

  async uploadPhotoWithLocation(blob: Blob, location: { lat: number; lng: number }) {
    const fileName = `photo-${Date.now()}.jpg`;

    const { data: uploadData, error: uploadError } = await this.supabaseService.supabaseClient
      .storage
      .from('photos')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Error al subir la imagen:', uploadError.message);
      throw uploadError;
    }

    const { data: urlData } = this.supabaseService.supabaseClient
      .storage
      .from('photos')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const { error: insertError } = await this.supabaseService.supabaseClient
      .from('captures')
      .insert({
        photo_url: publicUrl,
        latitude: location.lat,
        longitude: location.lng,
      })


    if (insertError) {
      alert('Error insertando en la tabla: ' + insertError.message);
      console.error('📛 Supabase insert error:', insertError);
      throw insertError;
    }


    console.log('✅ Foto y datos insertados correctamente');
  }
}
