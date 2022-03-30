import { Injectable } from '@angular/core';

export interface Notification {
  id: string,
  type: string,
  text: string,
  dismissed: boolean
}

interface NotificationsState {
  notifications: Array<any>,
  notificationAreVisible: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private NotificationsState: NotificationsState = {
    notifications: [],
    notificationAreVisible: false
  };
  
  // private notifications: Notification[] = [
  //   {
  //     id: 'notification-id-1',
  //     type: "green",
  //     text: "We are happy that you joined us! Have fun!",
  //     dismissed: false
  //   },
  //   {
  //     id: 'notification-id-2',
  //     type: "yellow",
  //     text: "New guests will be arriving today at 12:00. Please clean Room 3.",
  //     dismissed: false
  //   },
  //   {
  //     id: 'notification-id-3',
  //     type: "red",
  //     text: "Room 3 is still occupied. Please confirm check out!",
  //     dismissed: false
  //   },
  //   {
  //     id: 'notification-id-4',
  //     type: "red",
  //     text: "Another red one",
  //     dismissed: false
  //   },
  // ];

  constructor() {
    this.NotificationsState.notificationAreVisible = false;
   }

  fetchNotifications(): void {
    this.NotificationsState.notifications = [
      {
        id: 'notification-id-1',
        type: "green",
        text: "We are happy that you joined us! Have fun!",
        dismissed: false
      },
      {
        id: 'notification-id-2',
        type: "yellow",
        text: "New guests will be arriving today at 12:00. Please clean Room 3.",
        dismissed: false
      },
      {
        id: 'notification-id-3',
        type: "red",
        text: "Room 3 is still occupied. Please confirm check out!",
        dismissed: false
      },
      {
        id: 'notification-id-4',
        type: "red",
        text: "Another red one",
        dismissed: false
      },
    ];
  }

  toggleNotificationsVisibility(): boolean {
    return this.NotificationsState.notificationAreVisible = !this.NotificationsState.notificationAreVisible;
  }

  getNotificationsVisibility(): boolean {
    return this.NotificationsState.notificationAreVisible;
  }

  getNumberOfUndismissedNotifications(): Number {
    return this.NotificationsState.notifications.filter((obj) => obj.dismissed === false).length;
  }

  getNotifications(): Array<Notification> {
    return this.NotificationsState.notifications;
  }

  dismissNotification(_notId: string): void {
    const notificationToBeDismissed = this.NotificationsState.notifications.find(currentNotification => currentNotification.id === _notId);
    notificationToBeDismissed!.dismissed = false;
  }
}
