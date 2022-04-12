import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap, tap } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _currentUserUid: string = '';
  user: any;
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private storage: StorageService) {
    // console.log("AuthService constructor # currentUserUid", this.currentUserUid);
  }

  get currentUserUid() {
    if(this._currentUserUid === '') {
      if(this.storage.getItem('uid') !== null) {
        var token: any = this.storage.getItem('uid');
        if (token == null) {
          token = undefined;
        } 
        this._currentUserUid = token;
      }
    }
    return this._currentUserUid;
  }

  set currentUserUid(value: string) {
    this._currentUserUid = value;
  }

  signUp(
    name: string,
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
    // .pipe(
    //   tap(data => {
    //     console.log('AuthService#data.user',data.user);
    //     this.currentUserUid = data.user.uid;
    //   })
    // );
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((data) => {
        // console.log('AuthService#data.user',data.user);
        this.user = data.user;
        this.currentUserUid = data.user.uid;
        this.storage.setItem('uid',data.user.uid);
      })
    );
  }

  // updateProfile(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.auth.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  logout(): Observable<any> {
    this.currentUserUid = '';
    this.storage.removeItem('uid');
    return from(this.auth.signOut());
  }
}
