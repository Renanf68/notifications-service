import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

const notificationsRepository = new InMemoryNotificationsRepository();
const readNotification = new ReadNotification(notificationsRepository);

describe('Read notification', () => {
  it('Should be able to read a notification', async () => {
    const notification = makeNotification();
    await notificationsRepository.create(notification);
    await readNotification.execute({ notificationId: notification.id });
    const read = notificationsRepository.notifications.find(
      (notif) => notif.id === notification.id,
    );
    expect(read?.readAt).toEqual(expect.any(Date));
  });
  it('Should not be able to read a non existing notification', async () => {
    expect(() => {
      return readNotification.execute({
        notificationId: 'not-a-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
