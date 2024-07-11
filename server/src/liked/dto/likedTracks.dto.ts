import { ApiProperty } from '@nestjs/swagger';

export class likedTrackDto {
  @ApiProperty({ required: true })
  liked: number[];
}
