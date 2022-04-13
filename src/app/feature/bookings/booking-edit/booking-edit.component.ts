import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Booking, Room } from 'src/app/core/Interfaces';
import { BookingsService } from 'src/app/core/services/bookings.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.scss'],
})
export class BookingEditComponent implements OnInit {
  
  editBookingForm = new FormGroup({
    name: new FormControl('Иван Иванович', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('ivan@gmail.com', [Validators.required, Validators.email]),
    phone: new FormControl('0888400100', [Validators.required]),
    checkInDate: new FormControl('', [Validators.required]),
    checkOutDate: new FormControl('', [Validators.required]),
    discount: new FormControl('10', [Validators.required]),
    adults: new FormControl('2', [Validators.required]),
    children: new FormControl('1', [Validators.required]),
    roomId: new FormControl('', [Validators.required]),
  });

  rooms: Array<Room> = this.roomsService.getRooms();

  total: number = 0;
  stay: number = 0;

  isLoading: boolean = false;

  booking!: Booking;
  room!: Room;
  
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookingsService: BookingsService,
    private roomsService: RoomsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(params => {
          this.isLoading = true;
          this.booking = this.bookingsService.getBookingById(params['id'])

          this.room = this.roomsService.getRoomById(this.booking.roomId);

          const checkInDateObj = new Date(this.booking.checkInDate);
          const checkOutDateObj = new Date(this.booking.checkOutDate);
          
          this.editBookingForm.controls['name'].setValue(this.booking.name);
          this.editBookingForm.controls['email'].setValue(this.booking.email);
          this.editBookingForm.controls['phone'].setValue(this.booking.phone);
          this.editBookingForm.controls['checkInDate'].setValue(checkInDateObj);
          this.editBookingForm.controls['checkOutDate'].setValue(checkOutDateObj);
          this.editBookingForm.controls['discount'].setValue(this.booking.discount);
          this.editBookingForm.controls['adults'].setValue(this.booking.adults);
          this.editBookingForm.controls['children'].setValue(this.booking.children);
          this.editBookingForm.controls['roomId'].setValue(this.booking.roomId);

          this.stay = this.calculateStay(checkInDateObj,checkOutDateObj);
          this.total = this.calculatePrice(this.booking, this.room);

        })
      ).subscribe({
        next: bookingId => {
          // console.log(bookingId);
          this.isLoading = false;
        },
        error: error => {
          this.isLoading = false;
          console.error('Error occured while loading booking data.', error);
        }
      });

      this.onFormChanges(this.editBookingForm);
  }

  onFormChanges(f: FormGroup): void {
    f.valueChanges.subscribe(val => {
      if(!val) {
        return;
      }
      console.log(val.checkInDate);
      if(val.checkInDate !== '' && val.checkOutDate !== '') {
        const diffTime = Math.abs(val.checkOutDate - val.checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        this.stay = diffDays;
      } else {
        this.stay = 0;
      }


      if((+val.adults-1 >= 0 || +val.children > 0) && val.roomId != '') {
        const room: Room = this.roomsService.getRoomById(val.roomId);
        const pricePerDay =
          (room.basePrice +
          ((val.adults-1) * room.pricePerExtraAdult) +
          (val.children * room.pricePerExtraChild)) * (1-(val.discount/100));

          const total = (this.stay > 0)? this.stay * pricePerDay : pricePerDay;
          this.total = +total.toFixed(2);
      }
    })
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

  onClickSubmit(): void {
    // console.log('BookingAddComponent#onClickSubmit()', this.addBookingForm.value);
    if (!this.editBookingForm.valid) {
      return;
    }

    const {
      name,
      email,
      phone,
      checkInDate,
      checkOutDate,
      discount,
      roomId,
      adults,
      children,
    } = this.editBookingForm.value;

    // const checkInDateObj = new Date(checkInDate)
    // const checkInDateStr = checkInDateObj.getFullYear() + `${checkInDateObj.getMonth() + 1}`.padStart(2, '0') + `${checkInDateObj.getDate()}`.padStart(2, '0');

    // const checkOutDateObj = new Date(checkOutDate)
    // const checkOutDateStr = checkOutDateObj.getFullYear() + `${checkOutDateObj.getMonth() + 1}`.padStart(2, '0') + `${checkOutDateObj.getDate()}`.padStart(2, '0');

    const newBooking: Booking = {
      id: 'placeholder-id',
      name: name,
      email: email,
      phone: phone,
      checkInDate: checkInDate.toString(),
      checkOutDate: checkOutDate.toString(),
      discount: discount,
      roomId: roomId,
      adults: adults,
      children: children,
      notes: '',
      status: ''
    };
    this.bookingsService.addBooking(newBooking)?.then(this.onBookingUpdated());
  }

  onBookingUpdated() {
    this.router.navigate(['/bookings']);
  }

  onClickCancel() {
    this.location.back();
  }
}
