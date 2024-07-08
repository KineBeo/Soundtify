import { Collection } from "@/interfaces/collection";
import Track from "@/interfaces/track";
import { createSlice } from "@reduxjs/toolkit/react";

export enum LikedStatus {
    Initial,
    Success,
    Error
}

export enum PlayListsStatus {
    Initial,
    Success,
    Error
}

export enum CreatePlaylistStatus {
    Waiting,
    Done,
    Initial,
    Error
}

export interface AudioPlayerState {
    queue: Track[];
    liked: number[];
    currentIndex: number;
    showBanner: boolean;
    isPlaying: boolean;
    activeSong?: Track | null;
    volume: number;
    duration: number;
    seekTime: number;
    currentTime: number;
    isShuffle: boolean;
    isRepeat: boolean;
    playlists: Collection[];
    createPlaylistStatus: CreatePlaylistStatus;
    isModalOpen: boolean;
    playingPlaylist: string;
    fetchLikedStatus: LikedStatus;
    playlistStatus: PlayListsStatus;
    passedDataToModal: object;
}

const initialState: AudioPlayerState = {
    queue: [],
    liked: [],
    currentIndex: 0,
    showBanner: false,
    isPlaying: false,
    activeSong: null,
    volume: 1,
    duration: 0,
    seekTime: 0,
    currentTime: 0,
    isShuffle: false,
    isRepeat: false,
    playlists: [],
    createPlaylistStatus: CreatePlaylistStatus.Initial,
    isModalOpen: false,
    playingPlaylist: "",
    fetchLikedStatus: LikedStatus.Initial,
    playlistStatus: PlayListsStatus.Initial,
    passedDataToModal: {},
}

const audioPLayerSlice = createSlice({
    name: "audioPlayer",
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            state.showBanner = true;


        }
    }
});

export default audioPLayerSlice.reducer;