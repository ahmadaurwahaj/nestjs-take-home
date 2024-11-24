import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { User } from '@infra/database/typeorm/entities';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, ILike } from 'typeorm';
import { UserFilterBody, UserListResponse } from '@infra/http/dtos';

interface ListUsersRequest {
  options: IPaginationOptions;
  filters: UserFilterBody;
}

export interface ListUsersResponse {
  pagination: Pagination<User>;
}

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(request: ListUsersRequest): Promise<UserListResponse> {
    const { options, filters } = request;

    // Build TypeORM-compatible `where` conditions dynamically
    const where: FindOptionsWhere<User> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`); // Case-insensitive LIKE query for name
    }
    if (filters.email) {
      where.email = ILike(`%${filters.email}%`); // Case-insensitive LIKE query for email
    }
    if (filters.age !== undefined) {
      where.age = filters.age; // Exact match for age
    }

    // Use the repository to paginate results with filters applied
    const { items, meta } = await this.userRepository.paginate(options, {
      where,
    });

    return { users: items, meta };
  }
}
