import { Module } from '@nestjs/common';
import LikedController from './liked.controller';
import { LikedService } from './liked.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liked } from './liked.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Liked]), UsersModule],
  controllers: [LikedController],
  providers: [LikedService],
  exports: [LikedService],
})
export class LikedModule {}
