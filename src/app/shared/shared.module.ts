import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingComponent } from './booking/booking.component';
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OpenStatisticsWidgetComponent } from './open-statistics-widget/open-statistics-widget.component';



@NgModule({
  declarations: [
    BookingComponent,
    BookingAddComponent,
    BookingsListComponent,
    OpenStatisticsWidgetComponent,
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  exports: [
    BookingComponent,
    BookingAddComponent,
    BookingsListComponent,
    OpenStatisticsWidgetComponent
  ]
})
export class SharedModule { }
