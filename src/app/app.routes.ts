import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
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
      },
      {
        path: 'articles',
        loadComponent: () => import('./features/articles/articles.component').then(m => m.ArticlesComponent)
      },
      {
        path: 'articles/:id',
        loadComponent: () => import('./features/articles/articles.component').then(m => m.ArticlesComponent)
      }
    ]
  },

  // Authentication Route
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  // Protected Admin Dashboard Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'services',
        loadComponent: () => import('./features/admin/services-mgmt/services-mgmt.component').then(m => m.ServicesMgmtComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/categories-mgmt/categories-mgmt.component').then(m => m.CategoriesMgmtComponent)
      },
      {
        path: 'articles',
        loadComponent: () => import('./features/admin/articles-mgmt/articles-mgmt.component').then(m => m.ArticlesMgmtComponent)
      },
      {
        path: 'guides',
        loadComponent: () => import('./features/admin/guides-mgmt/guides-mgmt.component').then(m => m.GuidesMgmtComponent)
      },
      {
        path: 'faqs',
        loadComponent: () => import('./features/admin/faqs-mgmt/faqs-mgmt.component').then(m => m.FaqsMgmtComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./features/admin/messages-mgmt/messages-mgmt.component').then(m => m.MessagesMgmtComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users-mgmt/users-mgmt.component').then(m => m.UsersMgmtComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/admin/settings-mgmt/settings-mgmt.component').then(m => m.SettingsMgmtComponent)
      }
    ]
  },

  // Fallback
  {
    path: '**',
    redirectTo: ''
  }
];
