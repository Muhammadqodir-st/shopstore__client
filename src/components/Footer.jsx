// react rouetr dom
import { Link } from "react-router-dom"

// licide react
import { Mail } from "lucide-react"

export default function Footer() {
    return (
        <div className="w-full bg-[#f3f4f6]">
            <div className="max-w-[998px] w-[90%] mx-auto">

                {/* top  */}
                <div>
                    {/* text */}
                    <div>
                        <p className="">Join our newsletter for £10 offs</p>
                        <p>Register now to get latest updates on promotions & coupons.Don’t worry, we not spam!</p>
                    </div>

                    {/* contact  */}
                    <div>
                        <form>
                            <label>
                                <Mail />
                            </label>
                            <button type="submit">SEND</button>
                        </form>
                        <p>By subscribing you agree to our <Link>Terms & Conditions and Privacy & Cookies Policy.</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}