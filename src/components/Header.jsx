// react router dom
import { Link, useLocation, useNavigate } from "react-router-dom"

// react
import { useState } from "react"


// lucide react
import { Search, User, Heart, ShoppingCart, House, Store, ShoppingBasket, CircleUser, Plus } from "lucide-react"

// logo
import logo from '../assets/logo.svg'

// redux
import { useSelector } from "react-redux"


export default function Header() {

    // /redux
    const { user } = useSelector((state) => state.user);
    const { cart } = useSelector((state) => state.cart);
    const { wishlist } = useSelector((state) => state.wishlist)


    // location
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="w-full z-3 sticky top-0 bg-white">
            <div className="max-w-[998px] w-[90%] mx-auto py-5 flex justify-between gap-5 ">

                {/* logo */}
                <Link to={'/'}>
                    <div className="flex items-center relative">
                        <img className="h-11" src={logo} alt="" />
                        <p className="text-2xl font-bold absolute left-14">ShopStore</p>
                    </div>
                </Link>


                {/* navigation */}
                <ul className="flex items-center justify-center gap-8 max-[850px]:hidden">
                    <Link to={'/'} className={location.pathname === '/' ? 'text-lg text-indigo-700 after:content-[\'\'] after:block after:h-[2px] after:bg-indigo-500' : 'text-lg text-[#030712] hover:text-indigo-500'}>Home</Link>
                    <Link to={'/shop'} className={location.pathname === '/shop' ? 'text-lg text-indigo-700 after:content-[\'\'] after:block after:h-[2px] after:bg-indigo-500' : 'text-lg text-[#030712] hover:text-indigo-500'}>Shop</Link>
                    <Link to={'/blog'} className={location.pathname === '/blog' ? 'text-lg text-indigo-700 after:content-[\'\'] after:block after:h-[2px] after:bg-indigo-500' : 'text-lg text-[#030712] hover:text-indigo-500'}>Blog</Link>
                    <Link to={'/contact'} className={location.pathname === '/contact' ? 'text-lg text-indigo-700 after:content-[\'\'] after:block after:h-[2px] after:bg-indigo-500' : 'text-lg text-[#030712] hover:text-indigo-500'}>Contact</Link>
                    {user?.user?.role === 'vendor' ? (
                        <Link to={'/profile/addproduct'} className={location.pathname === '/profile/addproduct' ? 'text-lg text-indigo-700 after:content-[\'\'] after:block after:h-[2px] after:bg-indigo-500' : 'text-lg text-[#030712] hover:text-indigo-500'}>new</Link>
                    ) : null}
                </ul>


                {/* sign cart shopping cart */}
                <div className="flex items-center justify-center gap-5">

                    {/* search */}
                    <div onClick={() => navigate('/shop')} className="cursor-pointer max-[400px]:">
                        <Search size={24} />
                    </div>


                    {/* sign account */}
                    <Link className="max-[850px]:hidden" to={user ? '/profile' : '/auth/login'}>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <User size={24} />
                            <p className="flex flex-col">
                                <span className="text-[10px] text-gray-600">
                                    {user ? '' : 'Sign In'}
                                </span>
                                <span className={user ? 'max-w-32 text-[14px] text-black truncate' : 'text-[11px] text-black truncate'}>
                                    {user ? user?.user?.name : "Account"}
                                </span>
                            </p>
                        </div>
                    </Link>

                    {/* wishlist */}
                    <Link className="max-[850px]:hidden" to={'/wishlist'}>
                        <div className="relative cursor-pointer">
                            <Heart size={24} />
                            <span className="text-white w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1 text-[13px]">
                                {wishlist?.length || 0}
                            </span>
                        </div>
                    </Link>

                    {/* shopping cart */}
                    <Link className="max-[850px]:hidden" to={'/cart'}>
                        <div className="relative cursor-pointer">
                            <ShoppingCart size={24} />
                            <span className="text-white w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1 text-[13px]">
                                {cart?.length || 0}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>


            {/* small devige navigate */}
            <div className="min-[850px]:hidden fixed left-0 bottom-0 w-full border-t border-[#cdcdcf] py-3 bg-white z-1000">
                <div className="w-[90%] mx-auto flex items-center justify-between">
                    <Link to={'/'} className="flex flex-col items-center">
                        <House size={23} className="text-[#505054]" />
                    </Link>


                    <Link to={'/shop'} className="flex flex-col items-center">
                        <Store size={23} className="text-[#505054]" />
                    </Link>


                    {user?.user?.role === 'vendor' ? (
                        <Link to={'/profile/addproduct'} className="flex flex-col items-center">
                            <Plus size={23} className="text-[#505054]" />
                        </Link>
                    ) : null}


                    <Link to={'/cart'} className="flex flex-col items-center relative">
                        <ShoppingBasket size={23} className="text-[#505054]" />
                        <span className="text-white w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1 text-[13px]">
                            {cart?.length || 0}
                        </span>
                    </Link>


                    {user?.user?.role !== 'vendor' ? (
                        <Link to={'/wishlist'} className="flex flex-col items-center relative">
                            <Heart size={23} className="text-[#505054]" />
                            <span className="text-white w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1 text-[13px]">
                                {wishlist?.length || 0}
                            </span>
                        </Link>
                    ) : null}


                    <Link to={'/profile'} className="flex flex-col items-center">
                        <CircleUser size={23} className="text-[#505054]" />
                    </Link>
                </div>
            </div>
        </div>
    )
}