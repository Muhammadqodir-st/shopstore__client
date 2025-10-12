// axios
import axios from "axios"

// react
import { useEffect, useState } from "react"

// redux
import { useSelector } from "react-redux";

// images
import empty from '../assets/empty.svg'

// react router dom 
import { Link } from "lucide-react";


export default function Wishlist() {

    // user
    const { user } = useSelector((state) => state.user);


    // states
    const [wishlists, setWishlists] = useState([]);


    // get wishlist
    useEffect(() => {
        const getAllWishlists = async () => {
            if (!user) return;
            try {
                const res = await axios.get(`http://localhost:8000/wishlists/${user?.user?._id}`, { withCredentials: true })
                setWishlists(res.data.wishlist);
            } catch (error) {
                console.log(error);
            }
        }
        getAllWishlists();
    }, [user])


    return (
        <div className="max-w-[998px] w-[90%] mx-auto py-8">
            {wishlists.length === 0 ? (
                <div className="w-full h-full items-center justify-center">
                    <img className="w-120 h-120 mx-auto" src={empty} alt="" />
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-3">
                    {wishlists.map((i) => (
                        <div key={i._id} className="border border-[#E5E7EB] p-3 flex flex-col items-start gap-2 rounded-lg overflow-hidden">
                            <div className="w-full relative">
                                <img className="w-full h-full object-cover" src={`http://localhost:8000/uploads/${i.mainImage}`} alt="" />
                                <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
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