import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  @Input() roomToUpdate!: any; // ugly fix - a type of Room should be used here but passing a probably undefined value from parent component does not work
  @Output() updateFormSubmitted: EventEmitter<Room> = new EventEmitter();
  @Output() cancelEditRoom: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    // console.log("#room-edit: ngOnInit():: ",this.roomToUpdate);
  }

  onClickSubmit(result: NgForm): void {
    // console.log(this.roomToUpdate);

    const updatedRoom: Room = {
      id: this.roomToUpdate?.id,
      name: result.value.roomName,
      photo: this.roomToUpdate.photo,
      singleBeds: result.value.roomSingleBeds !== undefined? result.value.roomSingleBeds : 0,
      doubleBeds: result.value.roomDoubleBeds !== undefined? result.value.roomDoubleBeds : 0,
      babyCots: result.value.roomBabyCots != undefined? result.value.roomBabyCots : 0,
      disabilityFriendly: this.roomToUpdate?.disabilityFriendly,
      available: this.roomToUpdate?.available
    };
    this.updateFormSubmitted.emit(updatedRoom);
    // console.log("#room-edit: ", updatedRoom);
  }

  onClickCancelEditRoom(): void {
    this.cancelEditRoom.emit('cancel');
  }

}
