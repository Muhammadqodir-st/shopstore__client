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
    const token = localStorage.getItem('token');

    // dispatch
    const dispatch = useDispatch();

    // get user data
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get('https://shopstore-server.onrender.com/register/me', { headers: { Authorization: `Bearer ${token}` } })
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
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-blue-600 font-semibold text-lg">Loading...</p>
                </div>
            </div>
        )
    }

    return null;
}