import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsWidgetComponent } from './statistics-widget/statistics-widget.component';
import { NextCheckInOutWidgetComponent } from './next-check-in-out-widget/next-check-in-out-widget.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { TimeWidgetComponent } from './time-widget/time-widget.component';



@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsWidgetComponent,
    NextCheckInOutWidgetComponent,
    WeatherWidgetComponent,
    TimeWidgetComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    SharedModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
