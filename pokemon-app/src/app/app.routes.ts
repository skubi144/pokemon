import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES)},
  {path: 'pokedex', loadChildren: () => import('../feature/pokedex/routing').then(m => m.routes)},
  {path: 'team-builder', loadChildren: () => import('../feature/team-builder/routing').then(m => m.routes)},
  {path: 'statistics', loadChildren: () => import('../feature/statistics/routing').then(m => m.routes)},
];
