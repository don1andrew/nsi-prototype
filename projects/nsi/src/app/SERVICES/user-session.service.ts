import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private userRoles: string[] = ['Корректировщик справочников',
    'Оператор', 'Руководитель'];

  private currentUser = 'operator';
  // tslint:disable-next-line:no-inferrable-types
  private currentRole: string = this.userRoles[0];

  private recordId: number | null = null;


  constructor() {
  }

  getCurrentUser(): string {
    return this.currentUser;
  }
  setCurrentUser(val: string): void {
    this.currentUser = val;
  }
  getCurrentRole(): string {
    return this.currentRole;
  }
  setCurrentRole(val: string): void {
    this.currentRole = val;
  }
  passRecordId(id: number | null): void {
    this.recordId = id;
  }
  getRecordId(): number | null {
    return this.recordId;
  }
}
