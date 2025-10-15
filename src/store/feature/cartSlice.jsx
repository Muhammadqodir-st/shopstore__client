import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: null },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        }, 
        remove:(state, action) => {
            state.cart = state.cart.filter((i) => i.prodcut_id !== action.payload)
        }
    }

})

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer; 