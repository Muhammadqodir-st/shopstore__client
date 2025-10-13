import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: true
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.loading = false
        },
        logOut: (state) => {
            state.user = null
            state.loading = false
        },
        finishLoading: (state) => {
            state.loading = false
        }
    }
});

export const { setUser, logOut, finishLoading } = userSlice.actions
export default userSlice.reducer;