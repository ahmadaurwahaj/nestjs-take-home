import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { User } from '@infra/database/typeorm/entities';
import { UserGetBody } from '@infra/http/dtos/user';

interface GetUserRequest {
  body: UserGetBody;
}

export interface GetUserResponse {
  user: User | null;
}

@Injectable()
export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const { userId } = request.body;
    const user = await this.userRepository.findById(userId);
    return { user };
  }
}
