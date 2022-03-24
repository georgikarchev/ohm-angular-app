import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Room {
  number: string;
  photo?: string;
  singleBeds?: number;
  doubleBeds?: number;
  babyCots?: number;
  disabilityFriendly?: boolean;
  available?: boolean;
}

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
      number: "1",
      photo: "",
      singleBeds: 1,
      doubleBeds: 0,
      babyCots: 0,
      disabilityFriendly: true,
      available: true
    },
    {
      number: "2",
      photo: "../assets/febrian-zakaria-gwV9eklemSg-unsplash.jpg",
      singleBeds: 0,
      doubleBeds: 0,
      babyCots: 0,
      disabilityFriendly: true,
      available: true
    },
    {
      number: "3",
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

  constructor(private http: HttpClient) {
    this.orderBy = "number";
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
        this.orderBy = "number";
        // order by number
        // console.log("order by number");
        this.rooms.sort(
          (first, second) => 0 - (first.number > second.number ? -1 : 1)
        );
        // console.log("roomsListOutput", roomsListOutput);
        break;
    }
    console.log("#rooms.service - getrooms()",this.rooms);
    // return roomsListOutput;
    return this.rooms;
  }

  addRoom(_newRoomData: Room) {
    //number: string, description: string, singleBeds: number, doubleBeds: number, kingSizeBeds: number, babyCots: number, airConditioning: boolean, centralHeating: boolean, fireplace: boolean, minibar: boolean, balcony: boolean, disabilityFriendly: boolean, kitchen: boolean
    //  let newRoom: Room = {
    //   number: number,
    //   description: description,
    //   singleBeds: singleBeds,
    //   doubleBeds: doubleBeds,
    //   kingSizeBeds: kingSizeBeds,
    //   babyCots: babyCots,
    //   airConditioning: airConditioning,
    //   centralHeating: centralHeating,
    //   fireplace: fireplace,
    //   minibar: minibar,
    //   balcony: balcony,
    //   disabilityFriendly: disabilityFriendly,
    //   kitchen: kitchen
    //  };

    // check new room data object if needed

    // HTTP POST - send new room data to API

    //console.log("#rooms.service", _newRoomData);
    this.rooms.push(_newRoomData);
  }

  updateRoom(): void {
    // HTTP POST - send new room data to API
    // code responsible for updating a room in the rooms object, contained in the rooms.service
    // return success or error ?
  }

  updateToggleRoomAvailable(_roomIdentifier: String): void {
    // maybe this method should simply call the updateRoom method and define the change using the parameters passed to it
    let roomToUpdate: any = this.rooms.find(room => room.number === _roomIdentifier);
    if(roomToUpdate !== undefined) {
      roomToUpdate.available = !roomToUpdate.available;
      this.orderRooms(this.orderBy);
    } else {
      console.log("#rooms.service - updateToggleRoomAvailable() - Room not found.");
    }
  }
}
