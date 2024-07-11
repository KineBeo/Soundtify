import { ApiProperty } from '@nestjs/swagger';

export default class LikedDto {
  @ApiProperty({ required: true })
  trackId: number;
  @ApiProperty({ required: true })
  userId: number;
}
