import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCheckInOutWidgetComponent } from './next-check-in-out-widget.component';

describe('NextCheckInOutWidgetComponent', () => {
  let component: NextCheckInOutWidgetComponent;
  let fixture: ComponentFixture<NextCheckInOutWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextCheckInOutWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextCheckInOutWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
