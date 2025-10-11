// swiper
import { Swiper, SwiperSlide } from "swiper/react"

// import swiper styles
import 'swiper/css'
import { Pagination } from "swiper/modules"
import 'swiper/css/pagination'

// img
import img1 from '../assets/swiperimg.png'
import img2 from '../assets/swiperimg2.png'
import b from '../assets/b.png'


// react router dom
import { Link } from "react-router-dom"


// react
import { useEffect, useState } from "react"


// axios
import axios from "axios"


// lucide react 
import { ArrowRight } from 'lucide-react'


// cart data
import { cart } from '../data/data'

export default function Home() {

    // states
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);


    // get all category
    useEffect(() => {
        const getAllCAtegory = async () => {
            try {
                const res = await axios.get('http://localhost:8000/categories');
                setCategory(res.data.categories);
            } catch (error) {
                console.log(error);
            }
        }
        getAllCAtegory()
    }, []);


    // get products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/products')
                setProducts(res.data.products);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts()
    }, []);


    // swiper data 
    const swiper = [
        {
            image: img1,
            title: 'Shopping with us for better quality and the best price',
            desc: 'We have prepared special discounts for you on grocery products. Don\'t miss these opportunities...',
            price: '26.67',
            salePrice: '21.67'
        },
        {
            image: img2,
            title: 'Get the best quality products at the lowest prices',
            desc: 'We have prepared special discounts for you on organic breakfast products.',
            price: '59.99',
            salePrice: '21.67'
        }
    ]


    return (
        <div className="max-w-[998px] w-[90%] mx-auto">

            {/* ============== hero swiper =============== */}
            <Swiper className="w-full h-auto rounded-lg"
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
            >
                {/* swiper slide */}
                {swiper.map((i) => (
                    <SwiperSlide key={i.id} className="w-full h-full relative flex items-center justify-center">
                        <img className="w-full h-120 object-cover rounded-lg max-[900px]:h-100 max-[600px]:h-80" src={i.image} alt="" />
                        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-start px-8">
                            <div className="flex flex-col gap-4">
                                <div className="w-fit px-4 py-1 rounded-lg bg-gradient-to-r from-green-500 to-transparent text-green-800 font-semibold text-sm max-[450px]:px-3 max-[450px]:">
                                    Weekend Discount
                                </div>
                                <p className="max-w-120 text-5xl font-semibold text-[#39245F] max-[750px]:text-3xl max-[450px]:text-2xl">{i.title}</p>
                                <p className="max-w-100 text-sm text-[#030712] max-[750px]:text-[12px] max-[600px]:hidden">{i.desc}</p>
                                <div className="flex items-center gap-4">
                                    <Link className="py-3 px-7 bg-[#634C9F] rounded-lg text-white text-sm max-[500px]:py-2 max-[500px]:px-5">Shop Now</Link>
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-end justify-center gap-1">
                                            <p className="text-2xl text-[#DC2626] font-bold">${i.salePrice}</p>
                                            <p className="text-md text-[#111827] text-bold line-through">${i.price}</p>
                                        </div>
                                        <p className="text-[12px] text-[#030712] max-[450px]:hidden">Don't miss this limited time offer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* ============== TOP CATEGRY ================ */}
            <div className="w-full py-7 flex flex-col gap-5">

                {/* top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">Top Categories</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">New products with updated stocks.</span>
                    </div>
                    <button className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></button>
                </div>

                {/* categories */}
                <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg max-[1100px]:overflow-x-auto">
                    {category.slice(2).map((i) => (
                        <div key={i._id} className="shrink-0 w-[140px] flex items-center justify-center flex-col gap-1 border-r border-[#E5E7EB] py-3 cursor-pointer">
                            <img className="w-30 h-30" src={i.image} alt="" />
                            <p className="text-sm font-semibold flex flex-nowrap">{i.name}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* =============== BANNER =================== */}
            <div className="w-full rounded-lg bg-[#FFF7ED] py-3 px-4 flex items-center justify-between relative overflow-hidden cursor-pointer">
                <div className="flex flex-col z-20">
                    <p className="text-xl font-semibold text-[#EA580C]">In store or online your health & safety is our top priority</p>
                    <p className="text-[13px] text-[#6B7280]">The only supermarket that makes your life easier, makes you enjoy life and makes it better</p>
                </div>
                <p className="text-8xl font-semibold  absolute -top-7 left-[50%] z-2 bg-gradient-to-r from-[#ea580c66] to-[#ea580c00] bg-clip-text text-transparent">%50</p>
                <img className="absolute right-0 w-100 h-full z-11 object-cover max-[900px]:hidden" src={b} alt="" />
            </div>


            {/* =============== NEW PRODUCTS ============= */}
            <div className="w-full flex flex-col gap-3  py-8">

                {/*  top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">NEW PRODUCTS</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">Some of the new products arriving this weeks</span>
                    </div>
                    <button className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></button>
                </div>


                {/* products */}
                <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[900px]:grid-cols-2">
                    {products.slice(0, 4).map((i) => (
                        <div key={i._id} className="border-r border-[#E5E7EB] p-3 flex flex-col items-start gap-2 max-[900px]:border-b">
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
            </div>


            {/* =================== CART ================= */}
            <div className="w-full flex items-center justify-between gap-4 max-[800px]:flex-col py-4">
                {cart.slice(0, 3).map((i, key) => (
                    <div key={key} className="relative flex items-center justify-start rounded-lg overflow-hidden max-[800px]:w-full">
                        <img className="w-full h-full object-cover" src={i.image} alt="" />
                        <div className="absolute w-full p-3 flex flex-col gap-2">
                            <p className="text-[12px] text-[#EA580C] max-[800px]:text-xl max-[500px]:text-[12px]">Only This Week</p>
                            <p className="w-50 font-bold max-[800px]:text-4xl max-[800px]:w-100 max-[500px]:text-lg max-[500px]:w-50">{i.title}</p>
                            <button className="w-fit py-1 px-3 flex items-center justify-center gap-2 rounded-full text-[14px] bg-white cursor-pointer">Shop Now <ArrowRight size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>


            {/* ================ NEW ARRIVALS ============ */}
            <div className="w-full flex flex-col gap-4 py-4">

                {/*  top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">NEW PRODUCTS</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">Some of the new products arriving this weeks</span>
                    </div>
                    <button className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></button>
                </div>


                {/* datas */}
                <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[900px]:grid-cols-2 max-[400px]:grid-cols-1">

                    {/* carts */}
                    <div className="flex flex-col justify-between">
                        {cart.slice(0, 2).map((i, key) => (
                            <div key={key} className="flex-1 relative flex items-center justify-start overflow-hidden max-[800px]:w-full">
                                <img className="w-full h-full object-cover" src={i.image} alt="" />
                                <div className="absolute w-full p-3 flex flex-col gap-2">
                                    <p className="text-[12px] text-[#EA580C] max-[800px]:text-xl max-[500px]:text-[12px]">Only This Week</p>
                                    <p className="w-50 font-bold max-[800px]:text-4xl max-[800px]:w-100 max-[500px]:text-lg max-[500px]:w-50">{i.title}</p>
                                    <p className="max-w-30 text-[12px] text-[#6B7280]">{i.descripton}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* prodicts */}
                    {products.slice(0, 3).map((i) => (
                        <div key={i._id} className="border-r border-[#E5E7EB] p-3 flex flex-col items-start gap-2 max-[900px]:border-b">
                            <div className="w-full relative">
                                <img className="w-full h-full object-cover" src={`http://localhost:8000/uploads/${i.mainImage}`} alt="" />
                                <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
                            </div>
                            <p className=" font-semibold truncation overflow-hidden max-[500px]:text-sm">{i.title}</p>
                            <div className="w-full flex items-end gap-3">
                                <p className="text-3xl text-red-600 font-bold max-[500px]:text-xl">${i.discountedPrice}</p>
                                <p className="font-semibold line-through max-[500px]:text-sm">${i.price}</p>
                            </div>
                            <p className="font-semibold text-[#16A34A]">IN STOCK</p>

                        </div>
                    ))}

                </div>


            </div>
        </div>
    )
}