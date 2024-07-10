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

@Controller('liked')
export default class LikedController {
  constructor(private readonly likedService: LikedService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async addLike(@Req() req, @Body('trackId') trackId: number) {
    return this.likedService.addLike(trackId, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async removeLike(@Param('id') trackId: number, user: User) {
    return this.likedService.removeLiked(trackId, user);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getLiked(user: User) {
    return this.likedService.getLiked(user);
  }

  @Post('check')
  @UseGuards(JwtAuthenticationGuard)
  async checkLiked(user: User, @Body() trackId: number) {
    return this.likedService.checkLiked(trackId, user);
  }
}
