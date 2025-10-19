import { createSlice } from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { wishlist: null },
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload
        },
        remove: (state, action) => {
            state.wishlist = state.wishlist.filter((i) => i._id !== action.payload)
        }
    }
})

export const { setWishlist, remove } = wishlistSlice.actions;
export default wishlistSlice.reducer;