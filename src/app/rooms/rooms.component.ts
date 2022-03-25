import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post, Room, RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  @Input() rooms!: Array<Room>;
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
