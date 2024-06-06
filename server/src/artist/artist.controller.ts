import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { CreateArtistDto } from "./dto/createArtist.dto";

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }

    // CREATE
    @Post('create')
    async create(@Body() newArtistData: CreateArtistDto) {
        return this.artistService.createArtist(newArtistData);
    }

    @Post('create-many')
    async createManyArtists(@Body() newArtistsData: CreateArtistDto[]) {
        return this.artistService.createManyArtists(newArtistsData);
    }

    // GET
    @Get('all-artists')
    async getAllArtists() {
        return this.artistService.getAllArtists();
    }

    @Get(':id')
    async getArtistById(@Param('id') id: number) {
        return this.artistService.getArtistById(id);
    }

    @Get('random/:count')
    async getRandomArtistByCount(@Param('count') count: number) {
        return this.artistService.getRandomArtistByCount(count);
    }

    // DELETE
    @Delete(':id')
    async deleteArtistById(@Param('id') id: number) {
        return this.artistService.deleteArtist(id);
    }

}