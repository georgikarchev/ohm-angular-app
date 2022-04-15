import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLogo: boolean = true;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if(event.url == '/home') {
              this.showLogo = false;
          }
          else {
            this.showLogo = true;
          }
        }
    });
  }

  ngOnInit(): void {
    // this.setLogoVisibility(this.router);
  }

  // setLogoVisibility(router: Router) {
  //   console.log(this.router.url)
  //   if(this.router.url === '/') {
  //     console.log('tuk')
  //     this.showLogo = false;
  //   }
  // }

  // TODO - move the handler to the app.component
  // logout():void {
  //   this.authService.logout().subscribe(()=>{
  //     this.router.navigate(['/']);
  //   });
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.setLogoVisibility(this.router);
  // }

}
