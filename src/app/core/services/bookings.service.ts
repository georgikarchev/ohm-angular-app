import { Injectable } from '@angular/core';
import { getDatabase, onValue, ref, set, update } from 'firebase/database';

import { AuthService } from './auth.service';

import { Booking } from '../Interfaces';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// export interface Booking {
//   id: string;
//   dateCreated: Date;
//   dateModified: Date;
//   dateCheckIn: Date;
//   dateCheckOut: Date;
//   numberOfGuests: Number;
//   email: string;
//   name: string;
//   referal: string;
// }

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  public userData: any | undefined;
  private db: any;

  bookings: Array<Booking> = [];

  constructor(public authService: AuthService, private httpClient: HttpClient) {
    this.authService.currentUser$.subscribe((data) => (this.userData = data));

    this.db = getDatabase();
    
  }

  addBooking(newBooking: Booking): any {
    if (this.userData !== undefined && this.userData.uid) {
      const date: Date = new Date();
      const dateId: string =
        date.getFullYear() +
        '' +
        `${date.getMonth() + 1}`.padStart(2, '0') +
        '' +
        `${date.getDate()}`.padStart(2, '0') +
        '' +
        `${date.getHours()}`.padStart(2, '0') +
        '' +
        `${date.getMinutes()}`.padStart(2, '0') +
        '' +
        `${date.getSeconds()}`.padStart(2, '0');

      newBooking.id = 'b-' + dateId;
      newBooking.status = 'confirmed';
      this.bookings.push(newBooking);
      // console.log("$$$",this.userData.email, this.userData.uid);
      return set(
        ref(this.db, `hotels/${this.userData.uid}/bookings/${newBooking.id}`),
        newBooking
      );
    }
    return null;
  }

  updateBookingNotes(_updatedBooking: Booking) {
    const updates: any = {};
    updates['hotels/'+this.userData.uid+'/bookings/'+_updatedBooking.id+'/notes'] = _updatedBooking.notes;
    return update(ref(this.db), updates);
  }

  updateBooking(_updatedBooking: Booking) {
    const updates: any = {};
    updates['hotels/'+this.userData.uid+'/bookings/'+_updatedBooking.id] = _updatedBooking;
    return update(ref(this.db), updates);
  }

  getBookings(): Array<Booking> {
    return this.bookings;
  }

  getBookingById(id: string): any {
    const booking = this.bookings.find(r => r.id === id);
    return booking;
  }

  fetchBookings(): any {
    // console.log(`fetchBookings():: hotels/${this.authService.currentUserUid}/bookings`);
    const roomsRef = ref(this.db,`hotels/${this.authService.currentUserUid}/bookings`);
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("onValue",data);
      let arr: Array<any> = [];
      Object.keys(data).map(function (key) {
        arr.push(data[key]);
        return arr;
      });
      //console.log(this.bookings);
      this.bookings = arr;
      // return this.bookings;
    }
    );

    // return bindCallback(fn) as unknown as Observable<any>;
    // return Observable.bindCallback(fn) as Observable<any>;
  }

  getBookingsOfRoom(roomId: string): Array<Booking> {
    const bookings: Array<Booking> = [];
    return bookings;
  }

  // getBookings(
  //   _sortBy?: string,
  //   _sortByAsc?: boolean,
  //   _dateFrom?: Date,
  //   _dateTo?: Date
  // ): Array<Booking> {
  //   let sortByAsc: Boolean;

  //   if (_sortByAsc !== null) {
  //     if (_sortByAsc === true) {
  //       sortByAsc = true;
  //     } else {
  //       sortByAsc = false;
  //     }
  //   }

  //   if (_sortBy !== null) {
  //     switch (_sortBy) {
  //       case '_dateCreated':
  //         // sort bookings by dateCreated
  //         break;
  //       case '_dateModified':
  //         // sort bookings by dateModified
  //         break;
  //       case '_dateCheckIn':
  //         // sort bookings by dateCheckIn
  //         break;
  //       case '_dateCheckOut':
  //         // sort bookings by dateCheckIn
  //         break;
  //     }
  //   }

  //   const bookings: Array<Booking> = [];
  //   return bookings;
  // }

  getFreeRoomsAtDate(date: string) {

  }
}
