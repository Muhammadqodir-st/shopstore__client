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
import { useNavigate, Link, data } from "react-router-dom"


// react
import { useEffect, useState } from "react"


// axios
import axios from "axios"


// lucide react 
import { ArrowRight, Heart, Plus, ShoppingBasket, Eye } from 'lucide-react'


// cart data
import { card, cardSlice } from '../data/data'


// redux
import { useDispatch, useSelector } from "react-redux"
import { setWishlist } from '../store/feature/wishlistSlice'
import { setCart } from '../store/feature/cartSlice'


// loading and toaster 
import toast from "react-hot-toast";
import CategoriesLoader from "../components/loaders/CategoryLoader"


export default function Home() {

    window.scrollTo(0, 0)

    // navigate
    const navigate = useNavigate();

    // redux
    const { user } = useSelector((state) => state.user);
    const { wishlist } = useSelector((state) => state.wishlist)
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();


    // states
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [quantity, setQuentity] = useState(1);
    const token = localStorage.getItem('token')


    // get all category
    useEffect(() => {
        const getCategory = async () => {
            try {
                const { data } = await axios.get('https://shopstore-server.onrender.com/categories', { headers: { Authorization: `Bearer ${token}` } })
                setCategory(data.categories);
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);


    // get products
    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get('https://shopstore-server.onrender.com/products', { headers: { Authorization: `Bearer ${token}` } })
                setProducts(data.products)
            } catch (error) {
                console.log(error);

            }
        }
        getProduct();
    }, []);



    //  wishlist 
    const handleWishlist = async (product) => {
        const isWishlesed = wishlist.some((i) => i._id === product._id)
        try {
            if (!isWishlesed) {
                const res = await axios.post('https://shopstore-server.onrender.com/wishlists', {
                    productId: product._id
                }, { headers: { Authorization: `Bearer ${token}` } });
                toast.success(res.data.message);
                dispatch(setWishlist([...wishlist, product]));
            }
        } catch (error) {
            console.log(error);
        }
    }


    // add to cart
    const handleCart = async (product) => {
        const isAddtoCarted = cart.some((i) => i.product._id === product._id)
        try {
            if (!isAddtoCarted) {
                const { data } = await axios.post('https://shopstore-server.onrender.com/carts', {
                    productId: product._id,
                    quantity: quantity
                }, { headers: { Authorization: `Bearer ${token}` } });
                dispatch(setCart([...cart, { product, quantity: quantity }]))
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }


    // filter category
    const handleFilter = (id) => {
        navigate(`/shop/${id}`)
    };


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

    products.map((i) => {
        if (i.title.length > 40) {
            i.title = i.title.slice(0, 40) + '...'
        }
    })


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
                                    <Link to={user ? '/shop' : '/auth/login'} className="py-3 px-7 bg-[#634C9F] rounded-lg text-white text-sm max-[500px]:py-2 max-[500px]:px-5">Shop Now</Link>
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
                    <Link to={user ? '/shop' : '/auth/login'} className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></Link>
                </div>

                {/* categories */}
                <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg max-[1100px]:overflow-x-auto">
                    {category.length !== 0 ? category.slice(0, 7).map((i) => (
                        <div onClick={() => handleFilter(i._id)} key={i._id} className="shrink-0 w-[140px] flex items-center justify-center flex-col gap-1 border-r border-[#E5E7EB] py-3 cursor-pointer">
                            <img className="w-30 h-30" src={i.image} alt="" />
                            <p className="text-sm font-semibold flex flex-nowrap">{i.name}</p>
                        </div>
                    )) : (
                        <CategoriesLoader />
                    )}
                </div>
            </div>


            {/* =============== BANNER =================== */}
            <Link to={user ? '/shop' : '/auth/login'} className="w-full rounded-lg bg-[#FFF7ED] py-3 px-4 flex items-center justify-between relative overflow-hidden cursor-pointer">
                <div className="flex flex-col z-2">
                    <p className="text-xl font-semibold text-[#EA580C]">In store or online your health & safety is our top priority</p>
                    <p className="text-[13px] text-[#6B7280]">The only supermarket that makes your life easier, makes you enjoy life and makes it better</p>
                </div>
                <p className="text-8xl font-semibold  absolute -top-7 left-[50%] z-2 bg-gradient-to-r from-[#ea580c66] to-[#ea580c00] bg-clip-text text-transparent">%50</p>
                <img className="absolute right-0 w-100 h-full z-2 object-cover max-[900px]:hidden" src={b} alt="" />
            </Link>


            {/* =============== NEW PRODUCTS ============= */}
            <div className="w-full flex flex-col gap-3  py-8">

                {/*  top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">NEW PRODUCTS</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">Some of the new products arriving this weeks</span>
                    </div>
                    <Link to={user ? '/shop' : '/auth/login'} className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></Link>
                </div>


                {/* products */}
                <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[900px]:grid-cols-2">
                    {products.slice(0, 4).map((i) => (
                        <Link to={`/product/${i._id}`} key={i._id} className="border-r border-[#E5E7EB] p-3 flex flex-col items-start gap-2 max-[900px]:border-b">
                            <div className="w-full relative">
                                <img className="w-full h-full object-cover" src={i.mainImage} alt="" />
                                <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
                            </div>
                            <p className=" font-semibold truncation overflow-hidden max-[500px]:text-sm">{i.title}</p>
                            <div className="w-full flex items-end gap-3 border-b border-[#E5E7EB] py-2">
                                <p className="max-w-33 truncate text-3xl text-red-600 font-bold max-[500px]:text-xl">${i.discountedPrice}</p>
                                <p className="font-semibold line-through max-[500px]:text-sm">${i.price}</p>
                            </div>
                            <p className="text-sm text-[#6B7280] max-[400px]:text-[11px]">This product is about to run out</p>
                            <div className="w-full py-1 bg-gradient-to-r from-[#FFD200] to-[#DC2626]"></div>
                            <p className="text-sm text-[#6B7280] max-[400px]:text-[11px]">available only: <span className="text-xl font-bold text-black">{i.stock}</span></p>
                        </Link>
                    ))}
                </div>
            </div>


            {/* =================== CARDS ================= */}
            <div className="w-full flex items-center justify-between gap-4 max-[800px]:flex-col py-4">
                {card.slice(0, 3).map((i, key) => (
                    <div key={key} className="relative flex items-center justify-start rounded-lg overflow-hidden max-[800px]:w-full">
                        <img className="w-full h-full object-cover" src={i.image} alt="" />
                        <div className="absolute w-full p-3 flex flex-col gap-2">
                            <p className="text-[12px] text-[#EA580C] max-[800px]:text-xl max-[500px]:text-[12px]">Only This Week</p>
                            <p className="w-50 font-bold max-[800px]:text-4xl max-[800px]:w-100 max-[500px]:text-lg max-[500px]:w-50">{i.title}</p>
                            <Link to={'/shop'} className="w-fit py-1 px-3 flex items-center justify-center gap-2 rounded-full text-[14px] bg-white cursor-pointer">Shop Now <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                ))}
            </div>


            {/* ================ NEW ARRIVALS ============= */}
            <div className="w-full flex flex-col gap-4 py-4">

                {/*  top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">NEW ARRIVALS</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">Do not miss the current offers until the end of month.</span>
                    </div>
                    <Link to={'/shop'} className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></Link>
                </div>


                {/* datas */}
                <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[900px]:grid-cols-2 max-[400px]:grid-cols-1">

                    {/* cards */}
                    <div className="flex flex-col-reverse justify-between">
                        {card.slice(2, 4).map((i, key) => (
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
                    {products.slice(2, 5).map((i) => (
                        <Link to={`/product/${i._id}`} key={i._id} className="border-r border-[#E5E7EB] p-3 flex flex-col items-start gap-2 max-[900px]:border-b">
                            <div className="w-full relative">
                                <img className="w-full h-full object-cover" src={i.mainImage} alt="" />
                                <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
                            </div>
                            <p className=" font-semibold truncation overflow-hidden max-[500px]:text-sm">{i.title}</p>
                            <div className="w-full flex items-end gap-3">
                                <p className="text-3xl text-red-600 font-bold max-[500px]:text-xl">${i.discountedPrice}</p>
                                <p className="font-semibold line-through max-[500px]:text-sm">${i.price}</p>
                            </div>
                            <p className="font-semibold text-[#16A34A]">IN STOCK</p>

                        </Link>
                    ))}

                </div>


            </div>


            {/* ================ CARDS =================== */}
            <div className="w-full flex items-center justify-between gap-5 max-[800px]:flex-col py-4">
                {card.slice(4, 6).map((i, key) => (
                    <div key={key} className="relative flex items-center justify-start rounded-lg overflow-hidden max-[800px]:w-full">
                        <img className="w-full h-full object-cover" src={i.image} alt="" />
                        <div className="absolute w-full p-3 flex flex-col gap-2">
                            <p className="py-1 px-3 bg-[#FFEDD5] rounded-lg text-[#7C2D12] w-fit max-[550px]:text-[12px] max-[400px]:hidden">Only This Week</p>
                            <p className="max-w-70 text-2xl font-bold max-[500px]:text-lg">{i.title}</p>
                            <p className="text-sm text-[#6B7280] max-[500px]:hidden">{i.descripton}</p>
                            <Link to={'/shop'} className="flex items-center gap-2 text-sm bg-white w-fit py-2 px-4 rounded-full cursor-pointer max-[500px]:py-1 max-[500px]:px-3">Shop Now <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                ))}
            </div>


            {/* ============= FEATURES PRODUCTS ========== */}
            <div className="w-full  flex flex-col gap-4 py-4">

                {/*  top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">Featured Products</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">Do not miss the current offers until the end of month.</span>
                    </div>
                    <Link to={'/shop'} className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></Link>
                </div>

                {/* datas */}
                <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[900px]:grid-cols-2 max-[400px]:grid-cols-1">

                    {/* cards */}
                    <div className="flex flex-col-reverse justify-between">
                        {card.slice(6, 7).map((i, key) => (
                            <div key={key} className="flex-1 relative flex items-center justify-start overflow-hidden max-[800px]:w-full">
                                <img className="w-full h-full object-cover" src={i.image} alt="" />
                                <div className="w-full h-full absolute px-4 py-3 flex flex-col gap-2">
                                    <p className="text-sm text-[#EA580C]">Only This Week</p>
                                    <p className="text-2xl font-bold">{i.title}</p>
                                    <p className="text-sm text-[#6B7280]">{i.descripton}</p>
                                    <Link to={'/shop'} className="flex items-center gap-2 text-sm bg-white w-fit py-2 px-4 rounded-full cursor-pointer max-[500px]:py-1 max-[500px]:px-3">Shop Now <ArrowRight size={16} /></Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* prodicts */}
                    {products.slice(4, 7).map((i) => (
                        <Link to={`/product/${i._id}`} key={i._id} className="border-r border-[#E5E7EB] p-3 flex flex-col items-start gap-2 max-[900px]:border-b">
                            <div className="w-full relative">
                                <img className="w-full h-full object-cover" src={i.mainImage} alt="" />
                                <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
                            </div>
                            <p className=" font-semibold truncation overflow-hidden max-[500px]:text-sm">{i.title}</p>
                            <div className="w-full flex items-end gap-3">
                                <p className="text-3xl text-red-600 font-bold max-[500px]:text-xl">${i.discountedPrice}</p>
                                <p className="font-semibold line-through max-[500px]:text-sm">${i.price}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>


            {/* =================== CARDS ================= */}
            <div className="w-full flex items-center justify-between gap-4 max-[800px]:flex-col py-4">
                {card.slice(7, 11).map((i, key) => (
                    <div key={key} className="relative flex items-center justify-start rounded-lg overflow-hidden max-[800px]:w-full">
                        <img className="w-full h-full object-cover" src={i.image} alt="" />
                        <div className="absolute w-full p-3 flex flex-col gap-2">
                            <p className="text-[12px] text-[#EA580C] max-[800px]:text-xl max-[500px]:text-[12px]">Only This Week</p>
                            <p className="w-50 font-bold max-[800px]:text-4xl max-[800px]:w-100 max-[500px]:text-lg max-[500px]:w-50">{i.title}</p>
                            <Link to={'/shop'} className="w-fit py-1 px-3 flex items-center justify-center gap-2 rounded-full text-[14px] bg-white cursor-pointer">Shop Now <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                ))}
            </div>


            {/* ============= DEALS OF THE DAY ============ */}
            <div className="w-full flex flex-col gap-4 py-4">

                {/*  top texts */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-semibold">Deals Of The Day</p>
                        <span className="text-sm text-[#9CA3AF] max-[600px]:hidden">The freshest greengrocer products are waiting for you</span>
                    </div>
                    <button className="py-2 px-4 border border-[#E5E7EB] rounded-full flex text-sm items-center justify-center gap-2 cursor-pointer hover:border-gray-900 max-[500px]:py-1 max-[500px]:px-3 max-[500px]:text-[12px]">View All <ArrowRight size={16} /></button>
                </div>

                {/* dada */}
                <div className="w-full flex gap-3 max-[950px]:flex-col">
                    <div className="w-[40%] border border-[#E5E7EB] rounded-lg max-[950px]:w-full">
                        {products.slice(0, 2).map((i) => {
                            const isWishlesed = wishlist?.some(item => item._id === i._id);
                            const isAddtoCarted = cart?.some(item => item?.product?._id === i?._id)




                            return (
                                <div key={i._id} className="flex items-start gap-3 p-3 border-b border-[#E5E7EB] max-[700px]:flex-col" >
                                    <div className="relative flex items-center justify-center max-[700px]:w-full">
                                        <Link to={`/product/${i._id}`}>
                                            <img src={i.mainImage} alt="" />
                                        </Link>
                                        <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-2 left-0">{i.discountPercent}%</button>
                                        <button onClick={() => handleWishlist(i)} className={`absolute top-2 right-0 cursor-pointer ${!user ? 'hidden' : ''}`}>
                                            {isWishlesed ? <Eye onClick={() => navigate('/wishlist')} className="text-red-500" size={22} /> : (
                                                <Heart className={`${isWishlesed ? 'text-red-500' : ''}`} size={22} />
                                            )}
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2 max-[700px]:w-full">
                                        <Link to={`/product/${i._id}`} className="max-w-60 text-lg font-semibold">{i.title}</Link>
                                        <Link to={`/product/${i._id}`} className="w-full flex items-center gap-3 ">
                                            <p className="max-w-28 truncate text-2xl font-bold text-red-600 ">${i.discountedPrice}</p>
                                            <p className="font-semibold line-through">${i.price}</p>
                                        </Link>
                                        <button onClick={() => handleCart(i)} className="w-full py-1 px-3 rounded-full flex items-center justify-between border border-[#634C9F] text-[#634C9F] cursor-pointer">
                                            {isAddtoCarted ? (
                                                <Link to={'/cart'} className="w-full h-full flex items-center justify-between text-[#634C9F]">
                                                    <Eye size={20} /> View
                                                </Link>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-between text-[#634C9F]">
                                                    Add to cart <Plus className="text-[#634C9F]" size={20} />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex-1 border-3 p-4 border-[#DC2626] rounded-lg">
                        {products.slice(4, 5).map((i) => {
                            const isWishlesed = wishlist?.some(item => item._id === i._id);
                            const isAddtoCarted = cart?.some(item => item?.product._id === i?._id)

                            return (
                                <div key={i._id} className="w-full h-full flex items-center gap-3 max-[700px]:flex-col">
                                    <div className="w-[55%] h-full relative flex items-center justify-center max-[700px]:w-full">
                                        <Link to={`/product/${i._id}`} className="w-full h-full">
                                            <img className="w-full h-full object-cover" src={i.mainImage} alt="" />
                                        </Link>
                                        <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-2 left-0">{i.discountPercent}%</button>
                                        <button onClick={() => handleWishlist(i)} className={`absolute top-2 right-0 cursor-pointer ${!user ? 'hidden' : ''}`}>
                                            {isWishlesed ? <Eye onClick={() => navigate('/wishlist')} className="text-red-500" size={22} /> : (
                                                <Heart className={`${isWishlesed ? 'text-red-500' : ''}`} size={22} />
                                            )}
                                        </button>
                                    </div>
                                    <div className="w-[45%] flex flex-col gap-2 max-[700px]:w-full">
                                        <p className="max-w-70 text-2xl font-bold">{i.title}</p>
                                        <div className="border-b border-[#E5E7EB] py-3 flex flex-col gap-1">
                                            <div className="w-full flex items-center gap-3 ">
                                                <p className="text-3xl font-bold text-red-600 ">${i.discountedPrice}</p>
                                                <p className="font-semibold line-through text-lg">${i.price}</p>
                                            </div>
                                            <p className="max-w-full text-sm text-[#4B5563]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam </p>
                                        </div>
                                        <div className="py-1">
                                            <p className="text-sm text-[#6B7280] max-[400px]:text-[11px]">This product is about to run out</p>
                                            <div className="w-full py-1 bg-gradient-to-r from-[#FFD200] to-[#DC2626]"></div>
                                            <p className="text-sm text-[#6B7280] max-[400px]:text-[11px]">available only: <span className="text-xl font-bold text-black">{i.stock}</span></p>
                                        </div>
                                        <button onClick={() => handleCart(i)} className="w-full py-2 px-3 bg-[#16A34A] rounded-lg flex items-center text-white gap-2 cursor-pointer">
                                            {isAddtoCarted ? (
                                                <Link to={'/cart'} className="w-full h-full flex items-center justify-start gap-2">
                                                    <Eye size={20} /> View
                                                </Link>
                                            ) : (
                                                <div className="w-full h-full flex items-center text-white gap-2 cursor-pointer">
                                                    <ShoppingBasket size={21} /> Add to Cart
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>


            {/* ============= CART SLIDE ================= */}
            <div className="w-full flex items-center justify-between gap-3 overflow-x-auto py-8">
                {cardSlice.map((i, key) => (
                    <div key={key} className="flex items-center justify-between gap-5 flex-shrink-0">
                        <img className="w-12 h-12" src={i.image} alt="" />
                        <div>
                            <p className="text-sm font-semibold">{i.title}</p>
                            <p className="max-w-45 text-[10px] text-[#6B7280]">{i.descripton}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
};