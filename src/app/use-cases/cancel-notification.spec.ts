import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { SendNotification } from './send-notification';

const notificationsRepository = new InMemoryNotificationsRepository();
const sendNotification = new SendNotification(notificationsRepository);
const cancelNotification = new CancelNotification(notificationsRepository);

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const { notification } = await sendNotification.execute({
      recipientId: 'slcknalskcna',
      content: 'Conteúdo da notificação',
      category: 'social',
    });

    await cancelNotification.execute({ notificationId: notification.id });

    const canceledNotificatio = notificationsRepository.notifications.find(
      (notif) => notif.id === notification.id,
    );
    expect(canceledNotificatio?.canceledAt).toEqual(expect.any(Date));
  });
  it('Should be not able to cancel a non existing notification', async () => {
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'not-a-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
