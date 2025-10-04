// assenst
import empty from '../assets/empty.svg'


export default function Orders(){
    return(
        <div className='w-[65%] flex flex-col items-center justify-center gap-2'>
            <img className='h-100' src={empty} alt="" />
            <p className='text-3xl font-semibold'>empty</p>
        </div>
    )
}