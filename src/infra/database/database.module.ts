import { UserRepository } from '@application/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities';
import { ExistConstraint } from './typeorm/helpers/decorators/exist.decorator';
import { UniqueConstraint } from './typeorm/helpers/decorators/unique.decorator';
import { TypeOrmUserRepository } from './typeorm/repositories/typeorm-user-repository';

const RULES = [ExistConstraint, UniqueConstraint];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    ...RULES,
  ],
  exports: [TypeOrmModule, UserRepository],
})
export class DatabaseModule {}
