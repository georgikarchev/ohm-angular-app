import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoading: boolean = true;
  userEmail: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((data) => {
      // console.log(data?.email);
      this.userEmail = data?.email?.toString();
    });
  }

  logout():void {
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/']);
    });
  }

}
