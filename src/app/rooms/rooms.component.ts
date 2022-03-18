import { Component, Input, OnInit } from '@angular/core';
import { Post, Room, RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  @Input() rooms!: Array<Room>;
  posts!: Post[];
  addRoomOn: boolean;

  constructor(private roomsService: RoomsService) {
    this.addRoomOn = false;
   }

  ngOnInit(): void {
    this.roomsService.getAllPosts()
      .subscribe(
        data => { 
          this.posts = data; 
        },
        err => {
          console.log(`${JSON.stringify(err)}`) 
        }
      );
  }

  addRoomClickHandler(): void {
    this.addRoomOn = !this.addRoomOn;
  }

}
