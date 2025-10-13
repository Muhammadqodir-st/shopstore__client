// react router dom
import { useParams } from "react-router-dom"


// react
import { useEffect, useState } from "react";


// axios
import axios from "axios";


// assets
import s from '../assets/s.svg'
import ss from '../assets/ss.svg'


// lucide react
import { Plus, Minus, ShoppingBag } from "lucide-react";


// data
import { payment } from '../data/data'


export default function Product() {

    // params
    const { id } = useParams();


    // states
    const [product, setProduct] = useState(null);
    const [quentity, setQuentity] = useState(1)


    // get product /:id
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/products/${id}`, { withCredentials: true })
                setProduct(res.data.product);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    }, [id])


    return (
        <div className="max-w-[998px] w-[90%] mx-auto py-8">
            <div className="flex gap-3">

                {/* images */}
                <div className="w-[45%] flex flex-col  items-center justify-center gap-3">
                    <div className="relative border border-gray-300 rounded-xl overflow-hidden">
                        {product?.mainImage && (
                            <img className="w-125 h-110 object-cover" src={`http://localhost:8000/uploads/${product.mainImage}`} alt="" />
                        )}
                        <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-3 left-3">{product?.discountPercent}%</button>
                    </div>
                    <div className="w-full flex items-center justify-center gap-3">
                        {product?.images.map((i, key) => (
                            <div key={key} className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer ${product.mainImage === i ? `border border-gray-400` : ``}`}>
                                <img className="w-full h-full" src={`http://localhost:8000/uploads/${i}`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* title and other */}
                <div className="w-[55%] py-1 flex flex-col gap-5">
                    <div className="flex flex-col gap-2 border-b border-[#E5E7EB] py-2">
                        <p className="text-4xl font-bold">{product?.title}</p>
                        <div className="flex items-center gap-3">
                            <div className="flex">
                                <img className="w-4" src={s} alt="" />
                                <img className="w-4" src={s} alt="" />
                                <img className="w-4" src={s} alt="" />
                                <img className="w-4" src={ss} alt="" />
                                <img className="w-4" src={ss} alt="" />
                            </div>
                            <button className="px-1 border border-[#D1D5DB] rounded-lg text-[12px]">3.00</button>
                            <p className="text-sm text-[#6B7280]">SKU: <span className="text-black">E7F8G9H0</span></p>
                        </div>
                    </div>
                    <p className="text-[12px] text-[#4B5563]">Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper.</p>
                    <div className="flex items-end gap-3">
                        <p className="text-4xl font-bold text-[#DC2626]">${product?.discountedPrice}</p>
                        <p className="text-lg font-bold line-through">${product?.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-fit flex items-center justify-between gap-3 py-2 px-3 border border-[#D1D5DB] rounded-md">
                            <button onClick={() => setQuentity(prev => (prev > 1 ? prev - 1 : 1))} className="cursor-pointer"><Minus className="text-[#030712]" size={18} /></button>
                            <p>{quentity}</p>
                            <button onClick={() => setQuentity(prev => prev + 1)} className="cursor-pointer"><Plus className="text-[#030712]" size={18} /></button>
                        </div>
                        <button className="py-2 px-4 bg-[#16A34A] rounded-lg flex items-center justify-center gap-2 text-white font-bold cursor-pointer"><ShoppingBag size={20} />Add to cart</button>
                    </div>
                    <div className="border border-[#E5E7EB] rounded-lg flex flex-col">
                        {payment.map((i) => (
                            <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-3 py-2">
                                <img className="w-7 h-7" src={i.image} alt="" />
                                <div>
                                    <p className="text-sm text-[#6B7280]"><span className="font-semibold">{i.title}</span>{i.descripton}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}