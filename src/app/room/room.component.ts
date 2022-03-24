import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() room!: Room;
  @Output() roomMarkUnavailable: EventEmitter<String> = new EventEmitter();

  editRoomActive: Boolean;

  constructor() {
    this.editRoomActive = false;
   }

  ngOnInit(): void {
  }

  onClickMarkUnavailable(_roomIdentifier: String): void {
    this.roomMarkUnavailable.emit(_roomIdentifier);
  }

  onClickEditRoom(): void {
    this.editRoomActive = !this.editRoomActive;
  }

  onCancelEditRoom(message: String): void {
    this.editRoomActive = false;
  }

}
