// axios
import axios from 'axios'

// useEffect
import { useEffect, useState } from 'react'


// react redux
import { useDispatch } from 'react-redux'
import { setUser, logOut } from '../store/feature/userSlice'
import { setCart } from '../store/feature/cartSlice'
import { setWishlist } from '../store/feature/wishlistSlice'
import { setOrder } from '../store/feature/orderSlice'


export default function StoreUser() {
    const [loading, setLoading] = useState(false);

    // dispatch
    const dispatch = useDispatch();

    // get user data
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('http://localhost:8000/register/me', { withCredentials: true })
                dispatch(setUser({ user: data }));
                dispatch(setCart(data.user.cart));
                dispatch(setWishlist(data.user.wishlist));
                dispatch(setOrder(data.user.order));
            } catch (error) {
                dispatch(logOut())
            } finally { setLoading(false) };
        };
        getUser();
    }, [dispatch]);

    // loading 
    if (loading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
                <p className="text-black">Loading your account...</p>
            </div>
        )
    }

    return null;
}