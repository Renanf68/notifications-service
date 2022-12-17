import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

const notificationsRepository = new InMemoryNotificationsRepository();
const getRecipientNotifications = new GetRecipientNotifications(
  notificationsRepository,
);

describe('Get recipient notifications', () => {
  it('Should be able to get recipient notifications list', async () => {
    const recipientId = 'fake-recipient-id';
    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(makeNotification({ recipientId }));
    await notificationsRepository.create(makeNotification({ recipientId }));
    const data = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(data.notifications).toHaveLength(3);
    expect(data.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
