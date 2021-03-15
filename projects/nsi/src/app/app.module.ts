import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartViewComponent } from './start-view/start-view.component';
import { InsuranceTypesComponent } from './insurance-types/insurance-types.component';
import { HandbooksListComponent } from './handbooks-list/handbooks-list.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { EditFieldComponent } from './edit-field/edit-field.component';

@NgModule({
  declarations: [
    AppComponent,
    StartViewComponent,
    InsuranceTypesComponent,
    HandbooksListComponent,
    AddRecordComponent,
    EditRecordComponent,
    AddFieldComponent,
    EditFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
