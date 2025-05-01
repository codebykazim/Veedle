import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  dislikedVideos: [],
};

export const toggleVideoDislike = createAsyncThunk(
  "dislike/toggleVideoDislike",
  async (videoId) => {
    try {
      const response = await axiosInstance.post(
        `/dislikes/toggle/v/${videoId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error toggling video dislike"
      );
      throw error;
    }
  }
);

export const toggleTweetDislike = createAsyncThunk(
  "dislike/toggleTweetDislike",
  async (tweetId) => {
    try {
      const response = await axiosInstance.post(
        `/dislikes/toggle/t/${tweetId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error toggling tweet dislike"
      );
      throw error;
    }
  }
);

export const toggleCommentDislike = createAsyncThunk(
  "dislike/toggleCommentDislike",
  async (commentId) => {
    try {
      const response = await axiosInstance.post(
        `/dislikes/toggle/c/${commentId}`
      );
      return response.data.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Error toggling comment dislike"
      );
      throw error;
    }
  }
);

const dislikeSlice = createSlice({
  name: "dislike",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleVideoDislike.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleVideoDislike.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(toggleVideoDislike.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dislikeSlice.reducer;
