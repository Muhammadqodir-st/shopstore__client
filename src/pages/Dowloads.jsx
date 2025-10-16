// assenst
import e2 from '../assets/e2.gif'
    

export default function Dowloads() {
    return (
        <div className='w-[65%] h-85 flex flex-col items-center justify-center gap-2'>
            <img className='w-35 h-35' src={e2} alt="" />
            <p className='text-lg font-semibold text-[#2ba976]'>No dowloads found.</p>
        </div>
    )
}