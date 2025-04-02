Pasos para realizar el login.
- Instalar el json server con npm install -g json-server
- Posterior a instalar debes ejecutarlo en una terminal la siguiente sentencia json-server --watch db.json
- crear un archivo json para ejecutar como el ejemplo db.json
  - crear un interface a base del json que vayan a crear
- en el main.ts deben colocar  provideHttpClient()
- en el app.routes deben colocar las direcciones de las paginas que vayan a crear, en este caso utilizaremos dos, el home como el login, tambien el registro
- import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  }
];

