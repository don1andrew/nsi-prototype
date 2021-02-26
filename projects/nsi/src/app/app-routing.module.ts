import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartViewComponent} from './start-view/start-view.component';
import {InsuranceTypesComponent} from './insurance-types/insurance-types.component';
import {HandbooksListComponent} from './handbooks-list/handbooks-list.component';

const routes: Routes = [
  { path: '', component: StartViewComponent },
  { path: 'list', component: HandbooksListComponent },
  { path: 'insurance_types', component: InsuranceTypesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
