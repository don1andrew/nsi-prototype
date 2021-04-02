import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceHttp } from '../SERVICES/data.service';
import { UserSessionService } from '../SERVICES/user-session.service';
import { HeaderData } from '../tsfiles/mock-table-data-ext';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', './edit-field.component.css']
})
export class EditFieldComponent implements OnInit {

  public valid = true;
  public field: HeaderData = { name: '', type: '', description: ''};
  public confirmPopup = false;

  constructor(private router: Router, private userSession: UserSessionService, private dataService: DataServiceHttp) { }

  ngOnInit(): void {
    const id = this.userSession.getFieldId();
    if (id !== null) {
      this.dataService.getField(id).subscribe(el => {
        this.field = el;
      });
    }
  }
  onEdit(): void {
    this.dataService.editField(this.userSession.getFieldId(), this.field).subscribe(resp => {
      console.log('field edited');
      this.router.navigate(['/insurance_types']);
    });
  }
  onRemove(): void {
    this.confirmPopup = true;
  }
  removeField(): void {
    this.dataService.deleteField(this.userSession.getFieldId()).subscribe(resp => {
      this.router.navigate(['/insurance_types']);
    });
  }

}
