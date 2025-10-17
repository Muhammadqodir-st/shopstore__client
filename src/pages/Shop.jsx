// axios
import axios from "axios"

// react
import { useEffect, useState } from "react"

// assest
import s from '../assets/s.png'


// lucide react
import { Car, MoveRight, Search } from "lucide-react";

// react-router-dom
import { useNavigate, useParams, Link } from "react-router-dom";

// lucide react
import { ShoppingCart, Heart, ScanEye } from "lucide-react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from '../store/feature/wishlistSlice'
import { setCart } from '../store/feature/cartSlice'

// loader or message
import { toast } from "react-hot-toast";

export default function Shop() {

    // user
    const { wishlist } = useSelector((state) => state.wishlist)
    const { cart } = useSelector((state) => state.cart)

    // navigate
    const naviagte = useNavigate();
    const dispatch = useDispatch();

    // states
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null)
    const [quantity, setQuentity] = useState(1);
    const { categoryId } = useParams();



    // get category
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get('http://localhost:8000/categories', { withCredentials: true })
                setCategories(res.data.categories)
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);

    // get products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const url = categoryId ? `http://localhost:8000/products?category=${categoryId}` : 'http://localhost:8000/products?category'
                const res = await axios.get(url)
                setProducts(res.data.products)
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [categoryId]);


    const handleCategoryClick = (id) => {
        if (id) {
            naviagte(`/shop/${id}`)
        } else {
            naviagte('/shop')
        }
    }

    // add wishlist
    const handleWishlist = async (product) => {
        const isWishlesed = wishlist.some((i) => i._id === product._id)
        try {
            if (!isWishlesed) {
                const res = await axios.post('http://localhost:8000/wishlists', {
                    productId: product._id
                }, { withCredentials: true });
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
                const { data } = await axios.post('http://localhost:8000/carts', {
                    productId: product._id,
                    quantity: quantity
                }, { withCredentials: true });
                dispatch(setCart([...cart, { product, quantity: quantity }]))
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="max-w-[998px] w-[90%] mx-auto">
            <div className="flex justify-between gap-5 max-[998px]:flex-col">

                {/* filter */}
                <div className="sticky h-fit top-20 flex flex-col gap-3 bg-white z-2 py-2">
                    <p className="text-lg font-bold">Product Categories</p>
                    <div className="flex flex-col gap-1 max-[998px]:flex-row max-[998px]:flex-wrap max-[998px]:gap-2">
                        {/* all category  */}
                        <label className="flex items-center gap-2 cursor-pointer max-[998px]:border border-gray-400 max-[998px]:py-1 max-[998px]:px-3 max-[998px]:rounded-full w-fit max-[998px]:text-[13px]">
                            <input className="input max-[998px]:hidden" name="input" checked={!categoryId} onChange={() => handleCategoryClick(null)} type="checkbox" />
                            <p className={`${!categoryId ? 'text-[#7764d8] font-semibold' : ''}`}>All products</p>
                        </label>
                        {/* filter category */}
                        {categories.map((i) => (
                            <label className="flex items-center gap-2 cursor-pointer max-[998px]:border border-gray-400 max-[998px]:py-1 max-[998px]:px-3 max-[998px]:rounded-full w-fit max-[998px]:text-[13px]" key={i._id}>
                                <input className="input max-[998px]:hidden" name="input" checked={categoryId === i._id} onChange={() => handleCategoryClick(i._id)} type="checkbox" />
                                <p className={`${selectCategory === i._id || categoryId === i._id ? 'text-[#7764d8] font-semibold' : ''}`}>{i.name}</p>
                            </label>
                        )).reverse()}
                    </div>
                </div>


                {/* product */}
                <div className="w-[78%] flex flex-col gap-3 max-[998px]:w-full">

                    {/* search */}
                    <label className="w-full py-[7px] px-3 rounded-xl border border-indigo-700 flex items-center justify-between gap-3">
                        <input className="flex-1 outline-0" type="text" />
                        <Search className="text-indigo-700 cursor-pointer" strokeWidth={1.55} size={22} />
                    </label>

                    {/* banner */}
                    <div className="relative rounded-lg overflow-hidden max-[730px]:hidden">
                        <img src={s} alt="" />
                        <div className="absolute w-full h-full p-5 top-0 flex flex-col gap-2">
                            <button className="w-fit px-2 py-1 rounded-full text-[11px] text-[#7C2D12] bg-[#FFEDD5]">Only This Week</button>
                            <p className="max-w-100 text-3xl font-bold">Grocery store with different treasures</p>
                            <button className="w-fit flex items-center justify-center gap-3 py-2 px-4 bg-white rounded-full text-sm border border-[#E5E7EB] cursor-pointer font-semibold">Shop Now <MoveRight size={18} /></button>
                        </div>
                    </div>

                    {/* products */}
                    <div className="grid grid-cols-4 border border-[#E5E7EB] rounded-lg max-[850px]:grid-cols-3 max-[600px]:grid-cols-2">
                        {products.length === 0 ? (
                            <p>no product</p>
                        ) : (
                            products.map((i) => {
                                const isWishlesed = wishlist.some((item) => item._id === i._id)
                                const isAddtoCarted = cart?.some(item => item?.product._id === i?._id)

                                return (
                                    <div key={i._id} className="border-r border-b border-[#E5E7EB] p-3 flex flex-col justify-between gap-2" >
                                        <div className="w-full relative">
                                            <Link to={`/product/${i._id}`} className="w-full h-full">
                                                <img className="w-full h-full object-cover" src={`http://localhost:8000/uploads/${i.mainImage}`} alt="" />
                                            </Link>
                                            <button className="py-1 px-3 rounded-full bg-[#DC2626] text-white text-[11px] font-semibold absolute top-0 left-0">{i.discountPercent}%</button>
                                            <button onClick={() => handleWishlist(i)} className=" absolute top-0 right-0 cursor-pointer">
                                                {isWishlesed ? (
                                                    <Link to={'/wishlist'}>
                                                        <ScanEye className="text-[#DC2626]" size={22} />
                                                    </Link>
                                                ) : (
                                                    <Heart size={20} />
                                                )}
                                            </button>
                                        </div>
                                        <p className="text-sm font-semibold">{i?.title?.length > 40 ? i?.title.slice(0, 40) + ' . . .' : i?.title}</p>
                                        <div className="w-full flex items-end gap-3 ">
                                            <p className="max-w-18 truncate text-[20px] font-bold text-[#DC2626]">${i.discountedPrice}</p>
                                            <p className="line-through">${i.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => handleCart(i)} className="p-2 bg-[#16A34A] rounded-lg text-white cursor-pointer">
                                                {isAddtoCarted ? (
                                                    <Link to={'/cart'}>
                                                        <ScanEye size={18} />
                                                    </Link>
                                                ) : (
                                                    <ShoppingCart size={18} />
                                                )}
                                            </button>
                                            <p className="text-sm font-bold text-[#16A34A]">IN STOCK</p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}