import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterViewChecked, ApplicationRef, ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { RoomsComponent } from '../../rooms/rooms/rooms.component';
import { getDatabase, onValue, ref, set, update } from "firebase/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hotelsTotal: number = 0;
  roomsTotal: number = 0;
  bookingsTotal: number = 0;


  private db: any;

  constructor(private roomsService: RoomsService, private cd: ChangeDetectorRef, private appRef: ApplicationRef) {
    // this.httpClient.get("https://ohm-angular-app-default-rtdb.europe-west1.firebasedatabase.app/")
    //   .subscribe(r => {
    //     console.log(r);
    //   });
    // this.roomsService.fetchRoomsStatistic(this.updateC);
    this.db = getDatabase();
  }
  

  ngOnInit(): void {
    const roomsRef = ref(
      this.db,
      `hotels`
    );
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      
      // Hotels
      let arrHotels: Array<any> = [];
      Object.keys(data).map(function (key) {
        arrHotels.push(data[key]);
        return arrHotels;
      });
      this.hotelsTotal = arrHotels.length;
      // console.log(this.roomsTotal);

      // rooms
      console.log(arrHotels);
      let arrRooms: Array<any> = [];
      let roomsCount = 0;
      arrHotels.map(h => {
        if(h.rooms){
          Object.keys(h.rooms).map(function (key) {
            arrRooms.push(h.rooms[key]);
            return arrRooms;
          });
          roomsCount += arrRooms.length;
        }
      });
      this.roomsTotal = roomsCount;

      // bookings
      console.log(arrHotels);
      let arrBookings: Array<any> = [];
      let bookingsCount = 0;
      arrHotels.map(h => {
        if(h.bookings){
          Object.keys(h.bookings).map(function (key) {
            arrBookings.push(h.bookings[key]);
            return arrBookings;
          });
          bookingsCount += arrBookings.length;
        }
      });
      this.bookingsTotal = bookingsCount;

      this.appRef.tick();
    });
  }

  // public set roomsTotal(value: number) {
  //   this._roomsTotal = value;
  // }

  // public get roomsTotal() {
  //   return this._roomsTotal;
  // }

  // private updateC = (param: any) => {
  //   console.log('updateC#',param);
  //   this.roomsTotal = param;
  //   console.log(this.roomsTotal);
  //   this.cd.markForCheck();
  // }

  // rerender() {
  //   this.roomsTotal = 8;
  // }

}
