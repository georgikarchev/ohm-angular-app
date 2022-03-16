import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../notification/notification.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  showNotifications: boolean;

  // TODO - this module should handle the notifications logic
  // when all notifications are dismissed the "show notifications" button should NOT be shown

  @Input() notifications!: Notification[];

  constructor() {
    this.showNotifications = true;
  }

  ngOnInit(): void {
  }

  toggleNotificationsVisibilityHandler(): void {
    this.showNotifications = !this.showNotifications;
  }

}
