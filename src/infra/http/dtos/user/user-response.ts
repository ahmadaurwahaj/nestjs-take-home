import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 'Operation successful' })
  message: string;
}
