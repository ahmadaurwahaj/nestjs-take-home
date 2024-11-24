import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UserDeleteBody {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  userId: number;
}
