import { Notification, NotificationProps } from '@app/entities/notification';
import { Content } from '@app/entities/notification-content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'fake-recipient-id',
    content: new Content('Conteúdo da notificação'),
    category: 'social',
    ...override,
  });
}
