import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
      {
        path: 'catalogue',
        loadComponent: () => import('./pages/catalog/catalog').then((m) => m.Catalog),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./libraryui/components/courses-dashboard/courses-dashboard').then(
        (m) => m.CoursesDashboard,
      ),
  },
  { path: 'panier', loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart) },
  {
    path: 'confirmation',
    loadComponent: () => import('./pages/confirmation/confirmation').then((m) => m.Confirmation),
  },
  { path: '**', redirectTo: '' },
];
