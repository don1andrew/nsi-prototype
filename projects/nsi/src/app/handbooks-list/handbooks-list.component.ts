import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-handbooks-list',
  templateUrl: './handbooks-list.component.html',
  styleUrls: ['./handbooks-list.component.css']
})
export class HandbooksListComponent implements OnInit {

  dt: Date = new Date();


  constructor() { }

  ngOnInit(): void {
  }

}
