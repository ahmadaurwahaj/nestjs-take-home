import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from './redis.service';
import { QUEUES } from './redis.config';

@Injectable()
export class UserConsumerService implements OnModuleInit {
  constructor(private readonly redisService: RedisService) {}

  async onModuleInit() {
    await this.redisService.consume(
      QUEUES.WELCOME_QUEUE,
      this.processWelcomeMessage.bind(this),
    );
  }

  private processWelcomeMessage(message: any) {
    console.log('Processing Welcome Message:', message);
  }
}
