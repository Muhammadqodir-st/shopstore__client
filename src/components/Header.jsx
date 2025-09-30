// react router dom
import { Link, useLocation } from "react-router-dom"

// react
import { useState } from "react"


// lucide react
import { Search, User, Heart, ShoppingCart, House, Store, ShoppingBasket, CircleUser } from "lucide-react"

// logo
import logo from '../assets/logo.svg'

// redux
import { useSelector } from "react-redux"


export default function Header() {

    // use state
    const [openSearch, setOpenSearch] = useState(false);


    // /redux
    const { user } = useSelector((state) => state.user);

    // location
    const location = useLocation();


    return (
        <div>
            <div className="sticky top-0 left-0 z-999 max-w-[998px] w-[90%] mx-auto py-5 flex justify-between gap-5">

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
                </ul>


                {/* sign cart shopping cart */}
                <div className="flex items-center justify-center gap-5">

                    {/* search */}
                    {openSearch && (
                        <div className={`absolute top-full left-0 z-100 w-full transition-all duration-500 ease-in-out max-[850px]:static ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
                            <input type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-lg border shadow focus:outline-none" />
                        </div>
                    )}
                    <div onClick={() => setOpenSearch(!openSearch)} className="cursor-pointer">
                        <Search size={24} />
                    </div>


                    {/* sign account */}
                    <Link className="max-[850px]:hidden" to={user ? '/' : '/auth/login'}>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <User size={24} />
                            <p className="flex flex-col">
                                <span className="text-[10px] text-gray-600">
                                    {user ? '' : 'Sign In'}
                                </span>
                                <span className={user ? 'text-[14px] text-black truncate' : 'text-[11px] text-black truncate'}>
                                    {user ? user.user.name : "Account"}
                                </span>
                            </p>
                        </div>
                    </Link>

                    {/* wishlist */}
                    <Link className="max-[850px]:hidden" to={'/wishlist'}>
                        <div className="relative cursor-pointer">
                            <Heart size={24} />
                            <span className="text-white w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1 text-[13px]">0</span>
                        </div>
                    </Link>

                    {/* shopping cart */}
                    <Link className="max-[850px]:hidden" to={'/cart'}>
                        <div className="relative cursor-pointer">
                            <ShoppingCart size={24} />
                            <span className="text-white w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-1 text-[13px]">0</span>
                        </div>
                    </Link>
                </div>
            </div>


            {/* small devige navigate */}
            <div className="min-[850px]:hidden fixed left-0 bottom-0 w-full border-t border-[#cdcdcf] py-3">
                <div className="w-[90%] mx-auto flex items-center justify-between">
                    <Link className="flex flex-col items-center">
                        <House size={23} className="text-[#505054]" />
                        <p className="text-sm text-[#505054]">Home</p>
                    </Link>


                    <Link className="flex flex-col items-center">
                        <Store size={23} className="text-[#505054]" />
                        <p className="text-sm text-[#505054]">Shop</p>
                    </Link>


                    <Link className="flex flex-col items-center">
                        <ShoppingBasket size={23} className="text-[#505054]" />
                        <p className="text-sm text-[#505054]">Basket</p>
                    </Link>


                    <Link className="flex flex-col items-center">
                        <CircleUser size={23} className="text-[#505054]" />
                        <p className="text-sm text-[#505054]">Profile</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}