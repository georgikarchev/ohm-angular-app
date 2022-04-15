import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Booking } from 'src/app/core/Interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookingsService } from 'src/app/core/services/bookings.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  filter: string = 'all';
  bookings: Array<Booking> = [];
  

  isLoading: boolean = true;
  newRoomOn: boolean = false;


  constructor(
    private bookingsService: BookingsService,
    private router: Router,
    private roomsService: RoomsService,
    private authService: AuthService,
    private appRef: ApplicationRef
  ) {
    this.roomsService.fetchRooms();
    
    // the following line is commented out, because the needed functionality has been moved to ngOnInit()
    // this.bookings = this.bookingsService.getBookings();
  }
  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe((data) => {
      this.isLoading = true;
      if(data?.uid) {
        const db = getDatabase();
        const roomsRef = ref(db,`hotels/${data.uid}/bookings`)
        onValue(roomsRef, (snapshot) => {
          const data = snapshot.val();
          //alert(data);
          // console.log(data);
          // updateStarCount(postElement, data);
          let arr: Array<any> = [];
          Object.keys(data).map(function (key) {
            arr.push(data[key]);
            return arr;
          });
          this.isLoading = false;
          this.bookings = arr;
          this.appRef.tick();
        }
        );
      }
    });
  }

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
