import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Room {
  number: string,
  photo?: string,
  singleBeds?: number,
  doubleBeds?: number,
  kingSizeBeds?: number,
  babyCots?: number,
  disabilityFriendly?: boolean,
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
  providedIn: 'root'
})

export class RoomsService {
  public rooms: Array<Room> = [
    {
      number: '3',
      photo: "../assets/edelle-bruton-PJNO2sLlbB8-unsplash.jpg",
      singleBeds: 2,
      doubleBeds: 0,
      kingSizeBeds: 1,
      babyCots: 1,
      disabilityFriendly: true
    },
    {
      number: '1',
      photo: "",
      singleBeds: 1,
      doubleBeds: 0,
      kingSizeBeds: 0,
      babyCots: 0,
      disabilityFriendly: true
    },
    {
      number: '2',
      photo: "../assets/febrian-zakaria-gwV9eklemSg-unsplash.jpg",
      singleBeds: 0,
      doubleBeds: 0,
      kingSizeBeds: 1,
      babyCots: 0,
      disabilityFriendly: true,
    },
  ];

 
  

  constructor(private http: HttpClient) {}

  // % TEST ONLY
  getAllPosts() : Observable<Post[]> { 
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Post[]>(url);
  }


  getRooms(orderBy?: String) {
    const roomsListOutput: Array<Room> = [...this.rooms];
    // order by
    switch(orderBy){
      case "singleBeds":
        console.log("Order by single beds");
      break;
      case "dooubleBeds":
        console.log("Order by double beds");
      break;
      case "kingsizeBeds":
        console.log("Order by double beds");
      break;
      default: // order by number
        console.log("order by number");
        roomsListOutput.sort((first, second) => 0 - (first.number > second.number ? -1 : 1));
        console.log("roomsListOutput", roomsListOutput);
      break;
    }
    return this.rooms;
  }

  addRoom(newRoomData: Room){
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

    // return
    this.rooms.push(newRoomData);
  }

  updateRoom(): void {
    // HTTP POST - send new room data to API

    // code responsible for updating a room in the rooms object, contained in the rooms.service

    // return success or error ?
    
  }

  updateToggleRoomAvailable(roomId: string): void {
    // maybe this method should simply call the updateRoom method and define the change using the parameters passed to it
  }
}
