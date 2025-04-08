import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../shared/data-access/supabase.service';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _supabaseClient = inject(SupabaseService).supabaseClient;

  session() {
    return this._supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  async logIn(credentials: SignUpWithPasswordCredentials) {
    alert('Paso 3.1: Entra al AuthService.logIn');
    const { data, error } = await this._supabaseClient.auth.signInWithPassword(credentials);

    if (error) {
      alert('Paso 3.2: Error al iniciar sesión');
      console.error('Error al iniciar sesión', error.message);
    } else {
      alert('Paso 3.3: Login exitoso en Supabase');
      console.log('Login exitoso:', data);
    }

    return { data, error };
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }
}
