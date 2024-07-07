interface CoverImage {
    url: string;
    color: string;
}

export default interface Track {
    id: number;
    user_id?: number;
    tags?: string;
    moods?: string;
    genres?: string;
    movements?: string;
    keywords?: string;
    duration?: number;
    track_name?: string;
    download_url?: string;
    src?: string;
    cover_image?: CoverImage;
    // collections?: Collection[];
}