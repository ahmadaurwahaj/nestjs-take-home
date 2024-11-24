import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { UserUpdateBody } from '@infra/http/dtos/user';

interface UpdateUserRequest {
  userId: number;
  body: UserUpdateBody;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<void> {
    await this.userRepository.save(request.userId, request.body);
  }
}
