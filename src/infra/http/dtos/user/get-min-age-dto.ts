import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class GetUsersByMinAgeBody {
  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  minAge: number;
}
