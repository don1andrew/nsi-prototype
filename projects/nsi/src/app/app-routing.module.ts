import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartViewComponent} from './start-view/start-view.component';
import {InsuranceTypesComponent} from './insurance-types/insurance-types.component';
import {HandbooksListComponent} from './handbooks-list/handbooks-list.component';
import {AddRecordComponent} from './add-record/add-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';

const routes: Routes = [
  { path: '', component: StartViewComponent },
  { path: 'list', component: HandbooksListComponent },
  { path: 'insurance_types', component: InsuranceTypesComponent, },
  { path: 'insurance_types/add-record', component: AddRecordComponent },
  { path: 'insurance_types/edit-record', component: EditRecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
