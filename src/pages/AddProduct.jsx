// react
import { useState, useEffect } from "react"

// axios
import axios from "axios";



export default function AddProduct() {

    // state
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
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


    // get category
    useEffect(() => {
        const getCategry = async () => {
            try {
                const res = await axios.get('http://localhost:8000/categories')
                setCategory(res.data.categories);
            } catch (error) {
                console.log(error.message);
            }
        }
        getCategry()
    }, []);




    return (
        <div className="w-[66%]">
            <form className="flex items-start justify-between gap-5">

                {/* images */}
                <div className="w-[50%] flex flex-col gap-3">

                    {/* product image mian */}
                    <label className={`w-full h-97 border-2  ${images.length === 0 ? 'border-dashed border-[#bababa] ' : 'border-none'} rounded-lg cursor-pointer" htmlFor="fileInput`}>
                        {images.length === 0 ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500">
                                <p className="text-base font-medium">Upload product photos</p>
                                <p className="text-sm text-gray-400">You can upload up to 5 images</p>
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-lg overflow-hidden cursor-pointer">
                                {images.map((i) => (
                                    <img className="w-full h-full object-cover cursor-pointer" src={URL.createObjectURL(i)} alt="" />
                                ))}
                            </div>
                        )}
                        <input className="hidden" id="fileInput" type="file" multiple accept="image/*" onChange={handleImage} />
                    </label>

                    {/* product images */}
                    <div className={` ${images.length === 0 ? 'hidden' : 'flex items-center justify-between gap-2 p-2 border border-[#bababa] rounded-lg'}`}>
                        {images.map((i) => (
                            <img className="w-14 h-14 rounded-md border cursor-pointer object-cover" src={URL.createObjectURL(i)} alt="" />
                        ))}
                    </div>
                </div>

                {/* data title and others  */}
                <div className="w-[50%] flex flex-col gap-3">

                    {/* tite */}
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Title</p>
                        <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="text" />
                    </label>

                    {/* discription */}
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Description</p>
                        <textarea className="w-full h-30 py-1 px-2 border border-[#bababa] rounded-lg outline-indigo-500"></textarea>
                    </label>


                    <div className="flex items-center justify-center gap-3">
                        {/* price */}
                        <label>
                            <p className="text-sm font-semibold text-gray-700">Price</p>
                            <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" />
                        </label>

                        {/* stock */}
                        <label>
                            <p className="text-sm font-semibold text-gray-700">Stock</p>
                            <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" />
                        </label>
                    </div>

                    {/* discount */}
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Discount %</p>
                        <input className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" />
                    </label>

                    {/* category */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>

                    </div>

                </div>

            </form>
        </div>
    )
}