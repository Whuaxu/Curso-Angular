# Proyecto Angular (curso de Fernando Herrera)

Resumen breve
- Proyecto creado como parte del curso de Fernando Herrera (YouTube).  
- Contiene dos carpetas principales:
  - `bases/` — ejercicios base y ejemplos más simples para aprender conceptos.
  - `gifs-app/` — proyecto más completo (aplicación de gifs) que integra rutas, servicios y consumo de API.

Estructura destacada (resumen)
- bases/: proyectos de práctica y componentes básicos.
- gifs-app/:
  - src/app/ : código de la app (components, pages, services, etc.)
  - src/environments/ : variables de entorno (actualmente contiene la API key)
  - public/, index.html, main.ts, styles.css, etc.

Requisitos
- Node.js (LTS)
- npm o yarn
- Angular CLI (opcional para ciertas tareas): npm i -g @angular/cli

Instalación y ejecución (desde la raíz del proyecto o dentro de la carpeta que quieras)
```bash
# desde /home/alia/Documentos/angular/gifs-app
npm install
ng serve  
# abrir http://localhost:4200
```

Notas sobre la API key
- Actualmente la API key de Giphy está en `src/environments/environment.ts`. Deberás crear el archivo y añadir tu RUL de Giphy junto a tu API key
- Recomendado:
  1. Mover la clave a variables de entorno en el servidor (backend) y exponer solo un endpoint proxy.
  2. Si necesitas mantenerla en el build, usar un `.env` en la raíz y no subirlo a git.
- Añadir a `.gitignore`:
  ```
  /src/environments/environment.ts
  .env
  ```
- Si el fichero ya está versionado, quitarlo del índice:
  ```bash
  git rm --cached src/environments/environment.ts
  git add .gitignore
  git commit -m "Ignore environment with API keys"
  ```

Archivos importantes (gifs-app)
- src/app/gifs/components/ — componentes UI (side-menu, gif-list, etc.)
- src/app/gifs/pages/ — páginas (trending, search, dashboard)
- src/app/gifs/services/gifs.ts — servicio que consume la API de Giphy
- src/environments/environment.ts — actualmente contiene la API key (mover/ignorar)

Consejos rápidos
- Para centrar texto en componentes usa CSS (text-align: center o flexbox).
- Verifica rutas en los enlaces del side menu: usa rutas absolutas (`/dashboard/trending`) o relativas correctas según el componente.

Deployment
https://cursoangularalia.netlify.app/dashboard