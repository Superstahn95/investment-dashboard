import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: null,
  singleUser: null,
  userIsLoading: false,
  userError: false,
  userSuccess: false,
  userSuccessMessage: "",
  userErrorMessage: "",
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkApi) => {
    try {
      return await userService.getUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, thunkApi) => {
    try {
      return userService.getUser(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.userIsLoading = false;
      state.userError = false;
      state.userErrorMessage = "";
      state.userSuccess = false;
      state.userSuccessMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log(action);
        state.users = action.payload;
        state.userIsLoading = false;
        state.userSuccess = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log(action);
        state.userError = true;
        state.userErrorMessage = action.payload;
        state.userIsLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action);
        state.userIsLoading = false;
        state.singleUser = action.payload;
        state.userSuccess = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action);
        state.userIsLoading = false;
        state.userError = true;
        state.userErrorMessage = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
