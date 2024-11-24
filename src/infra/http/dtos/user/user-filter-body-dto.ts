import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UserFilterBody {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  @ApiProperty({ required: false, minimum: 0 })
  age?: number;
}
