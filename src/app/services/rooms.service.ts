import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Observable } from "rxjs";
import { ProfileUser } from "../models/user";
import { UsersService } from "./users.service";
import { Room } from "../models/room";
import { AuthService } from "./auth.service";


// export interface Room {
//   number: string,
//   description?: string,
//   photo?: string,
//   singleBeds?: number,
//   doubleBeds?: number,
//   kingSizeBeds?: number,
//   babyCots?: number,
//   airConditioning?: boolean,
//   centralHeating?: boolean,
//   fireplace?: boolean,
//   minibar?: boolean,
//   balcony?: boolean,
//   disabilityFriendly?: boolean,
//   kitchen?: boolean;
// }

// % TEST ONLY
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: "root",
})
export class RoomsService {

  private rooms: Array<Room> = [
    {
      id: 'ohm-h1-r1',
      name: "1",
      photo: undefined,
      singleBeds: 1,
      doubleBeds: 0,
      babyCots: 0,
      disabilityFriendly: true,
      available: true
    },
    {
      id: 'ohm-h1-r2',
      name: "2",
      photo: "../assets/febrian-zakaria-gwV9eklemSg-unsplash.jpg",
      singleBeds: 0,
      doubleBeds: 0,
      babyCots: 0,
      disabilityFriendly: true,
      available: true
    },
    {
      id: 'ohm-h1-r3',
      name: "3",
      photo: "../assets/edelle-bruton-PJNO2sLlbB8-unsplash.jpg",
      singleBeds: 2,
      doubleBeds: 0,
      babyCots: 1,
      disabilityFriendly: true,
      available: true
    },
  ];

  // public rooms: Array<Room> = [];
  private orderBy: String;

  private user$: any;
  public userData: any | undefined;
  private db: any;

  constructor(private http: HttpClient, public authService: AuthService) {
    this.orderBy = "name";
    // this.user$ = usersService.currentUserProfile$;
    // this.user$.subscribe((userDataFromObservable: any) => this.userData = userDataFromObservable);
    this.db = getDatabase();

    this.authService.currentUser$.subscribe(
      data => this.userData = data
    );
  }

  // % TEST ONLY
  getAllPosts(): Observable<Post[]> {
    const url = "https://jsonplaceholder.typicode.com/posts";
    return this.http.get<Post[]>(url);
  }

  orderRooms(orderBy?: String) {
    //this.rooms = [...this.roomsData];
    // order by
    switch (orderBy) {
      case "singleBeds":
        this.orderBy = "singleBeds";
        console.log("Order by single beds");
        break;
      case "dooubleBeds":
        this.orderBy = "dooubleBeds";
        console.log("Order by double beds");
        break;
      default:
        this.orderBy = "name";
        // order by number
        // console.log("order by number");
        this.rooms.sort(
          (first, second) => 0 - (first.name > second.name ? -1 : 1)
        );
        // console.log("roomsListOutput", roomsListOutput);
        break;
    }
    //console.log("#rooms.service - getrooms()",this.rooms);
    // return roomsListOutput;
    return this.rooms;
  }

  getRooms(): Array<Room> {
    return this.rooms;
  }

  getRoom(roomId: string): any {
    const room = this.rooms.find(r => r.id === roomId);
    // console.log("#roomsService: getRoom::",this.rooms);
    // console.log("#roomsService: getRoom::",roomId);
    return room;
  }

  addRoom(_newRoomData: Room) {
    if(this.userData !== undefined && this.userData.uid) {
      _newRoomData.id = `ohm-${this.userData.uid}-r${this.rooms.length+1}`;
      _newRoomData.available = true;
      this.rooms.push(_newRoomData);
      console.log("$$$",this.userData.email, this.userData.uid);
      set(ref(this.db, `hotels/${this.userData.uid}/rooms/${_newRoomData.id}`), _newRoomData);
    }
  }

  updateRoom(_updatedRoomData: Room): void {
    // code responsible for updating a room in the rooms object, contained in the rooms.service
    // find the room to be edited in the rooms array
    console.log("#rooms.service: updateRoom():: _updatedRoomData.id:::",_updatedRoomData.id);
    let roomToUpdate: any = this.rooms.find(room => room.id === _updatedRoomData.id);
    // console.log("#rooms.service: updateRoom():: roomToUpdate", roomToUpdate);
    //room = _updatedRoomData;
    // console.log(this.rooms);
    // HTTP POST - send new room data to API
    // return success or error ?
  }

  updateToggleRoomAvailable(roomId: String): void {
    // maybe this method should simply call the updateRoom method and define the change using the parameters passed to it
    let roomToUpdate: any = this.rooms.find(room => room.id === roomId);
    if(roomToUpdate !== undefined) {
      roomToUpdate.available = !roomToUpdate.available;
      this.orderRooms(this.orderBy);
    } else {
      console.log("#rooms.service - updateToggleRoomAvailable() - Room not found.");
    }
  }
}
