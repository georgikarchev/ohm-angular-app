import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from "../../models/room";
import { FileUploadService } from '../../services/file-upload.service';
import { switchMap, tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { ProfileUser } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
})
export class RoomEditComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  
  @Input() userUid!: any;
  @Input() roomToUpdate!: any; // ugly fix - a type of Room should be used here but passing a probably undefined value from parent component does not work
  @Output() updateFormSubmitted: EventEmitter<Room> = new EventEmitter();
  @Output() cancelEditRoom: EventEmitter<string> = new EventEmitter();

  selectedFile = null;

  constructor(
    private fileUploadService: FileUploadService,
    private toast: HotToastService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // console.log("#room-edit: ngOnInit():: ",this.roomToUpdate);
    //console.log("%%%",this.roomToUpdate.photo);
  }

  // onFileSelected(event: any): void {
  //   // console.log(event);
  //   this.selectedFile = event.target.files[0];
  // }

  uploadFile(event: any) {//, { uid }: ProfileUser
    this.fileUploadService
      .uploadFile(event.target.files[0], `rooms/${this.userUid}/${this.roomToUpdate.id}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        // switchMap((photoURL) =>
        //   this.usersService.updateUser({
        //     1,
        //     photoURL,
        //   })
        // )
        // switchMap(
        //   (photoURL) => {
        //     console.log(
        //       '$$$ Insert the realtime DB update call HERE!',
        //       photoURL
        //     )
        //     return true;
        //   }
        // )
      )
      .subscribe();
  }

  // uploadFile(event: any) {
  //   this.fileUploadService
  //     .uploadFile(event.target.files[0], `rooms/h1/`)
  //     .pipe(
  //       this.toast.observe({
  //         loading: 'Uploading profile image...',
  //         success: 'Image uploaded successfully',
  //         error: 'There was an error in uploading the image',
  //       })
  //       ,
  //       switchMap(
  //         (photoURL) => {
  //           console.log(
  //             '$$$ Insert the realtime DB update call HERE!',
  //             photoURL
  //           );
  //           //return true;
  //         }
  //         // this.usersService.updateUser({
  //         //   uid,
  //         //   photoURL,
  //         // })
  //       )
  //     )
  //     .subscribe();
  // }

  onClickSubmitImageForm(result: NgForm): void {
    // upload the image and change the image path that would be submitted if the Data form is submitted
  }

  onClickSubmitDataForm(result: NgForm): void {
    // console.log(this.roomToUpdate);

    const updatedRoom: Room = {
      id: this.roomToUpdate?.id,
      name: result.value.roomName,
      photo: this.roomToUpdate.photo,
      singleBeds:
        result.value.roomSingleBeds !== undefined
          ? result.value.roomSingleBeds
          : 0,
      doubleBeds:
        result.value.roomDoubleBeds !== undefined
          ? result.value.roomDoubleBeds
          : 0,
      babyCots:
        result.value.roomBabyCots != undefined ? result.value.roomBabyCots : 0,
      disabilityFriendly: this.roomToUpdate?.disabilityFriendly,
      available: this.roomToUpdate?.available,
    };
    this.updateFormSubmitted.emit(updatedRoom);
    // console.log("#room-edit: ", updatedRoom);
  }

  onClickCancelEditRoom(): void {
    this.cancelEditRoom.emit('cancel');
  }
}
