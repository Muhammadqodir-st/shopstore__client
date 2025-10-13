// react router dom
import { useNavigate, useParams, Link } from "react-router-dom"


// react
import { useEffect, useState } from "react";


// axios
import axios from "axios";


// assets
import s from '../assets/s.svg'
import ss from '../assets/ss.svg'


// lucide react
import { Plus, Minus, ShoppingBag, Eye, Heart } from "lucide-react";


// data
import { payment } from '../data/data'


// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../store/feature/userSlice'



export default function Product() {

    // user
    const { user } = useSelector((state) => state.user)


    // params
    const { id } = useParams();


    // states
    const [product, setProduct] = useState(null);
    const [quentity, setQuentity] = useState(1);
    const [message, setMessage] = useState('')
    const [error, setError] = useState('');
    const isWishlesed = user?.user?.wishlist?.some(item => item === product?._id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [mainImage, setMainImage] = useState(product?.mainImage)
    const isAddtoCarted = user?.user?.cart.some(item => item.product === product?._id)



    // mainImage
    useEffect(() => {
        if (product?.mainImage) {
            setMainImage(product.mainImage)
        }
    }, [product]);


    // message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('')
            }, 2500);

            return () => clearTimeout(timer)
        }
    }, [message]);


    // error message
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('')
            }, 2500)

            return () => clearTimeout(timer);
        }
    }, [error]);


    //  wishlist 
    const handleWishlist = async (productId) => {
        try {
            const isWishlesed = user?.wishlist?.some(item => item === productId)

            if (!isWishlesed) {
                const res = await axios.post('http://localhost:8000/wishlists', {
                    userId: user?.user?._id,
                    productId
                }, { withCredentials: true });

                setMessage('Add to  wishlist');
                window.location.reload();
            }

            const updateUser = await axios.get(`http://localhost:8000/register/${user?.user?._id}`, { withCredentials: true })
            dispatch(setUser({ user: updateUser.data }));
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'error!')
            } else {
                setError("Server error!")
            }
        }
    }


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

        window.scrollTo(0, 0)
    }, [id]);


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


    // add to cart
    const handleCart = async (productId) => {
        try {
            const res = await axios.post('http://localhost:8000/carts', {
                productId,
                quantity: quentity,
                userId: user?.user?._id
            }, { withCredentials: true });

            setMessage(res.data.message);
            window.location.reload();
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'error!')
            } else {
                setError("Server error!")
            }
        }
    }


    return (
        <div className="max-w-[998px] w-[90%] mx-auto py-8">
            <div className="flex gap-3 max-[700px]:flex-col">

                {/* images */}
                <div className="w-[45%] flex flex-col  items-center justify-center gap-3 max-[700px]:w-full">
                    <div className="w-full flex items-center justify-center relative border border-gray-300 rounded-xl overflow-hidden">
                        {mainImage && (
                            <img className="w-125 h-110 object-cover" src={`http://localhost:8000/uploads/${product.mainImage}`} alt="" />
                        )}
                        <button className="py-1 px-4 rounded-full bg-red-500 text-white text-[12px] font-semibold absolute top-3 left-3">{product?.discountPercent}%</button>
                        <button onClick={() => handleWishlist(product?._id)} className={`absolute top-3 right-3 cursor-pointer ${!user ? 'hidden' : ''}`}>
                            {isWishlesed ? <Eye onClick={() => navigate('/wishlist')} className="text-red-500" size={22} /> : (
                                <Heart className={`${isWishlesed ? 'text-red-500' : ''}`} size={22} />
                            )}
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center gap-3 max-[700px]:justify-start">
                        {product?.images.map((i, key) => (
                            <div onClick={() => setMainImage(i)} key={key} className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer ${mainImage === i ? `border border-gray-400` : ``}`}>
                                <img className="w-full h-full" src={`http://localhost:8000/uploads/${i}`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* title and other */}
                <div className="w-[55%] py-1 flex flex-col gap-5 max-[700px]:w-full">
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
                            <button onClick={() => setQuentity(prev => prev < product?.stock ? prev + 1 : product?.stock)} className="cursor-pointer"><Plus className="text-[#030712]" size={18} /></button>
                        </div>
                        <button onClick={() => handleCart(product?._id)} className="py-2 px-4 bg-[#16A34A] rounded-lg flex items-center justify-center gap-2 text-white font-bold cursor-pointer">
                            {isAddtoCarted ? (
                                <Link to={'/cart'} className="w-full h-full flex items-center justify-center gap-2">
                                    <Eye size={20} /> View
                                </Link>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center gap-2">
                                    <ShoppingBag size={20} />Add to cart
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="border border-[#E5E7EB] rounded-lg flex flex-col">
                        {payment.map((i, key) => (
                            <div key={key} className="flex items-center gap-2 border-b border-[#E5E7EB] px-3 py-2">
                                <img className="w-7 h-7" src={i.image} alt="" />
                                <div>
                                    <p className="text-sm text-[#6B7280]"><span className="font-semibold">{i.title}</span>{i.descripton}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="w-full flex flex-col gap-3 py-8">
                <p className="font-semibold">Description</p>
                <p className="text-[#030712]">{product?.description}</p>
            </div>


            {/* ============= Related products ========== */}
            <div className="w-full flex flex-col gap-4 py-5">
                <p className="font-bold">Related products</p>

                {/* products */}
                <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[900px]:grid-cols-2">
                    {products?.slice(0, 4).map((i) => (
                        <Link to={`/product/${i._id}`} key={i._id} className="border-r border-[#E5E7EB] p-3 flex flex-col items-start gap-2 max-[900px]:border-b">
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
                        </Link>
                    ))}
                </div>
            </div>


            {/* message */}
            {
                message && (
                    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-1000 bg-indigo-500 text-white px-4 py-2 rounded shadow-lg">
                        {message}
                    </div>
                )
            }

            {/* error */}
            {
                error && (
                    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-1000 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
                        {error}
                    </div>
                )
            }
        </div>
    )
}