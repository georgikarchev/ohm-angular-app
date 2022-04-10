import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";



@NgModule({
  declarations: [
    RoomComponent,
    RoomsListComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class RoomsModule { }
