// react router dom
import { Link, useLocation } from "react-router-dom"


export default function Register() {

    // location
    const location = useLocation();

    return (
        <div className="max-w-[998px] w-[90%] mx-auto flex items-center justify-center">
            <div>
                <div className="flex items-center justify-center gap-5">
                    <Link to={'/auth/login'} className={location.pathname === '/auth/login' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Login</Link>
                    <Link to={'/auth/register'} className={location.pathname === '/auth/register' ? 'text-4xl font-bold' : 'text-4xl text-[#9CA3AF] font-bold'}>Register</Link>
                </div>
            </div>
        </div>
    )
}