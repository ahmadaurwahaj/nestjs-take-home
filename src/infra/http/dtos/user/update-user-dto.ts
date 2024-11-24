import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsInt, Min } from 'class-validator';

export class UserUpdateBody {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({ required: false, minimum: 0 })
  age?: number;
}
