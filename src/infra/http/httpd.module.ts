import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import {
  CreateUser,
  GetUser,
  GetUsersByMinAge,
  DeleteUser,
  UpdateUser,
  ListUsers,
} from '@application/use-cases/user';
import { UserController } from './controllers/user.controller';
import { RedisService } from '@infra/queue/redis.service';
import { UserProducerService } from '@infra/queue/user-producer.service';
import { UserConsumerService } from '@infra/queue/user-service';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    //UserController
    CreateUser,
    UpdateUser,
    DeleteUser,
    GetUser,
    GetUsersByMinAge,
    ListUsers,

    //Redis

    RedisService,
    UserProducerService,
    UserConsumerService,
  ],
})
export class HttpModule {}
