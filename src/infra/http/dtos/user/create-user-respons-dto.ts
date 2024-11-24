import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user-dto';

export class UserCreateResponse {
  @ApiProperty({ example: 'User created successfully' })
  message: string;

  @ApiProperty({ type: UserDTO })
  user: UserDTO;
}
