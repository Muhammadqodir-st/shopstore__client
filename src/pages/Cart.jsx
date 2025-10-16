// axios
import axios from "axios"


// react
import { useEffect, useState } from "react"


// react router dom
import { Link } from "react-router-dom";


// lucide react
import { Minus, Plus, Trash } from "lucide-react";


// redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../store/feature/userSlice'
import { remove } from '../store/feature/cartSlice'


// gif animation
import empty from '../assets/empty.gif'
import toast from "react-hot-toast";


export default function Cart() {

    window.scrollTo(0, 0)


    //  user
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();


    // states
    const [quantity, setQuantity] = useState(1);
    const subtotal = cart.reduce((acc, item) => acc + item?.product?.discountedPrice * item?.quantity, 0);



    // delete cart
    const handleCartDelete = async (productId) => {
        try {
            const { data } = await axios.delete('http://localhost:8000/carts', {
                data: { productId: productId },
                withCredentials: true
            });
            toast.success(data.message)
            dispatch(remove(productId));
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className="max-w-[998px] w-[90%] mx-auto">
            {cart?.length === 0 ? (
                <div className="flex flex-col gap-4 items-center py-6">
                    <img className="w-45 h-45" src={empty} alt="" loop autoPlay />
                    <p className="text-2xl font-bold text-[#F03E3E]">Your cart is currently empty.</p>
                    <p className="max-w-130 text-center text-sm text-gray-600">Start from the main page - you can find the product you need by searching or browse our collections. Popular products</p>
                    <Link to={'/shop'} className="py-2 px-4 bg-[#212529] text-white rounded-lg font-semibold text-sm cursor-pointer">Return to shop</Link>
                </div>
            ) : (
                <div className="flex items-start justify-between gap-5">
                    <div className="w-[65%] flex flex-col gap-3">
                        <p className="font-semibold">Products ({cart.length})</p>

                        <div className="flex flex-col gap-3">
                            {cart.map((i) => (
                                <div className="py-3 px-3 bg-[#fcfcfc] rounded-lg flex items-center justify-between gap-3 border border-[#E5E7EB]" key={i?.product?._id}>
                                    <div className="flex items-center gap-5 ">
                                        <img className="w-15 h-15 object-cover border border-[#E5E7EB] rounded-lg" src={`http://localhost:8000/uploads/${i?.product?.mainImage}`} alt="" />
                                        <p className="max-w-50 font-semibold text-gray-600">{i?.product?.title}</p>
                                        <div className="w-fit flex items-center justify-between gap-3 py-2 px-3 border border-[#D1D5DB] rounded-md">
                                            <button onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 1)} className="cursor-pointer"><Minus className="text-[#030712]" size={18} /></button>
                                            <p>{i?.quantity}</p>
                                            <button onClick={() => setQuantity(prev => prev < i.product?.stock ? prev + 1 : i?.product?.stock)} className="cursor-pointer"><Plus className="text-[#030712]" size={18} /></button>
                                        </div>
                                    </div>
                                    <div onClick={() => handleCartDelete(i?.product?._id)} className="cursor-pointer text-red-500 hover:text-red-400">
                                        <Trash />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-[35%] bg-[#fcfcfc] p-4   border border-[#E5E7EB] rounded-lg">
                        <p className="text-lg font-semibold">Your order</p>
                        <div className="w-full flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Product</p>
                            <p className="text-[#9CA3AF]">Subtotal</p>
                        </div>
                        <div className="flex flex-col">
                            {cart.map((i) => (
                                <div className="w-full flex items-center justify-between py-3 border-b border-[#E5E7EB]" key={i?.product?._id}>
                                    <p className="max-w-45 text-sm">{i?.product?.title} <span className="font-bold px-1">x{i.quantity}</span></p>
                                    <p className="max-w-20 font-semibold truncate">${i?.product?.discountedPrice * i.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className="py-3 flex items-center justify-between border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Subtotal</p>
                            <p className="font-semibold">${subtotal}</p>
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
                        <button className="w-full py-3 bg-[#634C9F] rounded-lg text-white font-semibold cursor-pointer">Place order</button>
                    </div>
                </div>
            )}
        </div>
    )
}