import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/core/Interfaces';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit {

  @Input() bookings!: Array<Booking>;

  constructor() { }

  ngOnInit(): void {
  }

}
