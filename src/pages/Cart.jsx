// axios
import axios from "axios"


// react
import { useEffect, useState } from "react"


// react router dom
import { Link } from "react-router-dom";


// lucide react
import { Minus, Plus, Trash } from "lucide-react";




export default function Cart() {

    // states
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const subtotal = carts.reduce((acc, item) => acc + item.product.discountedPrice * item.quantity, 0)



    // get carts
    useEffect(() => {
        const getCarts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/carts', { withCredentials: true })
                setCarts(res.data.carts)
            } catch (error) {
                console.log(error);
            }
        }
        getCarts();
    }, []);


    return (
        <div className="max-w-[998px] w-[90%] mx-auto">
            {carts?.length === 0 ? (
                <div>
                    <p>salom</p>
                </div>
            ) : (
                <div className="flex items-start justify-between gap-5">
                    <div className="w-[65%] flex flex-col gap-3">
                        <p className="font-semibold">Products ({carts.length})</p>

                        <div className="flex flex-col gap-3">
                            {carts.map((i) => (
                                <div className="py-3 px-3 bg-[#fcfcfc] rounded-lg flex items-center justify-between gap-3" key={i.product._id}>
                                    <div className="flex items-center gap-5 ">
                                        <img className="w-15 h-15 object-cover border border-[#E5E7EB] rounded-lg" src={`http://localhost:8000/uploads/${i.product.mainImage}`} alt="" />
                                        <p className="max-w-50 font-semibold text-gray-600">{i?.product?.title}</p>
                                        <div className="w-fit flex items-center justify-between gap-3 py-2 px-3 border border-[#D1D5DB] rounded-md">
                                            <button onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 1)} className="cursor-pointer"><Minus className="text-[#030712]" size={18} /></button>
                                            <p>{i.quantity}</p>
                                            <button onClick={() => setQuantity(prev => prev < i.product?.stock ? prev + 1 : i.product?.stock)} className="cursor-pointer"><Plus className="text-[#030712]" size={18} /></button>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer text-red-500 hover:text-red-400">
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
                            {carts.map((i) => (
                                <div className="w-full flex items-center justify-between py-3 border-b border-[#E5E7EB]" key={i.product._id}>
                                    <p className="max-w-40 text-sm">{i.product.title} <span className="font-bold px-1">x{i.quantity}</span></p>
                                    <p className="max-w-20 font-semibold truncate">${i.product.discountedPrice * i.quantity}</p>
                                </div>
                            ))}
                        </div>
                        <div className="py-3 flex items-center justify-between border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Subtotal</p>
                            <p className="font-semibold">${subtotal}</p>
                        </div>
                        <div className="py-3 flex items-center justify-between border-b border-[#E5E7EB]">
                            <p className="text-[#9CA3AF]">Total</p>
                            <p className="font-semibold">${subtotal}</p>
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