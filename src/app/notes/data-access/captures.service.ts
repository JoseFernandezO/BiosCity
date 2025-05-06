import { Injectable } from '@angular/core';
import { SupabaseService } from '../../shared/data-access/supabase.service';

@Injectable({ providedIn: 'root' })
export class CaptureService {
  constructor(private supabaseService: SupabaseService) {}


  getSession() {
    return this.supabaseService.supabaseClient.auth.getSession();
  }

  async uploadPhotoWithLocation(blob: Blob, location: { lat: number; lng: number }) {
    const fileName = `photo-${Date.now()}.jpg`;
    console.log('🗂️ Subiendo imagen a Supabase Storage con nombre:', fileName);

    const { data: uploadData, error: uploadError } = await this.supabaseService.supabaseClient
      .storage
      .from('photos')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        upsert: true
      });


    if (uploadError) {
      console.error('❌ Error al subir la imagen:', uploadError.message);
      throw uploadError;
    }

    console.log('✅ Imagen subida correctamente');

    const { data: urlData } = this.supabaseService.supabaseClient
      .storage
      .from('photos')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;
    console.log('🔗 URL pública obtenida:', publicUrl);

    console.log('📝 Insertando registro en tabla "captures"...');
    const { error: insertError } = await this.supabaseService.supabaseClient
      .from('captures')
      .insert({
        photo_url: publicUrl,
        latitude: location.lat,
        longitude: location.lng,

      });

    if (insertError) {
      console.error('📛 Error al insertar en la tabla:', insertError);
      alert('❌ Supabase insert error:\n' + JSON.stringify(insertError, null, 2));
      throw insertError;
    }

    console.log('✅ Foto y datos insertados correctamente en Supabase');
  }
}
