import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';

// fake notificationsRepository to make dependency inversion
export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  // create a db substitute to initial tests
  public notifications: Notification[] = [];
  // find
  async findById(notificationId: string): Promise<Notification | null> {
    const result = this.notifications.find(
      (item) => item.id === notificationId,
    );
    return result ?? null;
  }
  // create method
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
  async save(notification: Notification): Promise<void> {
    this.notifications = this.notifications.map((item) => {
      if (item.id === notification.id) return notification;
      else return item;
    });
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const notifications = this.notifications.filter(
      (item) => item.recipientId === recipientId && !item.readAt,
    );
    return notifications.length;
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      (item) => item.recipientId === recipientId && !item.readAt,
    );
    return notifications;
  }
}
