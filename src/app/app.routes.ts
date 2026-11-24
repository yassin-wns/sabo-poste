import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public Portal Routes
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent)
      },
      {
        path: 'horaires',
        loadComponent: () => import('./features/horaires/horaires.component').then(m => m.HorairesComponent)
      },
      {
        path: 'd17',
        loadComponent: () => import('./features/d17/d17.component').then(m => m.D17Component)
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
      },
      {
        path: 'faq',
        loadComponent: () => import('./features/faq/faq.component').then(m => m.FaqComponent)
      }
    ]
  },

  // Authentication Route (Figure 9)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  // Protected Admin Dashboard Route (Figure 10)
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/dashboard',
    redirectTo: 'admin',
    pathMatch: 'full'
  },

  // Wildcard Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
