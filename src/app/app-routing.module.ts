import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ProtectGuard } from './guard/protect.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/supplier-registration',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
    // canActivate: [ProtectGuard],
  },
  {
    path: 'e-tendering',
    loadChildren: () => import('./pages/tender/tender.module').then(m => m.TenderModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', redirectTo: '/auth/supplier-registration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
