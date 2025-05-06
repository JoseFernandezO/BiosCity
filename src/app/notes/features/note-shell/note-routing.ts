import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../note-list/note-list.component').then(m => m.default),
  },
  {
    path: 'device-usage',
    loadComponent: () =>
      import('../device-usage/device-usage.component').then(m => m.DeviceUsageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
] as Routes;
