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
