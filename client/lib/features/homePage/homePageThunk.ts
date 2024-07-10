import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetAllTrackQuery } from "../track/trackApi";
import { useGetAllArtistQuery } from "../artist/artistApi";

export const fetchTracks = createAsyncThunk(
  "homePage/fetchTracks",
  async () => {
    const response = useGetAllTrackQuery();
    return response.data;
  }
);

export const fetchArtists = createAsyncThunk(
  "homePage/fetchArtists",
  async () => {
    const response = useGetAllArtistQuery();
    return response.data;
  }
);
