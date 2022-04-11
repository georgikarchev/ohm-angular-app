import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RoomAddComponent } from './room-add/room-add.component';

@NgModule({
  declarations: [
    RoomComponent,
    RoomsComponent,
    RoomsListComponent,
    RoomDetailsComponent,
    RoomEditComponent,
    RoomAddComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    RoomsComponent
  ]
})
export class RoomsModule {}
