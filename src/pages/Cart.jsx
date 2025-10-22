// axios
import axios from "axios"


// react
import { useEffect, useState } from "react"


// react router dom
import { Link, useNavigate } from "react-router-dom";



// redux
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from '../store/feature/orderSlice'
import { clearCart } from '../store/feature/cartSlice'

// gif animation    const { order } = useSelector((state) => state.order);

import empty from '../assets/empty.gif'
import toast from "react-hot-toast";

// components
import Card from '../components/Card'
import CheckOut from '../pages/CheckOut'

export default function Cart() {

    window.scrollTo(0, 0)


    //  user
    const { cart } = useSelector((state) => state.cart);
    const { order } = useSelector((state) => state.order);


    // redux
    const dispatch = useDispatch();

    // naviagte
    const navigate = useNavigate();


    // states
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const subtotal = Number(cart?.reduce((acc, item) => acc + item?.product?.discountedPrice * item?.quantity, 0).toFixed(2)) || 0
    const token = localStorage.getItem('token')


    // orders
    const handleCheckOutSubmit = async (data) => {
        const orders = cart.map((i) => i);
        const id = cart.map((i) => i.product._id);
        setLoading(true)
        const formData = { ...data, orders, totalPrice: subtotal + 5, deliveryDays: 2 }
        const formDataR = { ...data, products: orders, totalPrice: subtotal + 5, deliveryDays: 2 }

        try {
            const { data } = await axios.post('https://shopstore-server.onrender.com/orders', formData, { headers: { Authorization: `Bearer ${token}` } })
            dispatch(setOrder([...order, formDataR]));
            if (data.success) {
                const { data } = await axios.delete('https://shopstore-server.onrender.com/carts', {
                    data: { productId: id },
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Order placed successfully!');
                setLoading(false);
                dispatch(clearCart());
                navigate('/profile');
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'error!');
            } else {
                toast.error("Server error!");
            }
            setLoading(false);
        }
    }

    return (
        <div className="max-w-[998px] w-[90%] mx-auto">
            {cart?.length === 0 ? (
                <div className="flex flex-col gap-4 items-center justify-center py-6 max-[400px]:h-140">
                    <img className="w-45 h-45" src={empty} alt="" loop autoPlay />
                    <p className="text-2xl font-bold text-[#F03E3E] max-[400px]:text-xl">Your cart is currently empty.</p>
                    <p className="max-w-130 text-center text-sm text-gray-600 max-[400px]:text-[12px]">Start from the main page - you can find the product you need by searching or browse our collections. Popular products</p>
                    <Link to={'/shop'} className="py-2 px-4 bg-[#212529] text-white rounded-lg font-semibold text-sm cursor-pointer">Return to shop</Link>
                </div>
            ) : (
                <div className="flex items-start justify-between gap-5 max-[900px]:flex-col">
                    <div className="w-[65%] flex flex-col gap-3 max-[900px]:w-full">
                        <p className="font-semibold">{step === 1 ? (`Products(${cart.length})`) : (`Billing details`)}</p>
                        <div className="flex flex-col gap-3">
                            {step === 1 ? (
                                cart.map((i) => (
                                    <Card key={i._id} item={i} />
                                ))
                            ) : (
                                <CheckOut onSubmit={(data) => handleCheckOutSubmit(data)} />
                            )}
                        </div>
                    </div>
                    <div className="w-[35%] h-fit sticky top-25 bg-[#fcfcfc] p-4   border border-[#E5E7EB] rounded-lg max-[900px]:w-full">
                        <p className="text-lg font-semibold">Your order</p>
                        <div className="w-full flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Product</p>
                            <p className="text-[#9CA3AF]">Subtotal</p>
                        </div>
                        <div className="flex flex-col">
                            {cart?.map((i) => (
                                <div className="w-full flex items-center justify-between py-3 border-b border-[#E5E7EB]" key={i?.product?._id}>
                                    <p className="max-w-45 text-sm">{i?.product?.title?.length > 40 ? i?.product?.title.slice(0, 40) + ' . . .' : i?.product?.title} <span className="font-bold px-1">x{i.quantity}</span></p>
                                    <p className="max-w-20 font-semibold truncate">${Number(i?.product?.discountedPrice * i.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="py-3 flex items-center justify-between border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Subtotal</p>
                            <p className="font-semibold">${subtotal}</p>
                        </div>
                        <div className="py-3 flex items-center justify-between border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Delivery</p>
                            <p className="font-semibold">$5</p>
                        </div>
                        <div className="py-3 flex items-center justify-between border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Total</p>
                            <p className="font-semibold">${subtotal + 5}</p>
                        </div>
                        <div className="w-full flex flex-col gap-3 py-3">
                            <label className="flex items-center gap-2">
                                <input name="a" type="radio" />
                                <p className="font-bold">Direct bank transfer</p>
                            </label>
                            <p className="text-sm text-[#4B5563]">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                        </div>
                        <button onClick={() => {
                            setTimeout(() => {
                                const btn = document.getElementById("order");
                                if (btn) {
                                    btn.click();
                                }
                            }, 10);
                            setStep((prev) => prev + 1)
                        }} className="w-full py-3 bg-[#634C9F] rounded-lg text-white font-semibold cursor-pointer flex items-center justify-center max-[900px]:fixed bottom-15 left-11 max-[900px]:w-[90%] max-[700px]:left-9 max-[550px]:left-7 max-[420px]:left-5 max-[380px]:left-4">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : "Place order"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}