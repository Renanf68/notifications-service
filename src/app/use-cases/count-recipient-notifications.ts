import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}
interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;
    // call repository to persist dada in db
    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );
    // return response
    return { count };
  }
}
