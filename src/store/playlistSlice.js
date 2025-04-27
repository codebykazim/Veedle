import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  playlist: null,
  playlists: [],
};

export const createAPlaylist = createAsyncThunk(
  "createPlaylist",
  async ({ name, description }) => {
    try {
      const response = await axiosInstance.post("/playlist", {
        name,
        description,
      });
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk(
  "addVideoToPlaylist",
  async ({ playlistId, videoId }) => {
    try {
      const response = await axiosInstance.patch(
        `/playlist/add/${videoId}/${playlistId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const removeVideoFromPlaylist = createAsyncThunk(
  "removeVideoFromPlaylist",
  async ({ videoId, playlistId }) => {
    try {
      const response = await axiosInstance.patch(
        `/playlist/remove/${videoId}/${playlistId}`
      );
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async (playlistId) => {
    try {
      const response = await axiosInstance.get(`/playlist/${playlistId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getPlaylistsByUser = createAsyncThunk(
  "getPlaylistsByUser",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`/playlist/user/${userId}`);
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updatePlaylist = createAsyncThunk(
  "updatePlaylist",
  async ({ playlistId, name, description }) => {
    try {
      const response = await axiosInstance.patch(`/playlist/${playlistId}`, {
        name,
        description,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async (playlistId) => {
    try {
      const response = await axiosInstance.delete(`/playlist/${playlistId}`);
      if (response.data?.success) {
        toast.success(response.data.message);
      }
      return playlistId;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createAPlaylist
      .addCase(createAPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createAPlaylist.rejected, (state) => {
        state.loading = false;
      })

      // addVideoToPlaylist
      .addCase(addVideoToPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
        const index = state.playlists.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.playlists[index] = action.payload;
        }
      })
      .addCase(addVideoToPlaylist.rejected, (state) => {
        state.loading = false;
      })

      // removeVideoFromPlaylist
      .addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
        const index = state.playlists.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.playlists[index] = action.payload;
        }
      })
      .addCase(removeVideoFromPlaylist.rejected, (state) => {
        state.loading = false;
      })

      // getPlaylistById
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state) => {
        state.loading = false;
      })

      // getPlaylistsByUser
      .addCase(getPlaylistsByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlaylistsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(getPlaylistsByUser.rejected, (state) => {
        state.loading = false;
      })

      // upadtePlaylist
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
        state.playlists = state.playlists.map((pl) =>
          pl._id === action.payload._id ? action.payload : pl
        );
      })
      .addCase(updatePlaylist.rejected, (state) => {
        state.loading = false;
      })

      // deletePlaylist
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        );
        if (state.playlist && state.playlist._id === action.payload) {
          state.playlist = null;
        }
      })
      .addCase(deletePlaylist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default playlistSlice.reducer;
