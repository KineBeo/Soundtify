import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/createTrack.dto';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async createTrack(newTrackData: CreateTrackDto) {
    const newTrack = this.trackRepository.create(newTrackData);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async createManyTracks(newTracksData: CreateTrackDto[]) {
    const newTracks = this.trackRepository.create(newTracksData);
    await this.trackRepository.save(newTracks);
    return newTracks;
  }

  async getAllTracks() {
    return await this.trackRepository.find();
  }

  async getTrackById(id: number) {
    const res = await this.trackRepository.findOne({
      where: { id },
    });
    if (!res) {
      throw new BadRequestException('Track not found');
    } else {
      return res;
    }
  }

  async getTrackByName(track_name: string) {
    return await this.trackRepository.findOne({
      where: { track_name },
    });
  }

  async getTrackOfArtist(user_id: number) {
    return await this.trackRepository.find({
      where: { user_id },
      select: ['id', 'duration', 'track_name', 'src', 'cover_image', 'user_id'],
    });
  }

  // DELETE

  async deleteTrack(id: number) {
    const track = await this.trackRepository.findOne({
      where: { id },
    });

    if (track) {
      await this.trackRepository.delete(id);
      return track;
    }

    throw new BadRequestException('Track not found');
  }

  // UPDATE
  async update(id: number, updateData: CreateTrackDto) {
    const track = await this.trackRepository.findOne({
      where: { id },
    });

    if (track) {
      await this.trackRepository.update(id, updateData);
      return track;
    }

    throw new BadRequestException('Track not found');
  }
}
