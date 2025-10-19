// assenst
import e2 from '../assets/e2.gif'


export default function Addresses() {
    return (
        <div className='w-[65%] h-85 flex flex-col items-center justify-center gap-2 max-[850px]:w-full max-[400px]:h-115'>
            <img className='w-35 h-35' src={e2} alt="" />
            <p className='text-lg font-semibold text-[#2ba976]'>No addresses found.</p>
        </div>
    )
}