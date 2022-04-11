// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Room } from 'src/app/core/Interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  customRoomValidatorFunction: ValidatorFn = () => {
    console.log('customRoomValidatorFunction', this.addRoomForm);
    return null;
  };

  addRoomForm = new FormGroup(
    {
      roomNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
      ]),
      singleBeds: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(5),
      ]),
      doubleBeds: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(3),
      ]),
      babyCots: new FormControl('', [
        Validators.required,
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
    { validators: [peshoValidator] }
  );

  constructor(
    private usersService: UsersService,
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // customRoomValidatorFunction(): any {
  //   console.log("validator bace", this.addRoomForm);
  //   // const singleB = this.addRoomForm.controls['singleBeds'].value
  //   // console.log('customRoomValidatorFunction#singleB',singleB)
  // }


  // onClickSubmit(result: NgForm): void {
  onClickSubmit(): void {
    console.log('RoomAddComponent#onClickSubmit()');
    // if (!this.addRoomForm.valid) {
    //   return;
    // }

    // const {
    //   name,
    //   singleBeds,
    //   doubleBeds,
    //   babyCots,
    //   basePrice,
    //   pricePerExtraAdult,
    //   pricePerExtraChild,
    // } = this.addRoomForm.value;

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

// export function customRoomValidatorFunction2(): ValidatorFn {
//   return (addRoomForm: FormGroup): ValidationErrors | null => {

//       // const start:Date = form.get("startAt").value;

//       // const end:Date = form.get("endAt").value;

//       // if (start && end) {
//       //     const isRangeValid = (end.getTime() - start.getTime() > 0);

//       //     return isRangeValid ? null : {dateRange:true};
//       // }

//       return null;
//   }
// }

const peshoValidator: ValidatorFn = (f: AbstractControl) => {
 if(+f.value.singleBeds === 0 && +f.value.doubleBeds === 0) {
   return {pesho: true};
 }

  return null;
};
