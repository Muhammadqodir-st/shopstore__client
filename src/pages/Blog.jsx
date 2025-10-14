// data
import { blog } from '../data/data'

// swiper
import { Swiper, SwiperSlide } from "swiper/react"

// swiper
import 'swiper/css'
import { Pagination } from "swiper/modules"
import 'swiper/css/pagination'

// lucide react
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'



export default function Blog() {

    // blog slide
    const blogSlideOne = blog.slice(0, 3)
    const blogProfile = blog.slice(0, 4);
    window.scrollTo(0, 0)


    return (
        <div className="max-w-[998px] w-[90%] mx-auto flex items-start justify-between gap-10 py-10 max-[990px]:flex-col">
            <Swiper
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                className='max-[990px]:w-full'>

                {/* slide one */}
                <SwiperSlide className='w-full'>
                    <div className='flex flex-col gap-8'>
                        {blogSlideOne.map((i, key) => (
                            <div key={key} className='flex flex-col items-start gap-3'>
                                <div className='relative'>
                                    <img className='rounded-xl' src={i.image} alt="" />
                                    <button className='absolute top-3 left-3 bg-white py-1 px-3 rounded-lg text-[#634C9F] font-semibold max-[600px]:text-sm'>Uncategorized</button>
                                </div>
                                <p className='text-4xl font-semibold max-[600px]:text-2xl'>{i.title}</p>
                                <div className='flex items-center gap-4'>
                                    <p className='text-sm text-[#374151] max-[600px]:text-[12px]'>{i.date}</p>
                                    <p className='text-sm text-[#374151] max-[600px]:text-[12px]'>{i.auth}</p>
                                </div>
                                <p className='text-sm text-[#374151] max-[600px]:text-[12px]'>{i.descripton}</p>
                                <button className='py-2 px-4 bg-[#634C9F] rounded-lg text-white cursor-pointer hover:bg-[#6b579f]'>Read More</button>
                            </div>
                        ))}
                    </div>
                </SwiperSlide>

            </Swiper>


            {/* blog list */}
            <div className='sticky top-20 w-[28%] flex flex-col gap-10 max-[990px]:w-full'>
                <p className='font-semibold'>Blog Post List</p>

                {/* profiles */}
                <div className='flex flex-col justify-between gap-3 max-[990px]:flex-row max-[990px]:flex-wrap'>

                    {blogProfile.map((i, key) => (
                        <div key={key} className='flex items-start gap-3'>
                            <img className='w-13 h-13 rounded-full' src={i.image} alt="" />
                            <div className='flex flex-col gap-3'>
                                <p className='text-[14px] font-semibold max-w-35 truncate'>{i.title}</p>
                                <p className='text-[12px] text-[#374151]'>{i.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* networks */}
                <div className='flex flex-col gap-3'>
                    <p className='text-sm font-semibold'>Social Media Widget</p>

                    <div className='flex flex-col gap-3 max-[990px]:flex-row max-[990px]:flex-wrap'>
                        <button className='w-full flex items-center justify-start py-3 px-3 gap-3 bg-[#1877F2] rounded-lg cursor-pointer text-white text-sm'>
                            <Facebook size={20} />
                            facebook
                        </button>
                        <button className='w-full flex items-center justify-start py-3 px-3 gap-3 bg-[#1DA1F2] rounded-lg cursor-pointer text-white text-sm'>
                            <Twitter size={20} />
                            twitter
                        </button>
                        <button className='w-full flex items-center font-semibold justify-start py-3 px-3 gap-3 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg cursor-pointer text-white text-sm'>
                            <Instagram size={20}  />
                            instagram
                        </button>
                        <button className='w-full flex items-center justify-start py-3 px-3 gap-3 bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-lg cursor-pointer text-white text-sm'>
                            <Linkedin size={20} />
                            linkedin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}