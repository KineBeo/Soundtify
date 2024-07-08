import Track from "./track";

export interface Collection {
    id?: number;
    title?: string;
    username?: string;
    totalTracks?: number;
    tracks?: Track[];

}