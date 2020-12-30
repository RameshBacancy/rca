import { SessionGuard } from './../../guard/session.guard';
import { MyInformationComponent } from './suppllier-dashboard/my-information/my-information.component';
import { TenderGuard } from './../../guard/tender.guard';
import { SubmitTenderBidsComponent } from './submit-tender-bids/submit-tender-bids.component';
import { TenderAddendumsComponent } from './tender-addendums/tender-addendums.component';
import { RegistrationOfQueriesComponent } from './registration-of-queries/registration-of-queries.component';
import { GeneralTenderDetailComponent } from './general-tender-detail/general-tender-detail.component';
import { CurrentTendersComponent } from './suppllier-dashboard/current-tenders/current-tenders.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { TenderComponent } from './tender.component';
import { ProtectGuard } from 'src/app/guard/protect.guard';

const routes: Routes = [
  {
    path: '',
    component: TenderComponent,
    canActivate: [ProtectGuard, TenderGuard, SessionGuard],
    children: [
      {
        path: 'tender-dashboard',
        children: [
          {
            path: 'current-tenders',
            component: CurrentTendersComponent
          },
          {
            path: '',
            redirectTo: '/landing/supplier-registration/dashboard',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'general-tender-details',
        loadChildren: () => import('./general-tender-detail/general-tender-detail.module').then(m => m.GeneralTenderDetailModule),
        canActivate: [SessionGuard]

      },
      {
        path: 'registration-of-queries',
        component: RegistrationOfQueriesComponent
      },
      {
        path: 'tender-addendums',
        component: TenderAddendumsComponent
      },
      {
        path: 'submit-tender-bids',
        component: SubmitTenderBidsComponent
      },
      {
        path: 'my-information',
        component: MyInformationComponent
      },
      {
        path: '',
        redirectTo: '/landing/supplier-registration/dashboard',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderRoutingModule { }
