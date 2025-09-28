// swiper
import { Swiper, SwiperSlide } from "swiper/react"

// import swiper styles
import 'swiper/css'
import { Pagination } from "swiper/modules"
import 'swiper/css/pagination'

// img
import img1 from '../assets/swiperimg.png'
import img2 from '../assets/swiperimg2.png'


export default function Home() {

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
            title: 'Shopping with us for better quality and the best price',
            desc: 'We have prepared special discounts for you on grocery products. Don\'t miss these opportunities...',
            price: '26.67',
            salePrice: '21.67'
        }
    ]


    return (
        <div className="max-w-[998px] w-[90%] mx-auto">
            <Swiper className="w-full h-auto rounded-lg"
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
            >
                {swiper.map((i) => (
                    <SwiperSlide key={i.id} className="w-full h-full">
                        <img className="w-full h-120 object-cover rounded-lg" src={i.image} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}