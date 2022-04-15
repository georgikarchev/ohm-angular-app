import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStatisticsWidgetComponent } from './open-statistics-widget.component';

describe('OpenStatisticsWidgetComponent', () => {
  let component: OpenStatisticsWidgetComponent;
  let fixture: ComponentFixture<OpenStatisticsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenStatisticsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenStatisticsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
