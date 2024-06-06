import { Entity } from "typeorm";

@Entity()
export class CreateArtistDto {
    id: number;
    username: string;
    display_name: string;
    avatar: any;
    gender: string;
} 