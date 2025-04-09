import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './authSlice.js'
import userSliceReducer from "./userSlice.js";
import videoSliceReducer from "./videoSlice.js";
import subscriptionSlice from "./subscriptionSlice.js";
import likeSlice from "./likeSlice.js";
import tweetSlice from "./tweetSlice.js";
import commentSlice from "./commentSlice.js";
import dashboardSlice from "./dashboardSlice.js";
import playlistSlice from "./playlistSlice.js";


const store= configureStore({
    reducer: {
        auth:authSliceReducer,
        user: userSliceReducer,
        video: videoSliceReducer,
        subscription: subscriptionSlice,
        like: likeSlice,
        tweet: tweetSlice,
        comment: commentSlice,
        dashboard: dashboardSlice,
        playlist: playlistSlice,
    }
})

export default store;