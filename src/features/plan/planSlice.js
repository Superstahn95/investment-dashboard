import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import planService from "./planService";

const initialState = {
  plans: null,
  singlePlan: null,
  planIsLoading: false,
  planIsError: false,
  planIsSuccess: false,
  planErrorMessage: "",
  planSuccessMessage: "",
};
export const getPlans = createAsyncThunk(
  "plan/getPlans",
  async (_, thunkApi) => {
    try {
      return await planService.getPlans();
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
export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (data, thunkApi) => {
    try {
      return await planService.createPlan(data);
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
export const subscribeToPlan = createAsyncThunk(
  "plan/subscribeToPlan",
  async (data, thunkApi) => {
    try {
      return await planService.subscribeToPlan(data);
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
export const updatePlan = createAsyncThunk(
  "plan/updatePlan",
  async (data, thunkApi) => {
    try {
      return await planService.updatePlan(data);
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
export const getPlan = createAsyncThunk("plan/getPlan", async (_, thunkApi) => {
  try {
    return await planService.getPlan();
  } catch (error) {
    const message =
      (error.reponse && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkApi.rejectWithValue(message);
  }
});

export const deletePlan = createAsyncThunk(
  "plan/deleteplan",
  async (id, thunkApi) => {
    try {
      const response = await planService.deletePlan(id);

      const successMessage = response;
      return { id, successMessage };
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
export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    reset: (state) => {
      state.planIsLoading = false;
      state.planIsError = false;
      state.planIsSuccess = false;
      state.planErrorMessage = "";
      state.planSuccessMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlans.pending, (state) => {
        state.planIsLoading = true;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.planIsSuccess = true;
        state.plans = action.payload;
        state.planIsLoading = false;
      })
      .addCase(getPlans.rejected, (state, action) => {
        console.log(action);
        state.planIsLoading = false;
        state.planIsError = true;
        state.planErrorMessage = action.payload;
      })
      .addCase(createPlan.pending, (state) => {
        state.planIsLoading = true;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.planIsLoading = false;
        state.planIsSuccess = true;
        state.planSuccessMessage = action.payload;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.planIsLoading = false;
        state.planIsError = true;
        state.planErrorMessage = action.payload;
      })
      .addCase(subscribeToPlan.pending, (state) => {
        state.planIsLoading = true;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.planIsLoading = false;
        state.planSuccessMessage = action.payload;
        state.planIsSuccess = true;
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        console.log(action);
        state.planIsLoading = false;
        state.planIsError = true;
        state.planErrorMessage = action.payload;
      })
      .addCase(updatePlan.pending, (state, action) => {
        state.planIsLoading = true;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.planIsLoading = false;
        state.planIsSuccess = true;
        state.planSuccessMessage = action.payload;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.planIsLoading = false;
        state.planIsError = true;
        state.planErrorMessage = action.payload;
      })
      .addCase(getPlan.pending, (state) => {
        state.planIsLoading = true;
      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.planIsLoading = false;
        state.singlePlan = action.payload;
        state.planIsSuccess = true;
      })
      .addCase(getPlan.rejected, (state, action) => {
        state.planIsLoading = false;
        state.planIsError = true;
        state.planErrorMessage = action.payload;
      })
      .addCase(deletePlan.pending, (state) => {
        state.planIsLoading = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        console.log("accepted");
        console.log(action);
        state.planIsLoading = false;
        state.planSuccessMessage = action.payload.successMessage;
        state.planIsSuccess = true;
        console.log(state.plans);
        state.plans = state.plans.filter(
          (plan) => plan._id != action.payload.id
        );
      })
      .addCase(deletePlan.rejected, (state, action) => {
        console.log("rejected");
        console.log(action);
        state.planIsLoading = false;
        state.planIsError = true;
        state.planErrorMessage = action.payload;
      });
  },
});

export const { reset } = planSlice.actions;

export default planSlice.reducer;
