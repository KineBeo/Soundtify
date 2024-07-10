import Artist from "@/interfaces/artist";
import Track from "@/interfaces/track";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchArtists, fetchTracks } from "./homePageThunk";
export enum RequestStatus {
  Loading,
  Error,
  Success,
  Initial,
}

export interface HomePageState {
  recentUsers: Artist[] | undefined;
  trendingArtists: Artist[] | undefined;
  topHits: Track[] | undefined;
  popularHits: Track[] | undefined;
  status: RequestStatus;
}

const initialState: HomePageState = {
  recentUsers: [],
  trendingArtists: [],
  topHits: [],
  popularHits: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.topHits = action.payload?.slice(0, 6);
        state.popularHits = action.payload?.slice(7, 10);
        state.status = RequestStatus.Success;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.status = RequestStatus.Error;
      })
      .addCase(fetchArtists.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.recentUsers = action.payload?.slice(0, 6);
        state.trendingArtists = action.payload?.slice(7, 10);
        state.status = RequestStatus.Success;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.status = RequestStatus.Error;
      });
  },
});

export const { setHomePageData, setLoading, setError } = homePageSlice.actions;
export default homePageSlice.reducer;
