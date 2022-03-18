import { Component, OnInit } from '@angular/core';
import { Room, RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  rooms: Array<Room>;

  constructor(private roomsService: RoomsService) {
    this.rooms = roomsService.getRooms();
  }

  ngOnInit(): void {
  }

}
