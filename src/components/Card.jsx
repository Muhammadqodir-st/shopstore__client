// licide react
import { Trash, Minus, Plus } from 'lucide-react'

// react
import { useEffect, useState } from 'react';

// loader and message
import toast from "react-hot-toast";

// redux
import { useDispatch, useSelector } from "react-redux";
import { remove, update } from '../store/feature/cartSlice'

// axios
import axios from "axios"


export default function Card({ item }) {

    // state
    const [quantity, setQuantity] = useState(item?.quantity);
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const token = localStorage.getItem('token')




    useEffect(() => {
        if (!item?.product?._id || quantity <= 0) return;
        const updateQuantity = async () => {
            try {
                const { data } = await axios.put('https://shopstore-server.onrender.com/carts', {
                    productId: item?.product?._id,
                    quantity: quantity
                }, { headers: { Authorization: `Bearer ${token}` } });

                dispatch(update(data.user.cart));
            } catch (error) {
                console.log(error);
            }
        }
        updateQuantity();
    }, [quantity]);



    // delete card
    const handleCartDelete = async (productId) => {
        try {
            const { data } = await axios.delete('https://shopstore-server.onrender.com/carts', {
                data: { productId: productId },
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(data.message)
            dispatch(remove(productId));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="py-3 px-3 bg-[#fcfcfc] rounded-lg flex items-center justify-between gap-3 border border-[#E5E7EB] max-[450px]:flex-col" key={item?.product?._id}>
            <div className="flex items-center gap-5 max-[450px]:w-full">
                <div className='flex items-center gap-5'>
                    <img className="w-15 h-15 object-cover border border-[#E5E7EB] rounded-lg" src={item?.product?.mainImage} alt="" />
                    <p className="max-w-50 font-semibold text-gray-600 max-[470px]:">{item?.product?.title?.length > 40 ? item?.product?.title.slice(0, 40) + ' . . .' : item?.product?.title}</p>
                </div>
                <div className="w-fit flex items-center justify-between gap-3 py-2 px-3 border border-[#D1D5DB] rounded-md max-[450px]:hidden">
                    <button onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 1)} className="cursor-pointer"><Minus className="text-[#030712]" size={18} /></button>
                    <p>{item?.quantity}</p>
                    <button onClick={() => setQuantity(prev => prev < item.product?.stock ? prev + 1 : item?.product?.stock)} className="cursor-pointer"><Plus className="text-[#030712]" size={18} /></button>
                </div>
            </div>
            <div className='max-[450px]:w-full max-[450px]:flex max-[450px]:items-center max-[450px]:justify-between'>
                <div className="w-fit flex items-center justify-between gap-3 py-2 px-3 border border-[#D1D5DB] rounded-md min-[450px]:hidden">
                    <button onClick={() => setQuantity(prev => prev > 0 ? prev - 1 : 1)} className="cursor-pointer"><Minus className="text-[#030712]" size={18} /></button>
                    <p>{item?.quantity}</p>
                    <button onClick={() => setQuantity(prev => prev < item.product?.stock ? prev + 1 : item?.product?.stock)} className="cursor-pointer"><Plus className="text-[#030712]" size={18} /></button>
                </div>
                <div onClick={() => handleCartDelete(item?.product?._id)} className="cursor-pointer text-red-500 hover:text-red-400">
                    <Trash />
                </div>
            </div>
        </div>
    )
}