import { Component } from '@angular/core';
import { Notification } from './notifications/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ohm-app';

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