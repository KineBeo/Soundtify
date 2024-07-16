import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/createArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  // CREATE
  async createArtist(newArtistData: CreateArtistDto) {
    const newArtist = this.artistRepository.create(newArtistData);
    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async createManyArtists(newArtistsData: CreateArtistDto[]) {
    const newArtists = this.artistRepository.create(newArtistsData);
    await this.artistRepository.save(newArtists);
    return newArtists;
  }

  // GET
  async getAllArtists() {
    console.log('Getting all artists');
    return await this.artistRepository.find();
  }

  async getArtistById(id: number) {
    return await this.artistRepository.findOne({
      where: { id },
    });
  }

  // GET
  async getRandomArtistByCount(count: number) {
    if (count > 30) {
      throw new BadRequestException(
        'You can only request a maximum of 30 random artists at a time.',
      );
    }

    if (count < 0) {
      throw new BadRequestException(
        'Please provide a positive number of artists to retrieve.',
      );
    }

    const maxCount = Math.min(count, 30); // Limit the count to a maximum of 30
    return await this.artistRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .limit(maxCount)
      .getMany();
  }

  // DELETE
  async deleteArtist(id: number) {
    if (id < 0) {
      throw new BadRequestException('Please provide a positive ID.');
    }
    return await this.artistRepository.delete(id);
  }
}
