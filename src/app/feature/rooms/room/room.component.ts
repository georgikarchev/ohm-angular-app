import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../../core/Interfaces/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() room!: Room;
  @Output() roomMarkUnavailable: EventEmitter<string> = new EventEmitter();

  // editRoomActive: Boolean;

  constructor(private router: Router) {
    // this.editRoomActive = false;
   }

  ngOnInit(): void {
  }

  onRoomMarkUnavailable(roomId: string): void {
    this.roomMarkUnavailable.emit(roomId);
  }

  onClickEditRoom(roomId: string): void {
    this.router.navigate(['/rooms/edit-room/', roomId]);
    // this.editRoomActive = !this.editRoomActive;
    // this.roomSelectedForEdit.emit(this.room.id);
  }

  // onCancelEditRoom(message: string): void {
  //   this.editRoomActive = false;
  // }

}
