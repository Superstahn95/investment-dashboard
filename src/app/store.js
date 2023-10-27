import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import depositReducer from "../features/deposits/depositSlice";
import planReducer from "../features/plan/planSlice";
import dashboardSummaryReducer from "../features/dashboardSummary/dashboardSummarySlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    deposit: depositReducer,
    plan: planReducer,
    dashboard: dashboardSummaryReducer,
    user: userReducer,
  },
});

export default store;
