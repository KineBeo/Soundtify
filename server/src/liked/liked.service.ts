import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Liked } from './liked.entity';
import { Repository } from 'typeorm';
import User from 'src/users/uses.entity';
import { Track } from 'src/track/track.entity';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class LikedService {
  constructor(
    @InjectRepository(Liked)
    private likedRepository: Repository<Liked>,
    private readonly trackService: TrackService,
  ) {}

  async addLike(trackId: number, userId: number): Promise<Liked> {
    try {
      return await this.likedRepository.save({ trackId, userId });
    } catch (error) {
      console.error(error);
    }
  }

  async removeLiked(trackId: number, userId: number): Promise<object> {
    try {
      const result = await this.likedRepository.delete({
        trackId,
        userId,
      });

      if (result.affected === 0) {
        return { message: 'Track not found in liked' };
      }

      return { message: 'Track removed from liked' };
    } catch (error) {
      console.error(error);
    }
  }

  async getLiked(userId: number): Promise<Liked[]> {
    try {
      return await this.likedRepository.find({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async checkLiked(trackId: number, userId: number): Promise<boolean> {
    try {
      const count = await this.likedRepository.count({
        where: {
          trackId,
          userId,
        },
      });
      return count > 0;
    } catch (error) {
      console.error(error);
    }
  }

  async getLikedTracks(listOfLikedTrackId: number[]): Promise<Track[]> {
    try {
      const likedTracks: Track[] = [];
      for (const trackId of listOfLikedTrackId) {
        const track = await this.trackService.getTrackById(trackId);
        if (track) {
          likedTracks.push(track);
        }
      }

      return likedTracks;
    } catch (error) {
      console.log(error);
    }
  }
}
