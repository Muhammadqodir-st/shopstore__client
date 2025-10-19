// axios
import axios from "axios"

// react
import { useEffect, useState } from "react"

// redux
import { useSelector, useDispatch } from "react-redux";
import { remove } from '../store/feature/wishlistSlice'

// images
import e from '../assets/e.gif'

// react router dom 
import { Link } from "react-router-dom";

// lucide react
import { Trash } from "lucide-react";

// loader or message
import toast from "react-hot-toast";


export default function Wishlist() {

    window.scrollTo(0, 0)

    // user
    const { user } = useSelector((state) => state.user);
    const { wishlist } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();


    // states


    // delete wishlist
    const handleWishlistDelete = async (productId) => {
        try {
            const res = await axios.delete('http://localhost:8000/wishlists', {
                data: { productId },
                withCredentials: true
            });
            dispatch(remove(productId));
            toast.success('product removed from wishlist')
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className="max-w-[998px] w-[90%] mx-auto py-8">
            {wishlist?.length === 0 ? (
                <div className="flex flex-col gap-4 items-center justify-center py-6 max-[400px]:h-130">
                    <img className="w-40 h-40" src={e} alt="" loop autoPlay />
                    <p className="text-2xl font-bold text-[#F03E3E]">Add what you like.</p>
                    <p className="max-w-130 text-center text-sm text-gray-600">Go to the home page and click on the ♡ icon on the product</p>
                    <Link to={'/'} className="py-2 px-4 bg-[#212529] text-white rounded-lg font-semibold text-sm cursor-pointer">Return to home</Link>
                </div>
            ) : (
                <div className="w-full grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
                    {wishlist?.map((i) => (
                        <div key={i._id} className="border border-[#E5E7EB] p-3 flex flex-col items-start gap-2 rounded-lg overflow-hidden">
                            <div className="w-full relative">
                                <Link to={`/product/${i._id}`} className="w-full h-full ">
                                    <img className="w-full h-full object-cover" src={`http://localhost:8000/uploads/${i.mainImage}`} alt="" />
                                </Link>
                                <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
                                <button onClick={() => handleWishlistDelete(i._id)} className={`absolute top-0 right-0 cursor-pointer ${!user ? 'hidden' : ''}`}>
                                    <Trash className="text-red-500" size={20} />
                                </button>
                            </div>
                            <p className=" font-semibold truncation overflow-hidden max-[500px]:text-sm">{i.title}</p>
                            <div className="w-full flex items-end gap-3 border-b border-[#E5E7EB] py-2">
                                <p className="text-3xl text-red-600 font-bold max-[500px]:text-xl">${i.discountedPrice}</p>
                                <p className="font-semibold line-through max-[500px]:text-sm">${i.price}</p>
                            </div>
                            <p className="text-sm text-[#6B7280] max-[400px]:text-[11px]">This product is about to run out</p>
                            <div className="w-full py-1 bg-gradient-to-r from-[#FFD200] to-[#DC2626]"></div>
                            <p className="text-sm text-[#6B7280] max-[400px]:text-[11px]">available only: <span className="text-xl font-bold text-black">{i.stock}</span></p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}