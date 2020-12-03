import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { OpenTendersComponent } from './open-tenders/open-tenders.component';
import { TenderComponent } from './tender.component';

const routes: Routes = [
  {
    path: 'tender_dashboard',
    loadChildren: () => import('../landing/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: TenderComponent,
        children: [
          {
            path: 'current_tenders',
            component: OpenTendersComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
