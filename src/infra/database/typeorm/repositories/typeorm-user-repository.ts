import { User } from '../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindManyOptions,
  FindOptionsWhere,
  MoreThan,
} from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TypeOrmUserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  /**
   * Create a new user.
   * @param user - Partial user object containing the required properties (name, email, age).
   * @returns The created user.
   */
  create(user: Partial<User>): Promise<User> {
    const model = this.repository.create(user);
    return this.repository.save(model);
  }

  /**
   * Find a user by ID.
   * @param userId - The ID of the user.
   * @returns The user if found, otherwise null.
   */
  findById(userId: number): Promise<User | null> {
    return this.repository.findOneBy({ userId });
  }

  /**
   * Get all users.
   * @returns A list of all users in the database.
   */
  findMany(): Promise<User[]> {
    return this.repository.find();
  }

  /**
   * Update a user's information by ID.
   * @param userId - The ID of the user to update.
   * @param data - Partial user data to update.
   */
  async save(userId: number, data: Partial<User>): Promise<void> {
    const user = await this.repository.findOneBy({ userId });

    if (!user) throw new Error('User not found');

    Object.assign(user, data);
    await this.repository.save(user);
  }

  /**
   * Delete a user by ID.
   * @param userId - The ID of the user to delete.
   */
  async delete(userId: number): Promise<void> {
    await this.repository.softDelete(userId);
  }

  /**
   * Paginate through users with optional search options.
   * @param options - Pagination options (page, limit).
   * @param searchOptions - Additional search or filtering options.
   * @returns A paginated result of users.
   */
  async paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<User> | FindManyOptions<User>,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.repository, options, {
      order: { userId: 'DESC' },
      ...searchOptions,
    });
  }

  /**
   * Get all users older than a specific age, sorted by name.
   * @param minAge - The minimum age to filter by.
   * @returns A list of users sorted by name.
   */
  async findUsersOverAge(minAge: number): Promise<User[]> {
    return this.repository.find({
      where: { age: MoreThan(minAge) },
      order: { name: 'ASC' },
    });
  }
}
