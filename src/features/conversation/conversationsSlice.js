import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlineUsers: []
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        }
    }
});

export const {setOnlineUsers} = conversationSlice.actions;
export default conversationSlice.reducer;