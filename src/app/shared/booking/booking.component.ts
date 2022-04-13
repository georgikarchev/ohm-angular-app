import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking, Room } from 'src/app/core/Interfaces';
import { BookingsService } from 'src/app/core/services/bookings.service';
import { RoomsService } from 'src/app/core/services/rooms.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit, OnChanges {
  @Input() booking!: Booking;
  room!: Room;

  notesOpen: boolean = false;

  editNotesForm = new FormGroup({
    notes: new FormControl('', [Validators.maxLength(300)]),
  });

  total: number = 0;
  stay: number = 0;

  constructor(
    private roomsService: RoomsService,
    private bookingService: BookingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.room = this.roomsService.getRoomById(this.booking.roomId);

    if (this.booking.notes !== '')
      this.editNotesForm.controls['notes'].setValue(this.booking.notes);

      const checkInDateObj = new Date(this.booking.checkInDate);
      const checkOutDateObj = new Date(this.booking.checkOutDate);
      this.stay = this.calculateStay(checkInDateObj,checkOutDateObj);
      this.total = this.calculatePrice(this.booking, this.room);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.room = this.roomsService.getRoomById(this.booking.roomId);
  }

  calculateStay(checkIn: Date, checkOut: Date): number {
    if (checkIn !== undefined && checkOut !== undefined) {
      const diffTime = Math.abs(+checkOut - +checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } else {
      return 0;
    }
  }

  calculatePrice(b: Booking, r: Room): number {
    if(b === undefined) {
      return 0;
    }
    
    if (
      (+b.adults - 1 >= 0 || +b.children > 0) &&
      b.roomId != ''
    ) {
      
      const pricePerDay =
        (r.basePrice +
          (b.adults - 1) * r.pricePerExtraAdult +
          b.children * r.pricePerExtraChild) *
        (1 - b.discount / 100);

      const total = this.stay > 0 ? this.stay * +pricePerDay : +pricePerDay;
      return +total.toFixed(2);
    }
    return 0;
  }

  roomIdToRoom(roomId: string): Room {
    return this.roomsService.getRoomById(roomId);
  }

  onEditClicked() {
    console.log('Edit clicked');
    this.router.navigate(['bookings/edit/' + this.booking.id])
  }

  onNotesClicked() {
    console.log('Notes clicked');
    this.notesOpen = true;
  }

  onNotesSaveClicked() {
    console.log('Notes save clicked');
    if (this.booking.notes !== this.editNotesForm.controls['notes'].value) {
      this.booking.notes = this.editNotesForm.controls['notes'].value;
      this.bookingService.updateBookingNotes(this.booking);
    }
    this.notesOpen = false;
  }
}
