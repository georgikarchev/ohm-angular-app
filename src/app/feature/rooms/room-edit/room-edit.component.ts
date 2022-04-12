import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room, ProfileUser } from "src/app/core/Interfaces";
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { concatMap, switchMap, tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
// import { ProfileUser } from 'src/app/models/user';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { getStorage, ref } from "firebase/storage";


@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
})
export class RoomEditComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  roomNumber: string | undefined;
  roomId: number = 0;
  isLoading: boolean = false;

  roomToUpdate!: any;
  
  @Input() userUid!: any;
  // @Input() roomToUpdate!: any; // ugly fix - a type of Room should be used here but passing a probably undefined value from parent component does not work
  @Output() updateFormSubmitted: EventEmitter<Room> = new EventEmitter();
  @Output() cancelEditRoom: EventEmitter<string> = new EventEmitter();

  selectedFile = null;

// Get a reference to the storage service, which is used to create references in your storage bucket
storage = getStorage();

// Create a storage reference from our storage service
storageRef = ref(this.storage);
imageRef: any;
imagePath: string | undefined;


  constructor(
    private fileUploadService: FileUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private roomsService: RoomsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(params => {
          this.roomNumber = params['roomNumber'];
          this.titleService.setTitle('Edit Room ' + this.roomNumber);
          this.isLoading = true;
          this.roomToUpdate = this.roomsService.getRoomByNumber(params['roomNumber']);
          this.imageRef = ref(this.storage, `rooms/${this.authService.currentUserUid}/${this.roomToUpdate.id}`);
          this.imagePath = this.imageRef.bucket + '/' +this.imageRef.fullPath;
          console.log(this.imageRef);
          console.log(this.imagePath);
        })
      ).subscribe({
        next: room => {
          console.log(room);
          this.isLoading = false;
        },
        error: error => {
          this.isLoading = false;
          console.error('Error occured while loading room data.', error);
        }
      });




    // console.log("#room-edit: ngOnInit():: ",this.roomToUpdate);
    //console.log("%%%",this.roomToUpdate.photo);
  }

  // onFileSelected(event: any): void {
  //   // console.log(event);
  //   this.selectedFile = event.target.files[0];
  // }

  uploadFile(event: any) {//, { uid }: ProfileUser
    this.fileUploadService
      .uploadFile(event.target.files[0], `rooms/${this.authService.currentUserUid}/${this.roomToUpdate.id}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        concatMap(async (photoUrRL) => {
          this.roomToUpdate.photo = photoUrRL;
          this.roomsService.updateRoom(this.roomToUpdate);
        })
        // switchMap((photoURL) => {
        //     if(photoURL) {
        //       // this.roomToUpdate.photo = photoURL;
        //       // this.roomsService.updateRoom(this.roomToUpdate);
        //     }
        // }),
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

    // const updatedRoom: Room = {
    //   id: this.roomToUpdate?.id,
    //   name: result.value.roomName,
    //   photo: this.roomToUpdate.photo,
    //   singleBeds:
    //     result.value.roomSingleBeds !== undefined
    //       ? result.value.roomSingleBeds
    //       : 0,
    //   doubleBeds:
    //     result.value.roomDoubleBeds !== undefined
    //       ? result.value.roomDoubleBeds
    //       : 0,
    //   babyCots:
    //     result.value.roomBabyCots != undefined ? result.value.roomBabyCots : 0,
    //   disabilityFriendly: this.roomToUpdate?.disabilityFriendly,
    //   available: this.roomToUpdate?.available,
    // };
    // this.updateFormSubmitted.emit(updatedRoom);
    // console.log("#room-edit: ", updatedRoom);
  }

  onClickCancelEditRoom(): void {
    this.cancelEditRoom.emit('cancel');
  }
}
