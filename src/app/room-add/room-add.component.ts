// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Room } from '../services/rooms.service';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss']
})


export class RoomAddComponent implements OnInit {
  // @Output() formSubmitted: EventEmitter<Room> = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

  onClickSubmit(result: { roomNumber: string; }): void {
    console.log("You have entered : " + result.roomNumber);
    const roomData: Room = {
      number: result.roomNumber
    };
    
    // this.formSubmitted.emit(roomData);
  }

}
