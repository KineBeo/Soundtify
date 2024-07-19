import Artist from "@/interfaces/artist";
import Track from "@/interfaces/track";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export enum RequestStatus {
  Loading,
  Error,
  Success,
  Initial,
}

export interface HomePageState {
  recentUsers: Artist[] | undefined;
  trendingArtists: Artist[] | undefined;
  popularArtists: Artist[] | undefined;
  topHits: Track[] | undefined;
  popularHits: Track[] | undefined;
  allArtists: Artist[] | undefined;
  allTracks: Track[] | undefined;
  status: RequestStatus;
}

const initialState: HomePageState = {
  recentUsers: [],
  trendingArtists: [],
  popularArtists: [],
  topHits: [],
  popularHits: [],
  allArtists: [],
  allTracks: [],
  status: RequestStatus.Initial,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setHomePageData: (state, action: PayloadAction<Partial<HomePageState>>) => {
      return { ...state, ...action.payload, status: RequestStatus.Success };
    },
    setLoading: (state) => {
      state.status = RequestStatus.Loading;
    },
    setError: (state) => {
      state.status = RequestStatus.Error;
    },
  },
});

export const { setHomePageData, setLoading, setError } = homePageSlice.actions;
export default homePageSlice.reducer;
