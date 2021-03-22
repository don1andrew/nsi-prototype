import {Component, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['../insurance-types/insurance-types.component.css', '../add-record/add-record.component.css',
    './confirm-action.component.css']
})
export class ConfirmActionComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  @Output() closed = new EventEmitter();
  @Output() confirmed = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onConfirm(): void {
    this.confirmed.emit();
    this.closed.emit();
  }
  onCancel(): void {
    this.closed.emit();
  }

}
