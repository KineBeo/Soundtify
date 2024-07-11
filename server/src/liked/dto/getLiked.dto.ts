import { ApiProperty } from '@nestjs/swagger';

export default class getLikedDto {
  @ApiProperty({ required: true })
  userId: number;
}
