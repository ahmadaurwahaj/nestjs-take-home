import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CONFIG } from './redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;

  async onModuleInit() {
    // Initialize Redis connections
    this.publisher = new Redis(REDIS_CONFIG.port, REDIS_CONFIG.host);
    this.subscriber = new Redis(REDIS_CONFIG.port, REDIS_CONFIG.host);
  }

  async onModuleDestroy() {
    // Gracefully close Redis connections
    await this.publisher.quit();
    await this.subscriber.quit();
  }

  async publish(queue: string, message: any) {
    const messageString = JSON.stringify(message);
    await this.publisher.lpush(queue, messageString);
  }

  async consume(queue: string, onMessage: (msg: any) => void) {
    const processMessage = async () => {
      const message = await this.subscriber.rpop(queue);
      if (message) {
        const parsedMessage = JSON.parse(message);
        onMessage(parsedMessage);
      }
    };

    // Poll the queue continuously
    setInterval(processMessage, 500); // Adjust polling interval as needed
  }
}
