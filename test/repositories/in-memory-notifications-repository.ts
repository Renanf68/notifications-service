import { Notification } from 'src/app/entities/notification';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';

// fake notificationsRepository to make dependency inversion
export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  // create a db substitute to initial tests
  public notifications: Notification[] = [];
  // create method
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
