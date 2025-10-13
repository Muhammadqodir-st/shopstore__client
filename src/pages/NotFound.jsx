// assets
import n from '../assets/n.svg'

// react rouetr dom
import { Link, useNavigate } from 'react-router-dom'


export default function NotFound() {

    // navigate
    const navigate = useNavigate();


    return (
        <div className='max-w-[998px] w-[90%] mx-auto py-10 flex flex-col gap-4'>
            <img src={n} alt="" />

            <div className='flex flex-col items-center justify-center gap-3'>
                <p className='text-5xl max-[500px]:text-4xl'>Page not found</p>
                <p className='text-sm text-[#6C757D]'>The page you want to go is not currently available</p>
                <div className='flex items-center justify-center gap-4'>
                    <Link to={'/'} className='py-3 px-4 rounded-lg bg-[#634C9F] text-white'>Home Page</Link>
                    <button onClick={() => navigate(-1)} className='py-3 px-6 rounded-lg bg-gray-300 text-gray-900 cursor-pointer'>Back</button>
                </div>
            </div>
        </div>
    )
}