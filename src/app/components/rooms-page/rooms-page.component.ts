import { Component, OnChanges, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { Room, RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit, OnChanges {
  //rooms: Array<Room>;
  public state;

  constructor(private roomsService: RoomsService, private bookingsService: BookingsService) {
      // this.rooms = roomsService.orderRooms('number');
      this.state = {
        rooms: roomsService.getRooms(),
        showRoomDetails: false,
        showRoomId: '',
        selectedRoom: undefined
      }
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log("CHANGES");
  }

  onNewRoomFormSubmitted(newRoomData: Room): void {
    //console.log("#Rooms-Page: New Room Data", newRoomData);
    // check for duplicates in Room Number

    // call Service and update data object
    this.roomsService.addRoom(newRoomData);
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
