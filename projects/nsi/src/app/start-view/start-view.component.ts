import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../SERVICES/user-session.service';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})
export class StartViewComponent implements OnInit {

  currentUser!: string;
  currentRole!: string;

  constructor(private userSession: UserSessionService) { }

  ngOnInit(): void {
    this.currentUser = this.userSession.getCurrentUser();
  }
  onStartButton(value: string): void {
    this.userSession.setCurrentRole(value);
    console.log(`starts with role: ${value}`);
  }
  debug(): void {
    console.log(`Selected: `);
  }

}
