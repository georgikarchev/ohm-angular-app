import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorage = localStorage;

  constructor() { }


  setItem<T>(key: string, item:T): T | null {
    this.localStorage.setItem(key, JSON.stringify(item));
    return item;
  }

  getItem<T>(key: string): T | null{
    let item;
    const tmp = this.localStorage.getItem(key) as any;
    if(!tmp) { return null; }
    try {
      item = JSON.parse(tmp);
    } catch {
      item = tmp;
    }
    return item;
  }

  removeItem<T>(key: string) {
    const tmp = this.localStorage.getItem(key) as any;
    if(tmp) {
      try {
        this.localStorage.removeItem(key);
      } catch {
        console.error("Local storage# Could not delete item: "+key);
        
      }
    }
  }
}
