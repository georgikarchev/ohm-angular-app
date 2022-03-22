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
  @Output() formSubmitted: EventEmitter<Room> = new EventEmitter()
  addRoomOn: boolean;

  constructor() {
    this.addRoomOn = false;
  }

  ngOnInit(): void {}

  onClickSubmit(result: NgForm): void {
    const newRoom: Room = {
      number: result.value.roomNumber,
      singleBeds: result.value.roomSingleBeds,
      doubleBeds: result.value.roomDoubleBeds,
      kingSizeBeds: result.value.roomKingsizeBeds,
      babyCots: result.value.roomBabyCots
    };
    //console.log(result.value);
    this.formSubmitted.emit(newRoom);

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
