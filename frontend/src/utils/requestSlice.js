import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: {
        received: null,
        sent: null,
    },
    reducers: {
        addReceivedRequests: (state, action) => {
            state.received = action.payload;
        },
        addSentRequests: (state, action) => {
            state.sent = action.payload;
        },
    }
})

export const { addReceivedRequests, addSentRequests } = requestSlice.actions;
export default requestSlice.reducer;