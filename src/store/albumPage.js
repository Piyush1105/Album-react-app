import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAlbumApi,
  deleteAlbumApi,
  getAlbumListApi,
  updateAlbumApi,
} from "../services/albumPage";

const initialState = {
  albumList: [],
  loading: false,
  error: null,
};

export const getAlbumList = createAsyncThunk(
  "getAlbumList",
  async (data, { rejectWithValue }) => {
    try {
      const callApi = await getAlbumListApi(data);
      return callApi;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteAlbum = createAsyncThunk(
  "deleteAlbum",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const callApi = await deleteAlbumApi(data);
      await dispatch(deleteAlbumState(data?.deleteId));
      return callApi;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const addAlbum = createAsyncThunk(
  "addAlbum",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const callApi = await addAlbumApi(data);
      await dispatch(dummyAddAlbum(callApi));
      return callApi;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateAlbum = createAsyncThunk(
  "updateAlbum",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const callApi = await updateAlbumApi(data);
      await dispatch(updateDummyAlbum(callApi));
      return callApi;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const albumPage = createSlice({
  name: "albumPage",
  initialState,
  reducers: {
    deleteAlbumState: (state, action) => {
      state.albumList = state.albumList.filter(
        (item) => item.id !== action.payload
      );
    },
    dummyAddAlbum: (state, action) => {
      state.albumList.unshift(action.payload);
    },

    updateDummyAlbum: (state, action) => {
      const objIndex = state.albumList.findIndex(
        (x) => x.id === action.payload.id
      );
      state.albumList[objIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlbumList.fulfilled, (state, action) => {
        state.loading = false;
        state.albumList = action.payload;
      })
      .addCase(getAlbumList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAlbum.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAlbum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteAlbumState, dummyAddAlbum, updateDummyAlbum } =
  albumPage.actions;
export default albumPage.reducer;
