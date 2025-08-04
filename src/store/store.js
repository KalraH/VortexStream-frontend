import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./Slices/dashboard.js";
import commentSlice from "./Slices/commentSlice.js";
import authSliceReducer from "./Slices/authSlice.js";

const store = configureStore({
	reducer: {
		auth: authSliceReducer,
                comment: commentSlice,
                dashboard: dashboardSlice,
	},
});

export default store;
