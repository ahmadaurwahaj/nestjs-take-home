import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user-dto';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class UserListResponse {
  @ApiProperty({ type: [UserDTO] })
  users: UserDTO[];

  @ApiProperty({ example: 'Metadata of Pagination' })
  meta?: IPaginationMeta;
}
