import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Booking } from 'src/app/core/Interfaces';
import { BookingsService } from 'src/app/core/services/bookings.service';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  filter: string = 'all';
  bookings: Array<Booking> = [];
  

  isLoading: boolean = false;
  newRoomOn: boolean = false;


  constructor(
    private bookingsService: BookingsService,
    private router: Router,
    private roomsService: RoomsService
  ) {
    this.roomsService.fetchRooms();
    // this.bookings = this.bookingsService.fetchBookings();
    this.bookings = this.bookingsService.getBookings();
  }
  
  ngOnInit(): void {}

  applyFilter(val: string) {
    switch (val) {
      case 'free':
        this.filter = 'free';
        break;
      case 'occupied':
        this.filter = 'occupied';
        break;
      case 'ooo':
        this.filter = 'ooo';
        break;
      default: // 'all'
        this.filter = 'all';
        break;
    }
    this.filterBookings(this.filter);
  }

  filterBookings(filter: string) {}

  bookingsList() {
    this.bookings = this.bookingsService.getBookings();
  }

  onNewBookingClicked() {
    this.newRoomOn = true;
    this.router.navigate(['/bookings/new/']);
  }

  onClickCancel() {
    this.router.navigate(['/bookings']);
  }
}
