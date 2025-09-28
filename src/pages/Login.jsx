// react router dom
import { Link, useLocation } from "react-router-dom"


export default function Login() {

    // location
    const location = useLocation();

    return (
        <div className="max-w-[998px] w-[90%] h-170 mx-auto flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8 w-full">
                {/* top navogation */}
                <div className="flex items-center justify-center gap-5">
                    <Link to={'/auth/login'} className={location.pathname === '/auth/login' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Login</Link>
                    <Link to={'/auth/register'} className={location.pathname === '/auth/register' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Register</Link>
                </div>

                {/* form data */}
                <form className="flex flex-col gap-4 w-[60%] max-[850px]:w-[90%]">
                    <p className=" text-[#030712] text-center py-2">If you have an account, sign in with your username or email address.</p>
                    {/* username */}
                    <label className="flex flex-col gap-1">
                        <p>Username or email address *</p>
                        <input className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="text" autoFocus required />
                    </label>
                    {/* password */}
                    <label className="flex flex-col gap-1">
                        <p>Password *</p>
                        <input className="w-full rounded-lg border border-[#D1D5DB] p-2 outline-0" type="password" required />
                    </label>
                    <Link to={'/auth/register'} className="text-[#1D4ED8] text-end">Lost your password?</Link>
                    <button type="submit" className="py-3 rounded-lg bg-[#634C9F] text-white cursor-pointer">Log in</button>
                </form>
            </div>
        </div>
    )
}