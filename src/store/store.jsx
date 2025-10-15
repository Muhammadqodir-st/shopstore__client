import { configureStore } from "@reduxjs/toolkit";
import userReducer from './feature/userSlice'
import cartReducer from './feature/cartSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
});

export default store;