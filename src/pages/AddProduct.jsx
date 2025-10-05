// react
import { useState } from "react"


export default function AddProduct() {

    // state
    const [images, setImages] = useState([]);


    // handleImage
    const handleImage = (e) => {
        const files = Array.from(e.target.files)

        if (files.length > 5) {
            alert("You can only take up to 5 pictures!")
            e.target.value = ""
            return;
        }

        setImages(files)
    }


    return (
        <div className="w-[66%]">
            <form className="flex items-start justify-between gap-5">

                {/* images */}
                <div className="flex flex-col gap-3">
                    <label className={`w-90 h-100 border-2  ${images.length === 0 ? 'border-dashed border-[#bababa] ' : 'border-none'} rounded-lg cursor-pointer" htmlFor="fileInput`}>
                        <div className="w-full h-full rounded-lg overflow-hidden cursor-pointer">
                            {images.map((i) => (
                                <img className="w-full h-full object-cover cursor-pointer" src={URL.createObjectURL(i)} alt="" />
                            ))}
                        </div>
                        <input className="hidden" id="fileInput" type="file" multiple accept="image/*" onChange={handleImage} />
                    </label>
                    <div className={` ${images.length === 0 ? 'hidden' : 'flex items-center gap-2 p-2 border border-[#bababa] rounded-lg'}`}>
                        {images.map((i) => (
                            <img className="w-15 h-15 rounded-md border cursor-pointer object-cover" src={URL.createObjectURL(i)} alt="" />
                        ))}
                    </div>
                </div>

                {/* data title and others  */}
                <div className="flex-1 flex flex-col gap-3">
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Title</p>
                        <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="text" />
                    </label>

                    <label>
                        <p className="text-sm font-semibold text-gray-700">Description</p>
                        <textarea className="w-full h-30 py-1 px-2 border border-[#bababa] rounded-lg outline-indigo-500"></textarea>
                    </label>

                    <label>
                        <p className="text-sm font-semibold text-gray-700">Price</p>
                        <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" />
                    </label>

                    <label>
                        <p className="text-sm font-semibold text-gray-700">Stock</p>
                        <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" />
                    </label>

                    <label>
                        <p className="text-sm font-semibold text-gray-700">Discount %</p>
                        <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" />
                    </label>
                </div>

            </form>
        </div>
    )
}