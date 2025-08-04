import likeSlice from "./Slices/likeSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./Slices/dashboard.js";
import commentSlice from "./Slices/commentSlice.js";
import authSliceReducer from "./Slices/authSlice.js";
import playlistSlice from "./Slices/playlistSlice.js";

const store = configureStore({
	reducer: {
		like: likeSlice,
                comment: commentSlice,
		auth: authSliceReducer,
                playlist: playlistSlice,
                dashboard: dashboardSlice,
	},
});

export default store;
