import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/createTrack.dto";

@Controller('tracks')
export class TrackController {
    constructor(private readonly trackService: TrackService) { }

    // CREATE
    @Post('create')
    async create(@Body() newTrackData: CreateTrackDto) {
        return this.trackService.createTrack(newTrackData);
    }

    @Post('create-many')
    async createManyWithJson(@Body() newTracksData: CreateTrackDto[]) {
        return this.trackService.createManyTracks(newTracksData);
    }

    // GET
    @Get('all-tracks') 
    async getAllTracks() {
        return this.trackService.getAllTracks();
    }

    @Get('/:id')
    async getTrackById(@Param('id') id: number) {
        return this.trackService.getTrackById(id);
    }

    @Get('/name/:track_name')
    async getTrackByName(@Param('track_name') track_name: string) {
        return this.trackService.getTrackByName(track_name);
    }

    // DELETE 
    @Delete('/:id')
    async deleteTrack(@Param('id') id: number) {
        return this.trackService.deleteTrack(id);
    }
}