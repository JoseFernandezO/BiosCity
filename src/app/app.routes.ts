import { Routes } from '@angular/router';
import { PrivateGuard, PublicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    loadChildren: () => import('./auth/features/auth-shell/auth-routing'),
  },
  {
    path: '',
    canActivate: [PrivateGuard],
    loadChildren: () => import('./notes/features/note-shell/note-routing'),
  },

  {
    path: '**',
    redirectTo: 'auth/log-in', // o donde tengas tu pantalla de login
  }

];
