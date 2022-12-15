import { Notification } from '../entities/notification';

// creates a contrat of methods that should exists in persistence flow
export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
