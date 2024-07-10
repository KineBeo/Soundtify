import { createAsyncThunk } from "@reduxjs/toolkit";
import { useLikeTrackMutation } from "./audioPlayerApi";

export const Like = createAsyncThunk("audioPlayer/like", async () => {
  try {
    const response = useLikeTrackMutation();
    return response;
  } catch (error) {
    console.log(error);
  }
});
