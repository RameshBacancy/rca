import { SubmitTenderBidsComponent } from './submit-tender-bids/submit-tender-bids.component';
import { TenderAddendumsComponent } from './tender-addendums/tender-addendums.component';
import { RegistrationOfQueriesComponent } from './registration-of-queries/registration-of-queries.component';
import { GeneralTenderDetailComponent } from './general-tender-detail/general-tender-detail.component';
import { CurrentTendersComponent } from './suppllier-dashboard/current-tenders/current-tenders.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { TenderComponent } from './tender.component';

const routes: Routes = [
  {
    path: '',
    component: TenderComponent,
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
        component: GeneralTenderDetailComponent
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
