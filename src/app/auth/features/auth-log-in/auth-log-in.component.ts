import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../data-access/auth.service';


interface LogInForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

@Component({
  selector: 'app-auth-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-log-in.html',
  styleUrl: './auth-log-in.component.scss',
})
export default class AuthLogInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<LogInForm>({
    email: this._formBuilder.control(null, [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control(null, [Validators.required]),
  });

  async submit() {
    alert('Paso 1: Entrando a submit()');

    if (this.form.invalid) {
      alert('Paso 2: Formulario inválido');
      return;
    }

    alert('Paso 3: Formulario válido');

    try {
      const email = this.form.value.email ?? '';
      const password = this.form.value.password ?? '';

      alert('Paso 4: Datos que se enviarán\n' + email + '\n' + password);

      const { error, data } = await this._authService.logIn({
        email,
        password,
      });

      alert('Paso 5: Respuesta recibida');

      if (error) {
        alert('Paso 6: Error recibido\n' + error.message);
        throw error;
      }

      alert('Paso 7: Login exitoso, redirigiendo...');
      this._router.navigateByUrl('/');
    } catch (error) {
      alert('Paso 8: catch atrapó un error');
      if (error instanceof Error) {
        alert('Paso 9: Error: ' + error.message);
        console.error('Error de login:', error);
      }
    }
  }

  debug(paso: number) {
    alert('Paso ' + paso);
  }

}
