import { Module } from '@nestjs/common';
import LikedController from './liked.controller';
import { LikedService } from './liked.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liked } from './liked.entity';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [TypeOrmModule.forFeature([Liked]), UsersModule, TrackModule],
  controllers: [LikedController],
  providers: [LikedService],
  exports: [LikedService],
})
export class LikedModule {}
