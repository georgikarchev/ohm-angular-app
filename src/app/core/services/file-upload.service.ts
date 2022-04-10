// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable, switchAll, switchMap } from 'rxjs';
// import { ref, Storage, uploadBytes } from '@angular/fire/storage';
// import { getDownloadURL } from 'firebase/storage';
// import { pipe, from } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient, private storage: Storage) {}

  onUpload() {
    // this.http.post
  }

  uploadFile(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
