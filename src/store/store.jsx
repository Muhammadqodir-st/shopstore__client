import { configureStore } from "@reduxjs/toolkit";
import userReducer from './feature/userSlice'
import cartReducer from './feature/cartSlice'
import wishlistReducer from './feature/wishlistSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
});

export default store;