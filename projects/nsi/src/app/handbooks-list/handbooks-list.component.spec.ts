import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbooksListComponent } from './handbooks-list.component';

describe('HandbooksListComponent', () => {
  let component: HandbooksListComponent;
  let fixture: ComponentFixture<HandbooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandbooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandbooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
