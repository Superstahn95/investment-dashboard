import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import depositService from "./depositService";

const initialState = {
  allDeposits: null,
  depositSuccessMessage: null,
  depositIsLoading: false,
  depositIsError: false,
  depositIsSuccess: false,
  depositErrorMessage: "",
};

//user
export const makeDeposit = createAsyncThunk(
  "deposit/makeDeposit",
  async (data, thunkApi) => {
    try {
      return await depositService.makeDeposit(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

//admin
export const getDepositHistory = createAsyncThunk(
  "deposit/getDepositHistory",
  async (_, thunkApi) => {
    try {
      return await depositService.getAllDeposits();
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

//user deposit history
export const getIndividualDepositHistory = createAsyncThunk(
  "deposit/getIndividualDepositHistory",
  async (_, thunkApi) => {
    try {
      return await depositService.getIndividualDepositHistory();
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

//delete deposit
export const deleteDeposit = createAsyncThunk(
  "deposit/deleteDeposit",
  async (id, thunkApi) => {
    try {
      return await depositService.deleteDeposit(id);
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
//decline deposit
export const declineDeposit = createAsyncThunk(
  "deposit/declineDeposit",
  async (id, thunkApi) => {
    try {
      const response = await depositService.declineDeposit(id);
      return { id, successsMessage: response };
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
export const approveDeposit = createAsyncThunk(
  "deposit/approveDeposit",
  async (data, thunkApi) => {
    try {
      const response = await depositService.approveDeposit(data);
      return { id: data.id, successsMessage: response };
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    reset: (state) => {
      state.depositErrorMessage = "";
      state.depositIsLoading = false;
      state.depositIsSuccess = false;
      state.depositSuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeDeposit.pending, (state) => {
        state.depositIsLoading = true;
      })
      .addCase(makeDeposit.fulfilled, (state, action) => {
        console.log(action);
        state.depositIsLoading = false;
        state.depositSuccessMessage = action.payload;
        state.depositIsSuccess = true;
      })
      .addCase(makeDeposit.rejected, (state, action) => {
        console.log(action);
        state.depositIsError = true;
        state.depositErrorMessage = action.payload;
        state.depositIsLoading = false;
        state.depositIsSuccess = false;
        state.depositSuccessMessage = null;
      })
      .addCase(getDepositHistory.pending, (state) => {
        state.depositIsLoading = true;
      })
      .addCase(getDepositHistory.fulfilled, (state, action) => {
        state.depositIsLoading = false;
        state.allDeposits = action.payload;
      })
      .addCase(getDepositHistory.rejected, (state, action) => {
        state.depositIsError = true;
        state.depositErrorMessage = action.payload;
        state.depositIsLoading = true;
      })
      .addCase(getIndividualDepositHistory.pending, (state) => {
        state.depositIsLoading = true;
      })
      .addCase(getIndividualDepositHistory.fulfilled, (state, action) => {
        state.depositIsLoading = false;
        state.allDeposits = action.payload;
        state.depositIsSuccess = true;
      })
      .addCase(getIndividualDepositHistory.rejected, (state, action) => {
        console.log(
          "getting individual deposit data action has beem fulfilled"
        );
        state.depositIsLoading = false;
        state.depositIsError = true;
        state.depositErrorMessage = action.payload;
      })
      .addCase(deleteDeposit.pending, (state, action) => {
        state.depositIsLoading = true;
      })
      .addCase(deleteDeposit.fulfilled, (state, action) => {
        state.depositIsLoading = false;
        state.depositIsSuccess = true;
        state.depositSuccessMessage = action.payload;
      })
      .addCase(deleteDeposit.rejected, (state, action) => {
        state.depositIsLoading = false;
        state.depositIsError = true;
        state.depositErrorMessage = action.payload;
      })
      .addCase(declineDeposit.fulfilled, (state, action) => {
        console.log("this action wass fulfilled");
        console.log(action);
        //if declining a deposit is fulfilled, this reducer should filter and remove that deposit from our state
        state.allDeposits = state.allDeposits.filter(
          (deposit) => deposit._id != action.payload.id
        );
        state.depositIsSuccess = true;
        state.depositSuccessMessage = action.payload.successsMessage;
      })
      .addCase(declineDeposit.rejected, (state, action) => {
        console.log("this action was rejected");
        console.log(action);
        state.depositIsError = true;
        state.depositErrorMessage = action.payload;
      })
      .addCase(approveDeposit.fulfilled, (state, action) => {
        //loop through all deposits and change the approved state of that deposit here
        state.allDeposits = state.allDeposits.map((deposit) =>
          deposit._id == action.payload.id
            ? { ...deposit, approved: true }
            : deposit
        );
        state.depositIsSuccess = true;
        state.depositSuccessMessage = action.payload.successsMessage;
      })
      .addCase(approveDeposit.rejected, (state, action) => {
        state.depositIsError = true;
        state.depositErrorMessage = action.payload;
      });
  },
});

export const { reset } = depositSlice.actions;

export default depositSlice.reducer;
