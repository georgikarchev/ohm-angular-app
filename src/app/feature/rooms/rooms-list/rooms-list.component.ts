import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomsService } from '../../../core/services/rooms.service';
import { Room } from "../../../core/Interfaces/room";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  @Input() rooms!: any;//Array<Room>;
  @Input() userUid!: any;
  @Output() newRoomFormSubmitted: EventEmitter<Room> = new EventEmitter();
  @Output() roomMarkUnavailable: EventEmitter<string> = new EventEmitter();
  @Output() roomSelectedForEdit: EventEmitter<string> = new EventEmitter();
  // posts!: Post[];
  addRoomOn: boolean;

  constructor(private roomsService: RoomsService) {
    this.addRoomOn = false;
   }

  ngOnInit(): void {
    // this.roomsService.getAllPosts()
    //   .subscribe(
    //     data => { 
    //       this.posts = data; 
    //     },
    //     err => {
    //       console.log(`${JSON.stringify(err)}`) 
    //     }
    //   );
  }

  addRoomClickHandler(): void {
    this.addRoomOn = !this.addRoomOn;
  }

  onNewRoomFormSubmitted(newRoomData: Room): void {
    //console.log("#Rooms: New Room Data", event);
    this.newRoomFormSubmitted.emit(newRoomData)
  }

  onRoomMarkUnavailable(roomIdentifier: string): void {
    this.roomMarkUnavailable.emit(roomIdentifier);
  }

  onRoomSelectedForEdit(roomId: string): void {
    //console.log("#rooms -> Room roomSelectedForEdit()", roomId);
    this.roomSelectedForEdit.emit(roomId);
  }

}
