import { Notification } from './notification';
import { Content } from './notification-content';

describe('Notification', () => {
  it('Should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'alskncalkscna',
      content: new Content('Conteúdo válido!'),
      category: 'social',
    });
    expect(notification).toBeTruthy();
  });
});
