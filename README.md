🎯 Introducción
Bios City es una aplicación móvil desarrollada con Angular y Ionic, que permite a los usuarios reportar especies animales en su entorno, asociándolas con su ubicación geográfica. Con inteligencia artificial, las imágenes tomadas por los usuarios son analizadas para identificar especies, especialmente las en peligro de extinción.

La app busca conectar a los ciudadanos con ONGs y organizaciones ambientales para mejorar la conservación de la biodiversidad.

📌 Propósito del Proyecto
El propósito de Bios City es resolver la dificultad para reportar especies, especialmente aquellas en peligro de extinción, debido a la falta de canales de comunicación eficaces y al desconocimiento de la fauna local.

Bios City tiene como objetivos:

Facilitar la recolección de datos sobre fauna silvestre.

Alertar sobre especies en riesgo.

Conectar a ciudadanos con ONGs para la conservación.

Crear conciencia sobre la biodiversidad urbana.

🧰 Tecnologías Usadas
Frontend: Angular + Ionic Framework

Backend / Servicios: Supabase (Base de datos y autenticación)

Lenguaje: TypeScript

IDE: Visual Studio Code (Ionic), IntelliJ IDEA (Integración con Supabase)

Servicios Complementarios:
Supabase Storage: Para el almacenamiento y subida de imágenes.

Geolocalización (HTML5 / Capacitor Plugins): Para obtener la ubicación del usuario.

IA para Identificación de Especies: En desarrollo, para identificar especies en las imágenes.

💻 Entorno de Desarrollo
Node.js v18+

Ionic CLI v7+

Angular CLI v16+

Supabase CLI (opcional)

Capacitor para acceso a cámara y ubicación

IDEs recomendados: IntelliJ IDEA y Visual Studio Code

🗂️ Estructura de Archivos
plaintext
Copiar
src
  app
    auth
      data-access
        auth-service.ts
      features
        auth-log-in
          auth-log-in.component.scss
          auth-log-in.component.spec.ts
          auth-log-in.component.ts
          auth-log-in.component.html
        auth-sign-up
          auth-sign-up.component.scss
          auth-sign-up.component.spec.ts
          auth-sign-up.component.ts
          auth-sign-up.component.html
    notes
      data-access
        notes.service.ts
      features
        note-list
          note-list.component.html
          note-list.component.spec.ts
          note-list.component.ts
        note-shell
          note-routing.ts
    shared
      data-access
        supabase.service.ts
      guards
        auth.guards.ts
    app.component.scss
    app.component.spec.ts
    app.component.ts
    app.config.ts
    app.routes.ts
    app-routing.module.ts
  assets
  environments
📷 Funcionamiento General
Inicio de sesión o registro: Los usuarios se autentican utilizando Supabase Auth.

Acceso a la cámara: El usuario toma una foto de una especie.

Geolocalización: Se obtiene la ubicación GPS del usuario al momento de la captura.

Subida a la nube: La imagen se sube automáticamente a Supabase Storage.

Registro en la base de datos: Los datos (imagen, ubicación, usuario) se almacenan en la base de datos.

Visualización de notas y reportes: Los usuarios pueden ver los reportes y notas en la aplicación.

🙌 Contribuciones
¡Nos encantaría contar con tu ayuda! Si estás interesado en colaborar, puedes:

Proponer mejoras en la identificación de especies.

Ayudar con el diseño de UI/UX.

Mejorar la seguridad y el rendimiento del sistema.

Para contribuir, haz un fork del repositorio y crea un pull request con tus cambios.
