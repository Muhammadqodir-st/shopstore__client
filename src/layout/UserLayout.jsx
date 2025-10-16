// react rouetr dom
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";


// lucide icon
import { ListOrdered, Download, MapPinHouse, UserCog, Plus, ChartBarStacked } from "lucide-react";


// redux
import { useSelector, useDispatch } from "react-redux";
import { logOut } from '../store/feature/userSlice'


// cookie
import Cookies from "js-cookie";


// react
import { useState } from "react";


export default function UserLayout() {

    // state
    const [modal, setModal] = useState(false)

    // naviagte
    const navigate = useNavigate();
    const location = useLocation()


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
        <div className="max-w-[998px] w-[90%] mx-auto py-5">

            {/* sidebar */}
            <div className="">
                <div className="flex items-start gap-5">
                    <div className="w-[31%] sticky top-25 border border-[#E5E7EB] rounded-md flex flex-col items-start">
                        <Link to={'/profile'} className={`w-full p-3 border-b border-[#E5E7EB] flex items-center gap-2 ${location.pathname === '/profile' ? 'text-indigo-600' : ''}`}>
                            <ListOrdered size={20} />
                            Orders
                        </Link>
                        <Link to={'dowloads'} className={`w-full p-3 border-b border-[#E5E7EB] flex items-center gap-2 ${location.pathname === '/profile/dowloads' ? 'text-indigo-600' : ''}`}>
                            <Download size={20} />
                            Downloads
                        </Link>
                        <Link to={'addresses'} className={`w-full p-3 border-b border-[#E5E7EB] flex items-center gap-2 ${location.pathname === '/profile/addresses' ? 'text-indigo-600' : ''}`}>
                            <MapPinHouse size={20} />
                            Addresses
                        </Link>
                        <Link to={'accound'} className={`w-full p-3 border-b border-[#E5E7EB] flex items-center gap-2 ${location.pathname === '/profile/accound' ? 'text-indigo-600' : ''}`}>
                            <UserCog size={20} />
                            Account details
                        </Link>
                        {user?.user?.role === "admin" && (
                            <Link to={'addproduct'} className={`w-full p-3 border-b border-[#E5E7EB] flex items-center gap-2 ${location.pathname === '/profile/addproduct' ? 'text-indigo-600' : ''}`}>
                                <Plus size={20} />
                                Add product
                            </Link>
                        )}
                        <button onClick={() => setModal(true)} className="p-3 border-b border-[#E5E7EB] cursor-pointer text-red-500">
                            Log out
                        </button>
                    </div>
                    {/* outlet */}
                    <Outlet />
                </div>
            </div>


            {/* logOut modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10000 transition-all">
                    <div className="bg-white rounded-2xl w-[90%] sm:w-[360px] p-6 shadow-2xl transform scale-100 animate-fadeIn">
                        <div className="flex flex-col items-center">
                            {/* icon */}
                            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1" />
                                </svg>
                            </div>


                            {/* text */}
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Log out of your account?</h2>
                            <p className="text-sm text-gray-500 mb-6 text-center"> You can always log back in at any time.</p>



                            {/* buttons */}
                            <div className="flex gap-4 w-full">
                                <button onClick={() => setModal(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                    Cancel
                                </button>
                                <button onClick={handleLogOut} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 shadow-md transition cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}