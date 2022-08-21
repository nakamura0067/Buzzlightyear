import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzzDialogComponent } from './buzz-dialog.component';

describe('BuzzDialogComponent', () => {
  let component: BuzzDialogComponent;
  let fixture: ComponentFixture<BuzzDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuzzDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzzDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
