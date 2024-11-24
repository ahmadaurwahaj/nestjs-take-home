import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { User } from '@infra/database/typeorm/entities';
import { GetUsersByMinAgeBody } from '@infra/http/dtos/user';

interface GetUsersByMinAgeRequest {
  body: GetUsersByMinAgeBody;
}

export interface GetUsersByMinAgeResponse {
  users: User[];
}

@Injectable()
export class GetUsersByMinAge {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: GetUsersByMinAgeRequest,
  ): Promise<GetUsersByMinAgeResponse> {
    const { minAge } = request.body;
    const users = await this.userRepository.findUsersOverAge(minAge);
    return { users };
  }
}
