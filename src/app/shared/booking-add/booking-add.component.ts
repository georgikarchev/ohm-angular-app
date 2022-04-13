import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { Booking, Room } from 'src/app/core/Interfaces';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { BookingsService } from 'src/app/core/services/bookings.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-add',
  templateUrl: './booking-add.component.html',
  styleUrls: ['./booking-add.component.scss'],
})
export class BookingAddComponent implements OnInit {

  addBookingForm = new FormGroup({
    name: new FormControl('Пепи Пепов', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('pepi@gmail.com', [Validators.required, Validators.email]),
    phone: new FormControl('0883400100', [Validators.required]),
    checkInDate: new FormControl('', [Validators.required]),
    checkOutDate: new FormControl('', [Validators.required]),
    discount: new FormControl('10', [Validators.required]),
    adults: new FormControl('2', [Validators.required]),
    children: new FormControl('1', [Validators.required]),
    roomId: new FormControl('', [Validators.required]),
  });

  rooms: Array<Room> = this.roomsService.getRooms();

  priceCalculation: number = 0;
  stay: number = 0;

  constructor(
    private location: Location,
    private roomsService: RoomsService,
    private bookingsService: BookingsService,
    private router: Router
  ) {
    this.roomsService.fetchRooms();
  }

  ngOnInit(): void {
    this.onFormChanges(this.addBookingForm);
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

        this.priceCalculation = (this.stay > 0)? this.stay * pricePerDay : pricePerDay;
      }
    })
  }

  onClickSubmit(): void {
    // console.log('BookingAddComponent#onClickSubmit()', this.addBookingForm.value);
    if (!this.addBookingForm.valid) {
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
    } = this.addBookingForm.value;

    // const checkInDateObj = new Date(checkInDate)
    // const checkInDateStr = checkInDateObj.getFullYear() + `${checkInDateObj.getMonth() + 1}`.padStart(2, '0') + `${checkInDateObj.getDate()}`.padStart(2, '0');

    // const checkOutDateObj = new Date(checkOutDate)
    // const checkOutDateStr = checkOutDateObj.getFullYear() + `${checkOutDateObj.getMonth() + 1}`.padStart(2, '0') + `${checkOutDateObj.getDate()}`.padStart(2, '0');

    console.log(checkInDate);

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
    this.bookingsService.addBooking(newBooking)?.then(this.onBookingAdded());
  }

  onBookingAdded() {
    this.router.navigate(['/bookings']);
  }

  onClickCancel() {
    this.location.back();
  }
}

export function freeRoomsAtCheckInDateValidator(val: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let v: string = control.value;

    // console.log(val);

    if (val.includes(v)) {
      return { roomNumberTaken: true };
    }

    return null;
  };
}
