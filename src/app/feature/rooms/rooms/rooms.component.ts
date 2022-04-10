import { Component, OnChanges, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, OnChanges {
  //rooms: Array<Room>;
  public state: any;
  public userEmail: User | null | undefined;

  isLoading: boolean = false;
  

  rooms$: Observable<Room[]> | undefined;

  constructor(
    private roomsService: RoomsService,
    private bookingsService: BookingsService,
    public authService: AuthService,
    private firestore: Firestore,
    private httpService: HttpClient
  ) {
    // this.rooms = roomsService.orderRooms('number');
    this.state = {
      rooms: roomsService.getRooms(),
      showRoomDetails: false,
      showRoomId: '',
      selectedRoom: undefined,
    };
  }
// #1 - only shows rooms afte rerender
  // ngOnInit(): void {
  //   this.authService.currentUser$.subscribe((data) => {
  //     const db = getDatabase();
  //     const starCountRef = ref(db, `hotels/${data!.uid}/rooms`);
  //     onValue(starCountRef, (snapshot) => {
  //       const data = snapshot.val();
  //        //alert(data);
  //        console.log(data);
  //       // updateStarCount(postElement, data);
  //       let arr: Array<any> = [];
  //       Object.keys(data).map(function (key) {
  //         arr.push(data[key]);
  //         return arr;
  //       });
  //       this.state.rooms = arr;
  //     });
  //   });
  // }
  // #2
  ngOnInit(): void {
    // this.authService.currentUser$.pipe(
    //   tap((data) => {
               
    //     const db = getDatabase();
    //     const starCountRef = ref(db, `hotels/${data!.uid}/rooms`);
    //     onValue(starCountRef, (snapshot) => {
    //       const data = snapshot.val();
    //        //alert(data);
    //        console.log(data);
    //       // updateStarCount(postElement, data);
    //       let arr: Array<any> = [];
    //       Object.keys(data).map(function (key) {
    //         arr.push(data[key]);
    //         return arr;
    //       });
    //       this.state.rooms = arr;
    //     });
    //   })
    // ).subscribe();
    
    // this.rooms$ = this.roomsList();
    this.roomsList();
    this.isLoading = true;

    // const inter = setInterval(()=>{
    //   console.log(this.state.rooms);
    // }, 1000);
    //  The data is there it is simply not refreshed!!!!! how to force angular to rerender after the data is here
  }


  roomsList() {
    if(!this.authService.currentUserUid) {
      console.log("User is not logged in");
      return;
    } else {
      const db = getDatabase();
      const starCountRef = ref(db, `hotels/${this.authService.currentUserUid}/rooms`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
          //alert(data);
          console.log(data);
        // updateStarCount(postElement, data);
        let arr: Array<any> = [];
        Object.keys(data).map(function (key) {
          arr.push(data[key]);
          return arr;
        });
        this.state.rooms = arr;
      });
    }
  }
      
      // newGetRooms() {
  //   this.rooms$ = this.fetchRoomsFromServer();
  // }

  // fetchRoomsFromServer(): Observable<Room[]> {
  //   this.authService.currentUser$.subscribe((data) => {
  //     const db = getDatabase();
  //     const starCountRef = ref(db, `hotels/${data!.uid}/rooms`);
  //     onValue(starCountRef, (snapshot) => {
  //       const data = snapshot.val();
  //       // alert(data);
  //       // updateStarCount(postElement, data);
  //       let arr: Array<any> = [];
  //       Object.keys(data).map(function (key) {
  //         arr.push(data[key]);
  //         return arr;
  //       });
  //       return arr;
  //     });
  //   });
  // }

  ngOnChanges(): void {
    console.log('CHANGES');
  }

  onNewRoomFormSubmitted(params: any): void {
    //newRoomData: Room, user: ProfileUser
    console.log(params);
    const newRoomData = params[0];
    const user = params[1];
    //console.log("#Rooms-Page: New Room Data", newRoomData);
    // check for duplicates in Room Number

    // call Service and update data object

    // commented out - moved the call of the service to the room-add.component
    // this.roomsService.addRoom(newRoomData, user);
  }

  onUpdateRoomFormSubmitted(updatedRoomData: Room): void {
    //console.log("#Rooms-Page: New Room Data", updatedRoomData);
    // check for duplicates in Room Number

    // call Service and update data object
    this.roomsService.updateRoom(updatedRoomData);
  }

  onRoomMarkUnavailable(roomIdentifier: string): void {
    this.roomsService.updateToggleRoomAvailable(roomIdentifier);
  }

  onRoomSelectedForEdit(roomId: string): void {
    this.state.showRoomDetails = true;
    //console.log("#rooms-page: onRoomSelectedForEdit() :: roomId:",this.roomsService.getRooms());
    this.state.showRoomId = roomId;
    this.state.selectedRoom = this.roomsService.getRoom(roomId);
    // console.log("#rooms-page: onRoomSelectedForEdit() :: selectedRoom Object",this.state.selectedRoom);
  }

  onClickBackToRooms() {
    this.state.showRoomDetails = false;
  }
}
