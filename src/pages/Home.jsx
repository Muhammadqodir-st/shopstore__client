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

export default function Home() {

    // states
    const [category, setCategory] = useState([]);


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
                        <span className="text-sm text-[9CA3AF] max-[600px]:hidden">New products with updated stocks.</span>
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
        </div>
    )
}