import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

type RequiredField = 'name' | 'email' | 'age';

export type UserCreateInput = Required<Pick<User, RequiredField>> &
  Partial<Omit<User, RequiredField>>;

@Entity('users')
@Index('idx_users_age_name', ['age', 'name']) // Indexing name and age because we will be querying for users based on their ages and then sorting it by their name. Indexing these two fields together will help in performance optimisation.
export class User extends BaseEntity {
  constructor(params?: UserCreateInput) {
    super();
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;
}
