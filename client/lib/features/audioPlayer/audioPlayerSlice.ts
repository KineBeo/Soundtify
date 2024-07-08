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
            state.queue = action.payload.songs;
            state.currentIndex = action.payload.index;
            state.activeSong = action.payload.songs[action.payload.index];

            if (action.payload.playlist) {
                state.playingPlaylist = action.payload.playlist;
            } else {
                state.playingPlaylist = "";
            }
        },

        nextSong: (state, action) => {
            state.currentIndex = action.payload;
            state.activeSong = state.queue[action.payload];
        },

        onShuffle: (state, action) => {
            state.isShuffle = action.payload;
        },

        onRepeat: (state, action) => {
            state.isRepeat = action.payload;
        },

        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },

        addLike: (state, action) => {
            let like = [...state.liked];
            // handle in the future 
        },

        removeLike: (state, action) => {
            // handle in the future
        },

        reorderQueue: (state, action) => {
            state.queue = action.payload;
        },

        addToQueue: (state, action) => {
            state.queue.splice(state.currentIndex + 1, 0, action.payload);
            state.queue = [...state.queue];
        },

        removeFromQueue: (state, action) => {
            if (action.payload > -1) {
                state.queue.splice(action.payload, 1);
            }

            state.queue = [...state.queue];
        },

        toggleModal: (state, action) => {
            // not sure what is this 
        },

        setVolume: (state, action) => {
            state.volume = action.payload;
        },

        setSeekTime: (state, action) => {
            state.seekTime = action.payload;
        },

        setDuration: (state, action) => {
            state.duration = action.payload;
        }

    }
});

// rest of this place is call api from backend to get the data and need a token to access the data

export const {
    setActiveSong,
    nextSong,
    onShuffle,
    onRepeat,
    setCurrentTime,
    playPause,
    addLike,
    removeLike,
    reorderQueue,
    addToQueue,
    removeFromQueue,
    toggleModal,
    setVolume,
    setSeekTime,
    setDuration
} = audioPLayerSlice.actions;
export default audioPLayerSlice.reducer;