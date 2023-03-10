import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

const notificationsRepository = new InMemoryNotificationsRepository();
const cancelNotification = new CancelNotification(notificationsRepository);

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notification = makeNotification();
    await notificationsRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });
    const canceledNotification = notificationsRepository.notifications.find(
      (notif) => notif.id === notification.id,
    );
    expect(canceledNotification?.canceledAt).toEqual(expect.any(Date));
  });
  it('Should not be able to cancel a non existing notification', async () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'not-a-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
