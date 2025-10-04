// react rouetr dom
import { Link, Outlet, useNavigate } from "react-router-dom";


// lucide icon
import { CircleUser } from "lucide-react";


// redux
import { useSelector, useDispatch } from "react-redux";
import { logOut } from '../store/feature/userSlice'


// cookie
import Cookies from "js-cookie";


export default function UserLayout() {

    // naviagte
    const navigate = useNavigate();


    // redux
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // log out
    const handleLogOut = () => {
        dispatch(logOut());
        Cookies.remove("token", { path: '/' });
        navigate('/', { replace: true });
    }


    return (
        <div className="max-w-[998px] w-[90%] mx-auto py-8">

            {/* sidebar */}
            <div className="flex flex-col gap-5">
                <div className="w-full flex items-center justify-start">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-200 p-4 rounded-full text-gray-800"><CircleUser /></div>
                        <div className="flex flex-col">
                            <p className="text-sm text-[#9CA3AF]">Welcome back,</p>
                            <p className="text-sm font-semibold">{user ? user.user.email : 'null'}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <div className="w-[31%] border border-[#E5E7EB] rounded-md flex flex-col items-start">
                        <Link to={'/'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                            Dashboard
                        </Link>
                        <Link to={'orders'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                            Orders
                        </Link>
                        <Link to={'dowloads'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                            Downloads
                        </Link>
                        <Link to={'addresses'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                            Addresses
                        </Link>
                        <Link to={'/profile'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                            Account details
                        </Link>
                        <Link to={'wishist'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                            Wishlist
                        </Link>
                        {user.user.role === "admin" ? (
                            <Link to={'addproduct'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                                Add product
                            </Link>
                        ) : null}
                        {user.user.role === "admin" ? (
                            <Link to={'addcategory'} className="w-full p-3 border-b border-[#E5E7EB] font-semibold">
                                Add category
                            </Link>
                        ) : null}
                        <button onClick={handleLogOut} className="p-3 border-b border-[#E5E7EB] font-semibold cursor-pointer text-red-500">
                            Log out
                        </button>
                    </div>
                    {/* outlet */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}