import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsInt, Min } from 'class-validator';

export class UserCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  age: number;
}
