// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Room } from 'src/app/core/Interfaces';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit, OnChanges {
  user$ = this.usersService.currentUserProfile$;

  rooms$: Observable<any> = this.roomsService.fetchRooms();

  customRoomValidatorFunction: ValidatorFn = () => {
    console.log('customRoomValidatorFunction', this.addRoomForm);
    return null;
  };

  addRoomForm = new FormGroup(
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
    private usersService: UsersService,
    private roomsService: RoomsService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // console.log(this.rooms$);
    // this.rooms$.pipe(
    //   tap(r => {
    //     console.log("fetchRooms",r)
    //   }
    // )).subscribe({
    //   next(x) {console.log('OHM# got the value '+ x)},
    //   error(err) {console.error('OHM# ERROR!!!')},
    //   complete() { console.log('OHM# DONE!') }  
    // });

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // this.addRoomForm.controls['doubleBeds'];
  }
  // customRoomValidatorFunction(): any {
  //   console.log("validator bace", this.addRoomForm);
  //   // const singleB = this.addRoomForm.controls['singleBeds'].value
  //   // console.log('customRoomValidatorFunction#singleB',singleB)
  // }

  onClickCancel() {
    // console.log("Cancel");
    this.router.navigate(['/rooms']);
  }

  onRoomAdded(newRoomNumber: string) {
    this.router.navigate(['/rooms/edit/', newRoomNumber]);
  }


  // onClickSubmit(result: NgForm): void {
  onClickSubmit(): void {
    console.log('RoomAddComponent#onClickSubmit()');
    if (!this.addRoomForm.valid) {
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
    } = this.addRoomForm.value;

    const newRoom: Room = {
      id: 'placeholder-id',
      name: roomNumber,
      singleBeds: singleBeds !== undefined? singleBeds : 0,
      doubleBeds: doubleBeds !== undefined? doubleBeds : 0,
      babyCots: babyCots != undefined? babyCots : 0,
      basePrice: basePrice != undefined? basePrice : 0,
      pricePerExtraAdult: pricePerExtraAdult != undefined? pricePerExtraAdult : 0,
      pricePerExtraChild: pricePerExtraChild != undefined? pricePerExtraChild : 0,
    };
    this.roomsService.addRoom(newRoom)?.then(this.onRoomAdded(roomNumber));



    // this.authService
    //   .login(email, password)
    //   .pipe(
    //     this.toast.observe({
    //       success: 'Room Added Successfully',
    //       loading: 'Adding room...',
    //       error: ({ message }) => `There was an error: ${message} `,
    //     })
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['/dashboard']);
    //   });

    //  OLD code
    // const newRoom: Room = {
    //   id: 'placeholder-id',
    //   name: result.value.roomName,
    //   singleBeds: result.value.roomSingleBeds !== undefined? result.value.roomSingleBeds : 0,
    //   doubleBeds: result.value.roomDoubleBeds !== undefined? result.value.roomDoubleBeds : 0,
    //   babyCots: result.value.roomBabyCots != undefined? result.value.roomBabyCots : 0
    // };
    // this.roomsService.addRoom(newRoom);
  }
}
// const roomNumberTakenValidator: ValidatorFn = (control: AbstractControl) => {
//   const value = control.value;
  
//   // const rooms = roomsService.getRooms();

//   if(value === '5') {
    
//     return {roomNumberTaken: true};
//   }
//   return null;
// };

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

