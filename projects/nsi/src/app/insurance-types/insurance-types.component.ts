import { Component, OnInit } from '@angular/core';

import { DataService } from '../SERVICES/data.service';
import { UserSessionService } from "../SERVICES/user-session.service";
import { IHandbookRow } from "../tsfiles/mock-table-data";

@Component({
  selector: 'app-insurance-types',
  templateUrl: './insurance-types.component.html',
  styleUrls: ['./insurance-types.component.css']
})

export class InsuranceTypesComponent implements OnInit {

  private tableData: IHandbookRow[] = [];
  displayData: IHandbookRow[] = [];
  currentUser?: string;
  currentRole?: string;
  tableNav  = { current: 1, total: 1 }

  constructor(private dataService: DataService, private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.currentUser = this.userSession.getCurrentUser();
    this.currentRole = this.userSession.getCurrentRole();
    this.tableData = this.dataService.getData();
    this.displayData = this.tableData.slice(0, 10);

  }
  onTableNavigation(type: string, page: string='0'): void {
    switch (type) {
      case 'top-left':
        
        break;
      case 'top-right':
        break;
      case 'left':
        break;
      case 'right':

        break;
      case 'input':
        parseInt(page);
        console.log(`Page input: ${page}`);
        break;
    
      default:
        break;
    }
    console.log(`Page: ${this.tableNav.current}`);
  }


  public debug(): void {
    console.log(Date.now());

  }

}
