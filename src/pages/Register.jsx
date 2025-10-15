// react router dom
import { Link, useLocation, useNavigate } from "react-router-dom"

// react
import {  useState } from "react";

// axios
import axios from "axios";

// loader or message
import toast from "react-hot-toast";


export default function Register() {

    // location
    const location = useLocation();

    // navigate
    const navigate = useNavigate();


    // states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [loading, setLoading] = useState(false);


    // register
    const handleRegister = async (e) => {
        // refresh oldini olish 
        e.preventDefault();
        setLoading(true)

        // xatolarni tutub olish 
        try {
            const res = await axios.post('http://localhost:8000/register', {
                name: name,
                email: email,
                password: password,
                role: role
            }, { withCredentials: true });

            toast.success(res.data.message);

            if (res.data.success) {
                setTimeout(() => {
                    setLoading(false)
                    navigate('/');
                    window.location.reload();
                }, 2500);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'error!');
            } else {
                toast.error("Server error!");
            }
            setLoading(false);
        }
    }







    return (
        <div className="max-w-[998px] w-[90%] h-190 mx-auto flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8 w-full">
                {/* top navogation */}
                <div className="flex items-center justify-center gap-5">
                    <Link to={'/auth/login'} className={location.pathname === '/auth/login' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Login</Link>
                    <Link to={'/auth/register'} className={location.pathname === '/auth/register' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Register</Link>
                </div>

                {/* form data */}
                <form onSubmit={handleRegister} className="flex flex-col gap-4 w-[60%] max-[850px]:w-[90%]">
                    <p className=" text-[#030712] text-center py-2 max-[850px]:text-sm">There are many advantages to creating an account: the payment process is faster, shipment tracking is possible and much more.</p>
                    {/* username */}
                    <label className="flex flex-col gap-1">
                        <p className="max-[850px]:text-sm">Username *</p>
                        <input onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="text" autoFocus required />
                    </label>
                    {/* email */}
                    <label className="flex flex-col gap-1">
                        <p className="max-[850px]:text-sm">Email address *</p>
                        <input onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="email" required />
                    </label>
                    {/* password */}
                    <label className="flex flex-col gap-1">
                        <p className="max-[850px]:text-sm">Password *</p>
                        <input onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="password" required />
                    </label>

                    {/* role */}
                    <div className="flex flex-col gap-1">
                        <label className="flex items-center gap-1">
                            <input type="radio" onChange={(e) => setRole(e.target.value)} value="customer" checked={role === "customer"} />
                            <p className="text-sm text-[]">I am a customer</p>
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" onChange={(e) => setRole(e.target.value)} value="vendor" checked={role === "vendor"} />
                            <p className="text-sm text-[]">I am a vendor</p>
                        </label>
                    </div>

                    {/* police */}
                    <p className="text-sm">Your personal data will be used to support your experience throughout this
                        website, to manage access to your account, and for other purposes described in our <Link className="text-[#634C9F]">privacy policy</Link>.</p>

                    {/* submit btn */}
                    <button type="submit" className="py-3 rounded-lg bg-[#634C9F] text-white cursor-pointer flex items-center justify-center">
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}