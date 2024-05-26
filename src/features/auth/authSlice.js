import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): undefined,
    accessToken: localStorage.getItem('accessToken')? JSON.parse(localStorage.getItem('accessToken')): undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.accessToken = action.payload.accessToken
        },
        userLoggedOut: (state) => {
            state.userInfo = undefined
            state.accessToken = undefined
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accessToken')
        }
    }
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;