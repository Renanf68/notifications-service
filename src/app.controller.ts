import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNoficationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNoficationBody) {
    const { recipientId, content, category } = body;
    return this.prisma.notification.create({
      data: {
        id: randomUUID(),
        recipientId,
        content,
        category,
      },
    });
  }
}
