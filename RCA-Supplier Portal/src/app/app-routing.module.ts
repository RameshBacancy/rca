import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ProtectGuard } from './guard/protect.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    // loadChildren: './authentication/authentication.module#AuthenticationModule',
    // canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
    // loadChildren: './pages/landing/landing.module#LandingModule',
    //  canActivate: [ProtectGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
