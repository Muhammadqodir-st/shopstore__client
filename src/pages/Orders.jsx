// assenst
import e2 from '../assets/e2.gif'

// redux
import { useSelector } from 'react-redux'


export default function Orders() {

    // orders
    const order = useSelector((state) => state.order)

    return (
        <div className='w-[65%]  max-[850px]:w-full'>
            {order?.length === 0 ? (
                <div className='w-full h-85 flex flex-col items-center justify-center gap-2'>
                    <img className='w-35 h-35' src={e2} alt="" />
                    <p className='text-lg font-semibold text-[#2ba976]'>No orders found.</p>
                </div>
            ) : (
                <div>
                    {order.order.map((i) => (
                        <div className='border py-3' key={i._id}>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}