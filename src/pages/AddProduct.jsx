// react
import { useState, useEffect } from "react"

// axios
import axios from "axios";

// redux 
import { useSelector } from "react-redux";

// react router dom
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



export default function AddProduct() {

    // navigate
    const navigate = useNavigate();

    // user id
    const { user } = useSelector((state) => state.user);


    // state
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);


    // handleImage
    const handleImage = (e) => {
        const files = Array.from(e.target.files)

        if (files.length > 3) {
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


    // create product
    const handleProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // form data
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('stock', stock)
            formData.append('discountPercent', discount)
            formData.append('category', selectedCategory)
            formData.append('createdBy', user.user._id);

            images.forEach((file) => {
                formData.append("images", file)
            })

            const res = await axios.post('http://localhost:8000/products', formData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })

            toast.success(res.data.message);

            if (res.data.success) {
                setTimeout(() => {
                    setLoading(false)
                    navigate('/');
                    window.location.reload();
                }, 2500);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'error!')
            } else {
                toast.error("Server error!")
            }
            setLoading(false);
        }
    }



    return (
        <div className="w-[66%] max-[850px]:w-full">
            <form onSubmit={handleProduct} className="flex items-start justify-between gap-5 max-[620px]:flex-col">

                {/* images */}
                <div className="w-[50%] flex flex-col gap-3 max-[620px]:w-full">

                    {/* product image mian */}
                    <label className={`w-full h-97 border-2  ${images.length === 0 ? 'border-dashed border-[#bababa] ' : 'border-none'} rounded-lg cursor-pointer" htmlFor="fileInput`}>
                        {images.length === 0 ? (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500">
                                <p className="text-base font-medium">Upload product photos</p>
                                <p className="text-sm text-gray-400">You can upload up to 3 images</p>
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-lg overflow-hidden cursor-pointer">
                                {images.map((i, key) => (
                                    <img key={key} className="w-full h-full object-cover cursor-pointer" src={URL.createObjectURL(i)} alt="" />
                                ))}
                            </div>
                        )}
                        <input className="hidden" id="fileInput" type="file" multiple accept="image/*" onChange={handleImage} required />
                    </label>

                    {/* product images */}
                    <div className={` ${images.length === 0 ? 'hidden' : 'flex items-center justify-between gap-2 p-2 border border-[#bababa] rounded-lg'}`}>
                        {images.map((i, key) => (
                            <img key={key} className="w-14 h-14 rounded-md border cursor-pointer object-cover" src={URL.createObjectURL(i)} alt="" />
                        ))}
                    </div>
                </div>

                {/* data title and others  */}
                <div className="w-[50%] flex flex-col gap-3 max-[620px]:w-full">

                    {/* tite */}
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Title</p>
                        <input onChange={(e) => setTitle(e.target.value)} className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="text" required />
                    </label>

                    {/* description */}
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Description</p>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="w-full h-30 py-1 px-2 border border-[#bababa] rounded-lg outline-indigo-500" required></textarea>
                    </label>


                    <div className="flex items-center justify-center gap-3 max-[620px]:justify-between">
                        {/* price */}
                        <label>
                            <p className="text-sm font-semibold text-gray-700">Price</p>
                            <input onChange={(e) => setPrice(e.target.value)} className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" required />
                        </label>

                        {/* stock */}
                        <label>
                            <p className="text-sm font-semibold text-gray-700">Stock</p>
                            <input onChange={(e) => setStock(e.target.value)} className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" required />
                        </label>
                    </div>

                    {/* discount */}
                    <label>
                        <p className="text-sm font-semibold text-gray-700">Discount %</p>
                        <input onChange={(e) => setDiscount(e.target.value)} className="w-full py-3 px-2 border border-[#bababa] rounded-lg outline-indigo-500" type="number" required />
                    </label>

                    {/* category */}
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {category.length > 0 ? (
                                category.map((c) => (
                                    <button type="button" className={`py-1 px-3  rounded-lg text-white text-[14px] cursor-pointer truncate ${selectedCategory === c._id ? 'bg-[#0b1f85]' : 'bg-[#4c64d9]'}`} key={c._id} onClick={() => setSelectedCategory(c._id)}>{c.name}</button>
                                ))
                            ) : (
                                <p>Loading ....</p>
                            )}
                        </div>
                    </div>

                    {/* submit buttn */}
                    <button className="py-2 px-4 bg-[#0b1f85] hover:bg-[#041050] rounded-lg text-white cursor-pointer flex items-center justify-center" type="submit">
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : "create product"}
                    </button>
                </div>

            </form>
        </div>
    )
}