import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { QUEUES } from './redis.config';

@Injectable()
export class UserProducerService {
  constructor(private readonly redisService: RedisService) {}

  async sendWelcomeMessage(user: {
    userId: number;
    name: string;
    email: string;
  }) {
    const message = {
      subject: 'Welcome',
      body: `Welcome, ${user.name}! Thank you for joining us.`,
      recipientEmail: user.email,
    };
    await this.redisService.publish(QUEUES.WELCOME_QUEUE, message);
  }
}
