import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: { order: null },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload
        }
    }
})

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;