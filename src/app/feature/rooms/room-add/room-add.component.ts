// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Room } from "src/app/core/Interfaces";

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  @Output() newRoomFormSubmitted: EventEmitter<Room> = new EventEmitter();
  addRoomOn: boolean;

  constructor(private usersService: UsersService, private roomsService: RoomsService) {
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

    this.roomsService.addRoom(newRoom);


    // HERE is where the code emits the event to the rooms-page.component
    //this.newRoomFormSubmitted.emit({newRoom, user}]);

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
