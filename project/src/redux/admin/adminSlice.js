import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentAdmin: null,
    loading: false,
    error: false,
};

const adminSlice = createSlice({
    name: 'admin', 
    initialState,
    reducers: {
        adsignInStart: (state) => {
            state.loading = true;
            
        },
        adsignInSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = null;
        },
        adsignInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { adsignInStart, adsignInSuccess, adsignInFailure } = adminSlice.actions;

export default adminSlice.reducer;
