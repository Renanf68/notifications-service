import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

const notificationsRepository = new InMemoryNotificationsRepository();
const countNotification = new CountRecipientNotifications(
  notificationsRepository,
);

describe('Count recipient notifications', () => {
  it('Should be able to count recipient notifications', async () => {
    const recipientId = 'fake-recipient-id';

    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(
      makeNotification({ recipientId: 'other-fake-id' }),
    );

    const notifications = await countNotification.execute({ recipientId });

    expect(notifications.count).toEqual(2);
  });
});
