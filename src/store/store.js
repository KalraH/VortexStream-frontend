import likeSlice from "./slices/like.slice";
import tweetSlice from "./slices/tweet.slice";
import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./slices/comment.slice";
import authSliceReducer from "./slices/auth.slice";
import userSliceReducer from "./slices/user.slice";
import playlistSlice from "./slices/playlist.slice";
import videoSliceReducer from "./slices/video.slice";
import dashboardSlice from "./slices/dashboard.slice";
import subscriptionSlice from "./slices/subscription.slice";

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
