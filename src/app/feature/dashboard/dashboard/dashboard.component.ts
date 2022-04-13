import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/core/services/bookings.service';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private roomsService: RoomsService, private bookingsService: BookingsService) { }

  ngOnInit(): void {
    // Fetch Rooms data from server
    this.roomsService.fetchRooms();
    this.bookingsService.fetchBookings();

  }

}
