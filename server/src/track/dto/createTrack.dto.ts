export class CreateTrackDto {
    id: number;
    user_id: number;
    tags: string;
    moods: string;
    genres: string;
    movements: string;
    keywords: string;
    duration: number;
    trackName: string;
    downloadUrl: string;
    sourceUrl: string;
    coverImage: any;
}