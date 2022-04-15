import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'ohm-app';
  showHero: boolean = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/home' || event.url == '/') {
          this.showHero = true;
        } else {
          this.showHero = false;
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  // notifications: Notification[] = [
  //   {
  //     type: "green",
  //     text: "We are happy that you joined us! Have fun!",
  //     dismissed: false
  //   },
  //   {
  //     type: "yellow",
  //     text: "New guests will be arriving today at 12:00. Please clean Room 3.",
  //     dismissed: false
  //   },
  //   {
  //     type: "red",
  //     text: "Room 3 is still occupied. Please confirm check out!",
  //     dismissed: false
  //   },
  // ];
}
