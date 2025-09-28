import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        logOut: (state) => {
            state.user = null
        }
    }
});

export const { setUser, logOut } = userSlice.actions
export default userSlice.reducer;