import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikedService } from './liked.service';
import JwtAuthenticationGuard from 'src/guards/jwt-authentication.guard';
import User from 'src/users/uses.entity';
import LikedDto from './dto/liked.dto';
import getLikedDto from './dto/getLiked.dto';
import { likedTrackDto } from './dto/likedTracks.dto';

@Controller('liked')
export default class LikedController {
  constructor(private readonly likedService: LikedService) {}

  // Checked
  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async addLike(@Body() dto: LikedDto) {
    const { trackId, userId } = dto;
    return this.likedService.addLike(trackId, userId);
  }

  // Checked
  @Delete()
  @UseGuards(JwtAuthenticationGuard)
  async removeLike(@Body() dto: LikedDto) {
    const { trackId, userId } = dto;
    return this.likedService.removeLiked(trackId, userId);
  }

  // Checked
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getLiked(@Body() dto: getLikedDto) {
    const { userId } = dto;
    return this.likedService.getLiked(userId);
  }

  // Checked
  @Post('check')
  @UseGuards(JwtAuthenticationGuard)
  async checkLiked(@Body() dto: LikedDto) {
    const { trackId, userId } = dto;
    return this.likedService.checkLiked(trackId, userId);
  }

  @Post('liked-list')
  @UseGuards(JwtAuthenticationGuard)
  async getLikedTrackLis(@Body() dto: likedTrackDto) {
    const { liked } = dto;
    return this.likedService.getLikedTracks(liked);
  }
}
