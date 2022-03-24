import { Component, OnChanges, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { Room, RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit, OnChanges {
  rooms: Array<Room>;

  constructor(private roomsService: RoomsService, private bookingsService: BookingsService) {
      this.rooms = roomsService.orderRooms('number');
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

  onClickMarkUnavailable(_roomIdentifier: String): void {
    this.roomsService.updateToggleRoomAvailable(_roomIdentifier);
  }

}
