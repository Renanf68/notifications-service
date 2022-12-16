import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { SendNotification } from './send-notification';

describe('Cancel notification', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const cancelNotification = new CancelNotification(notificationsRepository);

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
});
