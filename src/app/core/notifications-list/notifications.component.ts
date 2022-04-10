import { Component, Input, OnInit } from '@angular/core';
// import { Notification } from '../notification/notification.component';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationService],
})
export class NotificationsListComponent implements OnInit {
  showNotifications: boolean;

  // TODO - this module should handle the notifications logic
  // when all notifications are dismissed the "show notifications" button should NOT be shown

  // #1 receiving the notifications data from the parent component
  //@Input() notifications!: Notification[];

  // #2 declaring variable to hold the notifications data
  notifications!: Notification[];

  constructor(private notificationsService: NotificationService) {
    this.showNotifications = false;

    // #2 getting the notifications data from a service, placed in this same folder
  }

  ngOnInit(): void {
    this.notificationsService.fetchNotifications();
    this.notifications = this.notificationsService.getNotifications();
  }

  toggleNotificationsVisibilityHandler(): void {
    this.showNotifications = this.notificationsService.toggleNotificationsVisibility();
    //this.showNotifications = !this.showNotifications;
  }

  getNumberOfUndismissedNotifications(): Number {
    return this.notificationsService.getNumberOfUndismissedNotifications();
  }
}
