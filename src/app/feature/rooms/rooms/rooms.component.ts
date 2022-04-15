import { ApplicationRef, Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { ProfileUser } from '../../../core/Interfaces/user';
import { AuthService } from '../../../core/services/auth.service';
import { BookingsService } from '../../../core/services/bookings.service';
import { RoomsService } from '../../../core/services/rooms.service';
import { Room } from '../../../core/Interfaces';
import { mergeMap, Observable, tap, switchMap } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Item } from 'firebase/analytics';
import { getDatabase, onValue, ref } from 'firebase/database';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnChanges {
  //rooms: Array<Room>;
  public state: any;
  public userEmail: User | null | undefined;

  isLoading: boolean = true;

  filter: string = 'all';

  rooms$: Observable<Room[]> | undefined;

  constructor(
    private roomsService: RoomsService,
    private bookingsService: BookingsService,
    public authService: AuthService,
    private firestore: Firestore,
    private httpService: HttpClient,
    private router: Router,
    private appRef: ApplicationRef
  ) {
    // this.rooms = roomsService.orderRooms('number');
    this.state = {
      rooms: roomsService.getRooms(),
      showRoomId: '',
      selectedRoom: undefined,
    };
  }
  // #1
  ngOnInit(): void {
    this.authService.currentUser$.subscribe((data) => {
      // console.log(data);
      // const db = getDatabase();
      // const starCountRef = ref(db, `hotels/${data!.uid}/rooms`);
      // onValue(starCountRef, (snapshot) => {
      //   const data = snapshot.val();
      //    //alert(data);
      //    console.log(data);
      //   // updateStarCount(postElement, data);
      //   let arr: Array<any> = [];
      //   Object.keys(data).map(function (key) {
      //     arr.push(data[key]);
      //     return arr;
      //   });
      //   this.state.rooms = arr;
      // });

      if(data?.uid) {
        const db = getDatabase();
        const roomsRef = ref(db,`hotels/${data?.uid}/rooms`);
        onValue(roomsRef, (snapshot) => {
          if(!snapshot) {
            return;
          }
          const data = snapshot.val();
          if(data !== null) {
            // console.log(data);
            // updateStarCount(postElement, data);
            let arr: Array<any> = [];
            Object.keys(data).map(function (key) {
              arr.push(data[key]);
              return arr;
            });
            this.isLoading = false;
            this.state.rooms = arr;
            this.appRef.tick();
          } else {
            this.isLoading = false;
          }

        }
        );
      }
    });
  }
  // #2 - working fine
  // ngOnInit(): void {
  //   this.roomsList();
  //   this.isLoading = true;
  // }

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
    this.filterRooms(this.filter);
  }

  filterRooms(filter: string) {}

  roomsList() {
    this.state.rooms = this.roomsService.getRooms();
  }


  ngOnChanges(): void {
    console.log('CHANGES');
  }

  onNewRoomClicked() {
    this.router.navigate(['/rooms/new/']);
  }


}
