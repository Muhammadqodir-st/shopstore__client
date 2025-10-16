// react rouetr dom
import { Link } from "react-router-dom"

// licide react
import { Mail, Phone } from "lucide-react"

// assents
import g from '../assets/g.png'
import a from '../assets/a.png'
import f from '../assets/f.svg'
import x from '../assets/x.svg'
import i from '../assets/i.svg'
import l from '../assets/l.svg'


export default function Footer() {
    return (
        <footer className="w-full bg-[#f3f4f6] py-10 mt-7">
            <div className="max-w-[998px] w-[90%] mx-auto">

                {/* top  */}
                <div className="w-full flex items-center justify-between pb-5">
                    {/* text */}
                    <div className="flex flex-col gap-1 max-[870px]:hidden">
                        <p className="text-2xl font-semibold">Join our newsletter for £10 offs</p>
                        <p className="text-sm text-[#6B7280] max-w-90">Register now to get latest updates on promotions & coupons.Don’t worry, we not spam!</p>
                    </div>

                    {/* contact  */}
                    <div className="flex flex-col gap-1 max-[400px]:w-full">
                        <form className="flex items-center justify-between gap-3 bg-white border border-[#D1D5DB] rounded-lg overflow-hidden">
                            <label className="flex items-center gap-2 bg-white px-3 flex-1">
                                <Mail className="text-[#9CA3AF] cursor-pointer" />
                                <input className="outline-0  w-full" type="text" placeholder="Enter your email address" required />
                            </label>
                            <button className="p-3 bg-[#634C9F] text-white cursor-pointer hover:bg-[#7356ba]" type="submit">SEND</button>
                        </form>
                        <p className="text-[12px] text-center">By subscribing you agree to our <Link className="text-[#634C9F]">Terms & Conditions and Privacy & Cookies Policy.</Link></p>
                    </div>
                </div>

                {/* body */}
                <div className="flex justify-between py-10 border-t border-b border-[#D1D5DB] max-[400px]:hidden">

                    {/* left */}
                    <div className="flex flex-col gap-3 max-[980px]:hidden">
                        <p className="text-lg font-semibold">Do You Need Help ?</p>
                        <p className="text-sm text-[#6B7280] max-w-70">Autoseligen syr. Nek diarask fröbomba. Nör antipol kynoda nynat. Pressa fåmoska.</p>
                        <div className="flex items-center gap-3">
                            <Phone size={25} />
                            <div className="flex flex-col">
                                <p className="text-sm text-[#6B7280]">Monday-Friday: 08am-9pm</p>
                                <h3 className=" font-semibold">0 800 300-353</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={25} />
                            <div>
                                <p className="text-sm text-[#6B7280] font-semibold">Need help with your order?</p>
                                <h3 className="font-semibold">info@example.com</h3>
                            </div>
                        </div>
                    </div>

                    {/* center */}
                    <ul className="flex items-center justify-between gap-5 max-[670px]:w-full">
                        <li className="flex flex-col gap-2">
                            <p className="font-semibold">Make Money with Us</p>
                            <ul className="flex flex-col gap-1">
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Sell on Grogin</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Sell Your Services on Grogin</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Sell on Grogin Business</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Sell Your Apps on Grogin</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Become an Affilate</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Advertise Your Products</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Sell-Publish with Us</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Become an Blowwe Vendor</li>
                            </ul>
                        </li>

                        <li className="flex flex-col gap-2">
                            <p className="font-semibold">Let Us Help You</p>
                            <ul className="flex flex-col gap-1">
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Accessibility Statement</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Your Orders</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Returns & Replacements</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Shipping Rates & Policies</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Refund and Returns Policy</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Privacy Policy</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Terms and Conditions</li>
                                <li className="text-[13px] text-[#4B5563] hover:text-black cursor-pointer">Cookie Settings</li>
                            </ul>
                        </li>

                    </ul>

                    {/* right */}
                    <div className="flex flex-col gap-4 max-[670px]:hidden">
                        <p className="font-semibold">Download our app</p>
                        <div className="flex items-center gap-3">
                            <img className="cursor-pointer" src={g} alt="" />
                            <p className="text-sm text-[#6B7280] max-w-30">Download App Get -10% Discount</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <img className="cursor-pointer" src={a} alt="" />
                            <p className="text-sm text-[#6B7280] max-w-30">Download App Get -20% Discount</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-[#4B5563]">Follow us on social media:</p>
                            <div className="flex items-center gap-3">
                                <img className="w-10 cursor-pointer" src={f} alt="facebook" />
                                <img className="w-10 cursor-pointer" src={x} alt="x" />
                                <img className="w-10 cursor-pointer" src={i} alt="instagram" />
                                <img className="w-10 cursor-pointer" src={l} alt="l" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* bottom */}
                <div className="flex items-center justify-between pt-5 max-[1070px]:flex-col-reverse gap-2">
                    <p className="text-sm text-[12px] text-center">Copyright 2025 © Shopstore WooCommerce WordPress Theme. All right reserved. Powered by <Link className="text-indigo-500 ">BlackRise Themes</Link>.</p>
                    <div className="flex items-center gap-3 max-[400px]:hidden">
                        <p className="text-sm underline cursor-pointer text-[12px]">Terms and Conditions</p>
                        <p className="text-sm underline cursor-pointer text-[12px]">Privacy Policy</p>
                        <p className="text-sm underline cursor-pointer text-[12px]">Order Tracking</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}