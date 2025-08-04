import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
        loading: false,
        profileData: null,
        history: [],
};

export const userChannelProfile = createAsyncThunk(
        "getUserChannelProfile",
        async (userName) => {
                try {
                        const response = await axiosInstance.get(
                                `/users/userChannelProfile/${userName}`
                        );
                        return response.data.data;
                } catch (error) {
                        toast.error(error?.response?.data?.error);
                        throw error;
                }
        }
);

export const getWatchHistory = createAsyncThunk("getWatchHistory", async () => {
        try {
                const response = await axiosInstance.get(
                        "/users/watch-history"
                );
                return response.data.data;
        } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.error);
                throw error;
        }
});

const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
                builder.addCase(userChannelProfile.pending, (state) => {
                        state.loading = true;
                });
                builder.addCase(
                        userChannelProfile.fulfilled,
                        (state, action) => {
                                state.loading = false;
                                state.profileData = action.payload;
                        }
                );
                builder.addCase(getWatchHistory.pending, (state) => {
                        state.loading = true;
                });
                builder.addCase(getWatchHistory.fulfilled, (state, action) => {
                        state.loading = false;
                        state.history = action.payload;
                });
        },
});

export default userSlice.reducer;
