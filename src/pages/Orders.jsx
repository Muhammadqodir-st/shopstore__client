// assenst
import e2 from '../assets/e2.gif'

// redux
import { useSelector } from 'react-redux'


export default function Orders() {

    // orders
    const { order } = useSelector((state) => state.order);


    return (
        <div className='w-[65%]  max-[850px]:w-full'>
            {order?.length === 0 ? (
                <div className='w-full h-85 flex flex-col items-center justify-center gap-2'>
                    <img className='w-35 h-35' src={e2} alt="" />
                    <p className='text-lg font-semibold text-[#2ba976]'>No orders found.</p>
                </div>
            ) : (
                <div className='flex flex-col gap-3'>
                    {order?.map((i) => (
                        <div key={i?._id} className='bg-white rounded-2xl p-3 border border-gray-100 flex flex-col gap-3'>
                            {/* header */}
                            <div className='flex items-center justify-between '>
                                <p className='text-lg font-semibold text-gray-800'>Order #{i?._id?.slice(0, 6)}</p>
                                <button className='py-1 px-3 cursor-pointer text-green-700 font-medium bg-green-100 rounded-full'>Delivered</button>
                            </div>

                            {/* body */}
                            <div className='border-t border-gray-100 py-3 flex flex-col gap-4'>
                                {i.products.map((i) => (
                                    <div key={i?._id} className="flex items-satrt gap-4">
                                        <img src={`http://localhost:8000/uploads/${i.product.mainImage}`} alt="Product" className="w-16 h-16 rounded-md object-cover border border-gray-100" />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{i.product.title}</p>
                                            <p className="text-sm text-gray-600 font-semibold">${i.product.discountedPrice}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* bottom */}
                            <div className="border-t border-gray-100 py-3 flex flex-col gap-1">
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <p> Name:</p>
                                    <p className="font-medium">{i.firstName + ' ' + i.lastName}</p>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <p>User email:</p>
                                    <p className="font-medium">muhammadqodirov3609@gmail.com</p>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <p>Order delivery date:</p>
                                    <p className="font-medium">2 day</p>
                                </div>
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <p>Shipping Address:</p>
                                    <p className="text-right font-medium">{i.state}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 flex justify-between items-center py-3">
                                <p className="text-gray-600 font-medium">Total:</p>
                                <p className="text-lg font-bold text-gray-900">${i.totalPrice}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}