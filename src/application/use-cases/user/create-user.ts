import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { User } from '@infra/database/typeorm/entities';
import { UserCreateBody } from '@infra/http/dtos';
import { UserProducerService } from '@infra/queue/user-producer.service';
interface CreateUserRequest {
  body: UserCreateBody;
}

export interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private userProducerService: UserProducerService,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userRepository.create(request.body);
    await this.userProducerService.sendWelcomeMessage(user);

    return { user };
  }
}
