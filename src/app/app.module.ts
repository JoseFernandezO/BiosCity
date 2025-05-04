import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Aquí defines las rutas
import { AppComponent } from './app.component';

@NgModule({
  declarations: [], // ← Standalone components no se declaran aquí
  imports: [
    BrowserModule,
    AppRoutingModule, // ← Rutas que cargan componentes standalone
  ],
  bootstrap: [AppComponent], // ← Este es el componente raíz
})
export class AppModule {}
