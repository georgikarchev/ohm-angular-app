import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Room, ProfileUser } from "src/app/core/Interfaces";
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { concatMap, switchMap, tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
// import { ProfileUser } from 'src/app/models/user';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
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

editRoomForm = new FormGroup(
  {
    roomNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
      roomNumberTakenValidator(this.roomsService.getRoomNumbers())
    ]),
    singleBeds: new FormControl('', [
      Validators.min(0),
      Validators.max(5),
    ]),
    doubleBeds: new FormControl('', [
      Validators.min(0),
      Validators.max(3),
    ]),
    babyCots: new FormControl('', [
      Validators.min(0),
      Validators.max(2),
    ]),
    basePrice: new FormControl('', [Validators.required, Validators.min(0)]),
    pricePerExtraAdult: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    pricePerExtraChild: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
  },
  { validators: [atLeastOneBedValidator] }
);


  constructor(
    private fileUploadService: FileUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(params => {
          this.roomNumber = params['roomNumber'];
          this.titleService.setTitle('Edit Room ' + this.roomNumber);
          this.isLoading = true;
          this.roomToUpdate = this.roomsService.getRoomByNumber(params['roomNumber']);
          
          this.editRoomForm.controls['roomNumber'].setValue(this.roomToUpdate.name);
          this.editRoomForm.controls['singleBeds'].setValue(this.roomToUpdate.singleBeds);
          this.editRoomForm.controls['doubleBeds'].setValue(this.roomToUpdate.doubleBeds);
          this.editRoomForm.controls['babyCots'].setValue(this.roomToUpdate.babyCots);
          this.editRoomForm.controls['basePrice'].setValue(this.roomToUpdate.basePrice);
          this.editRoomForm.controls['pricePerExtraAdult'].setValue(this.roomToUpdate.pricePerExtraAdult);
          this.editRoomForm.controls['pricePerExtraChild'].setValue(this.roomToUpdate.pricePerExtraChild);
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
  }

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
          this.roomsService.updateRoomPhoto(this.roomToUpdate);
        })
      )
      .subscribe();
  }

  onClickCancel() {
    this.router.navigate(['/rooms']);
  }

  onClickSubmit(): void {
    // console.log('RoomEditComponent#onClickSubmit()');
    if (!this.editRoomForm.valid) {
      return;
    }

    const {
      roomNumber,
      singleBeds,
      doubleBeds,
      babyCots,
      basePrice,
      pricePerExtraAdult,
      pricePerExtraChild,
    } = this.editRoomForm.value;

    const newRoomData: Room = {
      id: this.roomToUpdate.id,
      name: roomNumber,
      photo: this.roomToUpdate.photo,
      singleBeds: singleBeds !== undefined? singleBeds : 0,
      doubleBeds: doubleBeds !== undefined? doubleBeds : 0,
      babyCots: babyCots != undefined? babyCots : 0,
      basePrice: basePrice != undefined? basePrice : 0,
      pricePerExtraAdult: pricePerExtraAdult != undefined? pricePerExtraAdult : 0,
      pricePerExtraChild: pricePerExtraChild != undefined? pricePerExtraChild : 0,
    };
    // TODO - make observable from(Promise) ?
    this.isLoading = true;
    this.roomsService.updateRoom(newRoomData).then(
      () => {
        this.roomsService.fetchRooms();
        this.isLoading = false;
        // if the roomNumber has changed - update the url
        if(newRoomData.name !== this.roomToUpdate.name) {
          this.router.navigate(['rooms/edit/'+newRoomData.name]);
        }
      }
    );
  }


  onClickCancelEditRoom(): void {
    this.cancelEditRoom.emit('cancel');
  }
}


const atLeastOneBedValidator: ValidatorFn = (f: AbstractControl) => {
  if(+f.value.singleBeds === 0 && +f.value.doubleBeds === 0) {
    return {atLeastOneBed: true};
  }
 
   return null;
 };
 
 export function roomNumberTakenValidator(val: string[]): ValidatorFn {
  
   return (control: AbstractControl): ValidationErrors | null => {
  
     let v: string = control.value;
 
     // console.log(val);
 
     if(val.includes(v)) {
       return {roomNumberTaken: true};
     }
       
     return null;
     
   }
  
 }