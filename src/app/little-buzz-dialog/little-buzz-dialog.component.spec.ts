import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleBuzzDialogComponent } from './little-buzz-dialog.component';

describe('LittleBuzzDialogComponent', () => {
  let component: LittleBuzzDialogComponent;
  let fixture: ComponentFixture<LittleBuzzDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LittleBuzzDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LittleBuzzDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
