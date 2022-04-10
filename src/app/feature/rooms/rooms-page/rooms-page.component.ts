import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { ProfileUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from '../../services/bookings.service';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/room';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Item } from 'firebase/analytics';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss'],
})
export class RoomsPageComponent implements OnInit, OnChanges {
  //rooms: Array<Room>;
  public state: any;
  public userEmail: User | null | undefined;

  rooms$: Observable<Room[]> | undefined;

  constructor(
    private roomsService: RoomsService,
    private bookingsService: BookingsService,
    public authService: AuthService,
    private firestore: Firestore
  ) {
    // this.rooms = roomsService.orderRooms('number');
    this.state = {
      rooms: roomsService.getRooms(),
      showRoomDetails: false,
      showRoomId: '',
      selectedRoom: undefined,
    };
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((data) => {
      // this.roomsService.fetchRoomsFromRealTimeDatabase(data!.uid);

      // const coll = collection(this.firestore, `hotel/${data!.uid}/rooms`);
      // this.rooms$ = collectionData(coll);

      const db = getDatabase();
      const starCountRef = ref(db, `hotels/${data!.uid}/rooms`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // alert(data);
        // updateStarCount(postElement, data);
        let arr: Array<any> = [];
        Object.keys(data).map(function (key) {
          arr.push(data[key]);
          return arr;
        });
        this.state.rooms = arr;
      });
    });
    // this.newGetRooms();
     
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
