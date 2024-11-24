import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { UserDeleteBody } from '@infra/http/dtos/user';

interface DeleteUserRequest {
  body: UserDeleteBody;
}

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: DeleteUserRequest): Promise<void> {
    const { userId } = request.body;
    await this.userRepository.delete(userId);
  }
}
