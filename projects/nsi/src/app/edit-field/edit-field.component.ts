import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../SERVICES/data.service';
import { UserSessionService } from '../SERVICES/user-session.service';
import { HeaderData } from '../tsfiles/mock-table-data-ext';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', './edit-field.component.css']
})
export class EditFieldComponent implements OnInit {

  public field!: HeaderData;
  public confirmPopup = false;

  constructor(private router: Router, private userSession: UserSessionService, private dataService: DataService) { }

  ngOnInit(): void {
    const id = this.userSession.getFieldId();
    if (id !== null) {
      this.field = this.dataService.getField(id);
    }
  }
  onEdit(): void {
    this.dataService.editField(this.userSession.getFieldId(), this.field);
    this.router.navigate(['/insurance_types']);
  }
  onRemove(): void {
    this.confirmPopup = true;
  }
  removeField(): void {
    this.dataService.deleteField(this.userSession.getFieldId());
    this.router.navigate(['/insurance_types']);
  }

}
