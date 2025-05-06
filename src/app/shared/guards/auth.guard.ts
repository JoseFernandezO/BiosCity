import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/data-access/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.authService.session()).pipe(
      map(({ data }) => {
        const isLoggedIn = !!data?.session;
        if (!isLoggedIn) {
          console.log('No hay sesión, acceso público permitido');
          return true;
        } else {
          console.log('Ya hay sesión activa, redirigiendo...');
          // Aquí podrías redirigir si quieres con Router
          return false;
        }
      })
    );
  }
}


@Injectable({
  providedIn: 'root'
})


export class PrivateGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.authService.session()).pipe(
      map(({ data }) => {
        if (data?.session) {
          console.log('Sesión activa:', data.session);
          return true; // Si hay sesión, puede activar la ruta
        } else {
          console.log('No hay sesión activa');
          return false; // Si no hay sesión, no permite la ruta
        }
      })
    );
  }
}
