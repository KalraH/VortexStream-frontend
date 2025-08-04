import likeSlice from "./Slices/likeSlice.js";
import tweetSlice from "./Slices/tweetSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./Slices/dashboard.js";
import commentSlice from "./Slices/commentSlice.js";
import authSliceReducer from "./Slices/authSlice.js";
import userSliceReducer from "./Slices/userSlice.js";
import playlistSlice from "./Slices/playlistSlice.js";

const store = configureStore({
	reducer: {
		like: likeSlice,
                tweet: tweetSlice,
                comment: commentSlice,
		user: userSliceReducer,
		auth: authSliceReducer,
                playlist: playlistSlice,
                dashboard: dashboardSlice,
	},
});

export default store;
