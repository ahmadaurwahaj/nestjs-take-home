import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;
}
