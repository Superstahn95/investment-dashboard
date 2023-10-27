import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardSummaryService";

//things like withdrawal and the rest can go in later
const initialState = {
  totalDeposits: null,
  totalUsers: null,
  pendingDeposits: null,
  totalPlans: null,
  dashboardIsLoading: false,
  dashboardIsSuccess: false,
  dashboardIsError: false,
  dashboardErrorMessage: "",
};

export const getSummary = createAsyncThunk(
  "dashboardSummary/getSummary",
  async (_, thunkApi) => {
    try {
      return await dashboardService.getDashboardSummary();
    } catch (error) {
      console.log(error);
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

export const dashboardSlice = createSlice({
  name: "dashboardSummary",
  initialState,
  reducers: {
    reset: (state) => {
      state.dashboardIsLoading = false;
      state.dashboardIsError = false;
      state.dashboardErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSummary.pending, (state, action) => {
        state.dashboardIsLoading = true;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        console.log(action);
        state.dashboardIsLoading = false;
        state.dashboardIsSuccess = true;
        state.totalDeposits = action.payload.totalDeposits;
        state.totalUsers = action.payload.totalUsers;
        state.totalPlans = action.payload.totalPlans;
        state.pendingDeposits = action.payload.pendingDeposits;
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.dashboardIsLoading = false;
        state.dashboardIsError = true;
        state.dashboardErrorMessage = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;

export default dashboardSlice.reducer;
