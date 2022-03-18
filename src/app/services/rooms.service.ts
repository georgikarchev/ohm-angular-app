import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Room {
  number: string,
  description?: string,
  singleBeds?: number,
  doubleBeds?: number,
  kingSizeBeds?: number,
  babyCots?: number,
  airConditioning?: boolean,
  centralHeating?: boolean,
  fireplace?: boolean,
  minibar?: boolean,
  balcony?: boolean,
  disabilityFriendly?: boolean,
  kitchen?: boolean;
}

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
      number: '1',
      description: 'A cozy room for a single person.',
      singleBeds: 1,
      doubleBeds: 0,
      kingSizeBeds: 0,
      babyCots: 0,
      airConditioning: true,
      centralHeating: true,
      fireplace: false,
      minibar: true,
      balcony: true,
      disabilityFriendly: true,
      kitchen: false
    },
    {
      number: '2',
      description: 'A very cozy room for two.',
      singleBeds: 0,
      doubleBeds: 0,
      kingSizeBeds: 1,
      babyCots: 0,
      airConditioning: true,
      centralHeating: true,
      fireplace: false,
      minibar: true,
      balcony: true,
      disabilityFriendly: true,
      kitchen: false
    },
    {
      number: '3',
      description: 'A big room suitable for big families.',
      singleBeds: 2,
      doubleBeds: 0,
      kingSizeBeds: 1,
      babyCots: 1,
      airConditioning: true,
      centralHeating: true,
      fireplace: true,
      minibar: true,
      balcony: true,
      disabilityFriendly: true,
      kitchen: true
    }
  ];

 
  

  constructor(private http: HttpClient) {}

  // % TEST ONLY
  getAllPosts() : Observable<Post[]> { 
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Post[]>(url);
  }


  getRooms() {
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

     this.rooms.push(newRoomData);
  }
}
