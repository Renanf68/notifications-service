import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

const notificationsRepository = new InMemoryNotificationsRepository();
const unreadNotification = new UnreadNotification(notificationsRepository);

describe('Unread notification', () => {
  it('Should be able to unread a notification', async () => {
    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });
    const unread = notificationsRepository.notifications.find(
      (notif) => notif.id === notification.id,
    );
    expect(unread?.readAt).toBeNull();
  });
  it('Should not be able to unread a non existing notification', async () => {
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'not-a-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
