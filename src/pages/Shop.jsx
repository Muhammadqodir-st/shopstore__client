// axios
import axios from "axios"

// react
import { useEffect, useState } from "react"

// assest
import s from '../assets/s.png'


// lucide react
import { MoveRight, Search } from "lucide-react";

// react-router-dom
import { useNavigate, useParams } from "react-router-dom";





export default function Shop() {

    // navigate
    const naviagte = useNavigate();

    // states
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState(null)

    const { categoryId } = useParams();



    // get category
    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get('http://localhost:8000/categories', { withCredentials: true })
                setCategories(res.data.categories)
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);

    // get products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const url = categoryId ? `http://localhost:8000/products?category=${categoryId}` : 'http://localhost:8000/products?category'
                const res = await axios.get(url)
                setProducts(res.data.products)
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [categoryId])


    const handleCategoryClick = (id) => {
        if (id) {
            naviagte(`/shop/${id}`)
        } else {
            naviagte('/shop')
        }
    }


    return (
        <div className="max-w-[998px] w-[90%] mx-auto">
            <div className="flex justify-between gap-5">

                {/* fileter */}
                <div className="flex flex-col gap-3">
                    <p className="text-lg font-bold">Product Categories</p>
                    <div className="flex flex-col gap-1">
                        {/* all category  */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input className="input" name="input" checked={!categoryId} onChange={() => handleCategoryClick(null)} type="checkbox" />
                            <p className={`${!categoryId ? 'text-[#7764d8] font-semibold' : ''}`}>All products</p>
                        </label>
                        {/* filter category */}
                        {categories.map((i) => (
                            <label className="flex items-center gap-2 cursor-pointer" key={i._id}>
                                <input className="input" name="input" checked={categoryId === i._id} onChange={() => handleCategoryClick(i._id)} type="checkbox" />
                                <p className={`${selectCategory === i._id || categoryId === i._id ? 'text-[#7764d8] font-semibold' : ''}`}>{i.name}</p>
                            </label>
                        )).reverse()}
                    </div>
                </div>


                {/* product */}
                <div className="w-[78%] flex flex-col gap-3">

                    {/* search */}
                    <label className="w-full py-[7px] px-3 rounded-xl border border-indigo-700 flex items-center justify-between gap-3">
                        <input className="flex-1 outline-0" type="text" />
                        <Search className="text-indigo-700 cursor-pointer" strokeWidth={1.55} size={22} />
                    </label>

                    {/* banner */}
                    <div className="relative rounded-lg overflow-hidden">
                        <img src={s} alt="" />
                        <div className="absolute w-full h-full p-5 top-0 flex flex-col gap-2">
                            <button className="w-fit px-2 py-1 rounded-full text-[11px] text-[#7C2D12] bg-[#FFEDD5]">Only This Week</button>
                            <p className="max-w-100 text-3xl font-bold">Grocery store with different treasures</p>
                            <button className="w-fit flex items-center justify-center gap-3 py-2 px-4 bg-white rounded-full text-sm border border-[#E5E7EB] cursor-pointer font-semibold">Shop Now <MoveRight size={18} /></button>
                        </div>
                    </div>

                    {/* products */}
                    <div className="flex flex-col gap-3">
                        {products.length === 0 ? (
                            <p>no product</p>
                        ) : (
                            products.map((i) => (
                                <div key={i._id} className="">
                                    <p>{i.title}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}