import { Component, Input, OnInit } from '@angular/core';

export interface Notification {
  type: string,
  text: string,
  dismissed: boolean
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() notification!: Notification;
  // TODO call parent module and delete the dismissed notification

  constructor() { }

  ngOnInit(): void {
  }

  handleNotificationClick(notificationClicked: Notification): void {
    notificationClicked.dismissed = true;
  }

}
