// react router dom
import { Link, useLocation, useNavigate } from "react-router-dom"

// axios
import axios from "axios";

// react
import { useEffect, useState, } from "react";

// loader or message
import toast from "react-hot-toast";

export default function Login() {

    // navigate
    const navigate = useNavigate();

    // location
    const location = useLocation();

    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // login
    const handleLogin = async (e) => {
        // refresh oldini olish 
        e.preventDefault();
        setLoading(true)

        // xatoni tutib olish
        try {
            const res = await axios.post('https://shopstore-server.onrender.com/login', {
                email: email,
                password: password
            }, { withCredentials: true });

            toast.success(res.data.message)

            if (res.data.success) {
                setTimeout(() => {
                    setLoading(false)
                    // navigate('/');
                    // window.location.reload()
                }, 2500)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "error!");
            } else {
                toast.error("Server error!")
            }
            setLoading(false);
        }
    }

    return (
        <div className="max-w-[998px] w-[90%] h-170 mx-auto flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8 w-full">
                {/* top navogation */}
                <div className="flex items-center justify-center gap-5">
                    <Link to={'/auth/login'} className={location.pathname === '/auth/login' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Login</Link>
                    <Link to={'/auth/register'} className={location.pathname === '/auth/register' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Register</Link>
                </div>

                {/* form data */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-[60%] max-[850px]:w-[90%]">
                    <p className=" text-[#030712] text-center py-2">If you have an account, sign in with your username or email address.</p>
                    {/* username */}
                    <label className="flex flex-col gap-1">
                        <p>Email address *</p>
                        <input onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="text" autoFocus required />
                    </label>
                    {/* password */}
                    <label className="flex flex-col gap-1">
                        <p>Password *</p>
                        <input onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="password" required />
                    </label>
                    <Link to={'/auth/register'} className="text-[#1D4ED8] text-end">Lost your password?</Link>
                    {/*  */}
                    <button type="submit" className="py-3 rounded-lg bg-[#634C9F] text-white cursor-pointer flex items-center justify-center">
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}