import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() room!: Room;

  constructor() { }

  ngOnInit(): void {
  }

}
