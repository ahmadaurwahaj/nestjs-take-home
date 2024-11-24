import { User } from '@infra/database/typeorm/entities';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export abstract class UserRepository {
  /**
   * Create a new user.
   * @param user - Partial user object containing the required properties (name, email, age).
   * @returns The created user entity.
   */
  abstract create(user: Partial<User>): Promise<User>;

  /**
   * Find a user by their ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The user entity if found, otherwise null.
   */
  abstract findById(userId: number): Promise<User | null>;

  /**
   * Retrieve all users from the database.
   * @returns A list of user entities.
   */
  abstract findMany(): Promise<Array<User>>;

  /**
   * Update an existing user.
   * @param userId - The ID of the user to update.
   * @param data - Partial user data for the update.
   */
  abstract save(userId: number, data: Partial<User>): Promise<void>;

  /**
   * Delete a user by their ID.
   * @param userId - The ID of the user to delete.
   */
  abstract delete(userId: number): Promise<void>;

  /**
   * Paginate through the users with optional search filters.
   * @param options - Pagination options (page, limit).
   * @param searchOptions - Additional search or filtering options.
   * @returns A paginated result of users.
   */
  abstract paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<User> | FindManyOptions<User>,
  ): Promise<Pagination<User>>;

  /**
   * Retrieve all users older than a specified age, sorted by name.
   * @param minAge - The minimum age to filter by.
   * @returns A list of user entities sorted by name.
   */
  abstract findUsersOverAge(minAge: number): Promise<Array<User>>;
}
