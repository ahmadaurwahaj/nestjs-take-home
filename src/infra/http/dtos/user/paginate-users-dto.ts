import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UserPaginateQuery {
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  page: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1 })
  limit: number;

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
