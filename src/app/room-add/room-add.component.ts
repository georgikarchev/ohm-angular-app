// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit {
  @Output() newRoomFormSubmitted: EventEmitter<Room> = new EventEmitter();
  addRoomOn: boolean;

  constructor() {
    this.addRoomOn = false;
  }

  ngOnInit(): void {}

  onClickSubmit(result: NgForm): void {
    const newRoom: Room = {
      id: 'placeholder-id',
      name: result.value.roomName,
      singleBeds: result.value.roomSingleBeds !== undefined? result.value.roomSingleBeds : 0,
      doubleBeds: result.value.roomDoubleBeds !== undefined? result.value.roomDoubleBeds : 0,
      babyCots: result.value.roomBabyCots != undefined? result.value.roomBabyCots : 0
    };
    //console.log(result.value);
    this.newRoomFormSubmitted.emit(newRoom);

    // console.log(result.value);
    // console.log('You have entered : ' + result.roomNumber);
    // const roomData: Room = {
    //   number: result.roomNumber,
    // };

    // this.formSubmitted.emit(roomData);
  }

  addRoomClickHandler(): void {
    this.addRoomOn = !this.addRoomOn;
  }
}
