import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<Room> = new EventEmitter();
  @Output() cancelEditRoom: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClickSubmit(result: NgForm): void {
    const newRoom: Room = {
      id: 'placeholder-id',
      name: result.value.roomName,
      singleBeds: result.value.roomSingleBeds !== undefined? result.value.roomSingleBeds : 0,
      doubleBeds: result.value.roomDoubleBeds !== undefined? result.value.roomDoubleBeds : 0,
      babyCots: result.value.roomBabyCots != undefined? result.value.roomBabyCots : 0
    };
    this.formSubmitted.emit(newRoom);
  }

  onClickCancelEditRoom(): void {
    this.cancelEditRoom.emit('cancel');
  }

}
