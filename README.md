# SocialBalance - Proyecto en Angular

**Angular** es un framework de desarrollo web basado en TypeScript creado por Google. Está diseñado para crear aplicaciones de una sola página (SPA) de manera eficiente y escalable. Angular se basa en componentes reutilizables, inyección de dependencias, enlace de datos bidireccional, y un potente sistema de enrutamiento.

Este proyecto está construido usando **Angular versión 20**. A continuación, se describe la estructura general del proyecto, cómo se organizan los componentes, cómo se manejan los estilos, y las funcionalidades principales con TypeScript.

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/         # Componentes reutilizables como header y footer
│   │   ├── header/
│   │   └── footer/
│   ├── pages/              # Páginas principales
│   │   ├── home/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── register/
│   │   └── terms/
│   ├── app.config.ts       # Configuración de rutas
│   └── app.component.ts    # Componente raíz
├── assets/                 # Imágenes, íconos, fuentes
└── styles.scss             # Estilos globales
```

---

## 🧱 Componentes

Los componentes están divididos en dos categorías:

- **`components/`**: contiene elementos reutilizables como el `header` y `footer`.
- **`pages/`**: contiene las vistas completas como `home`, `about`, `contact`, etc.

Cada componente tiene su propia carpeta con los archivos:

- `.ts`: lógica del componente
- `.html`: estructura de la vista
- `.scss`: estilos específicos del componente

---

## 🎨 Estilos CSS

Los estilos se manejan de forma modular:

- `styles.css` define variables y estilos globales (colores, fuentes, reset).
- Cada componente tiene su propio archivo `.css` con estilo encapsulado.
- Se utiliza `@media` queries para diseño **responsive**.

Paleta de colores utilizada:

- `#2B7A78` (verde turquesa): fondo principal
- `#1C4C4C` (verde profundo): contrastes y bloques secundarios
- `#3E7C74` (verde petróleo): detalles elegantes
- `#FFFFFF` (blanco): textos sobre fondos oscuros
- `#121721` (negro): textos sobre fondos claros

---

## 🔀 Enrutamiento (Routing)

Angular 20 usa `app.routes.ts` para definir rutas. Ejemplo:

```ts
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Terms } from './pages/terms/terms';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: 'terms', component: Terms },
    { path: 'register', component: Register },
    { path: '**', redirectTo: '' } // Redireccionar a la página de inicio para rutas no encontradas
];
```

El archivo `app.config.ts` es donde se importa y configura el enrutamiento de manera centralizada.

---

## 📩 Formularios y Validaciones

Para formularios, se utiliza `FormsModule` con `[(ngModel)]` para el two-way binding. Se aplican validaciones en tiempo real:

### Ejemplo de HTML:
```html
<div class="form-group">
  <input type="text" name="username" ngModel placeholder="Nombre de Usuario" required #username="ngModel" />
    @if (username.invalid && username.touched) {
      <div class="error">Campo obligatorio</div>
    }
</div>
```

### Lógica en TypeScript:
```ts
formSubmitted = false;
formAttempted = false;
captchaChecked = false;

onSubmit(form: NgForm) {
  this.formAttempted = true;

  if (form.valid && this.captchaChecked) {
    this.formSubmitted = true;

    form.resetForm();
    this.captchaChecked = false;

    // Ocultar el mensaje después de unos segundos
    setTimeout(() => {
      this.formSubmitted = false;
      this.formAttempted = false;
    }, 5000);
  }
}
```

---

## 🚀 Despliegue con GitHub y Netlify

### Paso 1: Subir a GitHub
1. Inicializa un repositorio:
```bash
git init
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/usuario/repositorio.git
git push -u origin main
```

### Paso 2: Construir el proyecto
```bash
ng build --configuration production
```
Esto genera los archivos en:
```
dist/social-balance/browser/
```

### Paso 3: Conectar Netlify
1. Entra a [Netlify](https://www.netlify.com/)
2. Crea un nuevo sitio con la opción **Importar desde Git**
3. Elige GitHub y selecciona el repositorio
4. Configura:
   - **Framework**: Angular
   - **Build command**: `ng build --configuration production`
   - **Publish directory**: `dist/social-balance/browser`

Netlify construirá y desplegará tu proyecto automáticamente.

Desarrollado por el: **Grupo 5**