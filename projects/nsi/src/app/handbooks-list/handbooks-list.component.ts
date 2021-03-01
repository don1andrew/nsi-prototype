import { Component, OnInit } from '@angular/core';

import { UserSessionService } from "../SERVICES/user-session.service";

@Component({
  selector: 'app-handbooks-list',
  templateUrl: './handbooks-list.component.html',
  styleUrls: ['./handbooks-list.component.css']
})
export class HandbooksListComponent implements OnInit {

  dt: Date = new Date();
  currentUser?: string;
  currentRole?: string;


  constructor(public userSession: UserSessionService) { }

  ngOnInit(): void {
    this.currentUser = this.userSession.getCurrentUser();
    this.currentRole = this.userSession.getCurrentRole();
  }

}
