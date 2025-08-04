import likeSlice from "./slices/like.slice.js";
import tweetSlice from "./slices/tweet.slice.js";
import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboard.slice.js";
import commentSlice from "./slices/comment.slice.js";
import authSliceReducer from "./slices/auth.slice.js";
import userSliceReducer from "./slices/user.slice.js";
import playlistSlice from "./slices/playlist.slice.js";
import videoSliceReducer from "./slices/video.slice.js";
import subscriptionSlice from "./slices/subscription.slice.js";

const store = configureStore({
	reducer: {
		like: likeSlice,
                tweet: tweetSlice,
                comment: commentSlice,
		user: userSliceReducer,
		auth: authSliceReducer,
                playlist: playlistSlice,
		video: videoSliceReducer,
                dashboard: dashboardSlice,
                subscription: subscriptionSlice,
	},
});

export default store;
