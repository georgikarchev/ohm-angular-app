import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from "../../models/room";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rooms: Array<Room>;

  constructor(private roomsService: RoomsService) {
    this.rooms = roomsService.orderRooms();
  }

  ngOnInit(): void {
  }

}
