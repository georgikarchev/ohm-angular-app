import { Injectable } from '@angular/core';

export interface Booking {
  id: string;
  dateCreated: Date;
  dateModified: Date;
  dateCheckIn: Date;
  dateCheckOut: Date;
  numberOfGuests: Number;
  email: string;
  name: string;
  referal: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor() {}

  getBookingsOfRoom(roomId: string): Array<Booking> {
    const bookings: Array<Booking> = [];
    return bookings;
  }

  getBookings(
    _sortBy?: string,
    _sortByAsc?: boolean,
    _dateFrom?: Date,
    _dateTo?: Date
  ): Array<Booking> {
    let sortByAsc: Boolean;


    if (_sortByAsc !== null) {
      if(_sortByAsc === true) {
        sortByAsc = true;
      } else {
        sortByAsc = false;
      }
    }

    if (_sortBy !== null) {
      switch (_sortBy) {
        case '_dateCreated':
          // sort bookings by dateCreated
          break;
        case '_dateModified':
          // sort bookings by dateModified
          break;
        case '_dateCheckIn':
          // sort bookings by dateCheckIn
          break;
        case '_dateCheckOut':
          // sort bookings by dateCheckIn
          break;
      }
    }

    const bookings: Array<Booking> = [];
    return bookings;
  }
}
