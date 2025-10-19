import { configureStore } from "@reduxjs/toolkit";

// slices
import userReducer from './feature/userSlice'
import cartReducer from './feature/cartSlice'
import wishlistReducer from './feature/wishlistSlice'
import orderReducer from './feature/orderSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer
    }
});

export default store;