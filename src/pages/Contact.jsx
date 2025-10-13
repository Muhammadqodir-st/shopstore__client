// lucide icons
import { MapPin } from "lucide-react"

// data
import { cardSlice } from '../data/data'


export default function Contact() {
    return (
        <div className="max-w-[998px] w-[90%] mx-auto flex flex-col gap-3 py-10">
            <p className="text-center font-semibold max-[600px]:hidden">Contact With Us</p>
            <p className="text-5xl text-center font-semibold max-[600px]:hidden">You can ask us questions</p>
            <p className="max-w-130 text-center mx-auto text-sm text-[#030712] max-[600px]:hidden">Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.</p>

            <div className="flex items-start gap-8 py-10 max-[1000px]:flex-col">

                {/* texts */}
                <div className="w-[50%] flex flex-col max-[1000px]:w-full">
                    <p className="text-xl font-semibold">Our Offices</p>
                    <p className="text-[12px] text-[#4B5563]">On dekande mydurtad mora även om skurkstat. Semirade timaheten rena. Radiogen pasam inte loba även om prerade i garanterad traditionell specialitet till bebel. Ev is sönde. Tun gps-väst att epiligt. Diliga tresk dira. Ens biov dijevis.</p>

                    {/* loacations */}
                    <div className="flex items-start gap-5 py-10 max-[400px]:flex-col">
                        <div className="flex items-start gap-2">
                            <div><MapPin size={20} className="text-[#030712]" /></div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <p className="text-sm text-[#030712]">United States</p>
                                    <p className="text-lg font-semibold max-[500px]:text-[16px]">United States Office</p>
                                    <p className="text-[12px] text-[#4B5563] max-[500px]:text-[8px]">205 Middle Road, 2nd Floor, New York</p>
                                </div>

                                <div className="flex flex-col ">
                                    <p className="text-lg font-semibold">+02 1234 567 88</p>
                                    <p className="text-[#2563EB] cursor-pointer">info@example.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div><MapPin size={20} className="text-[#030712]" /></div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <p className="text-sm text-[#030712]">Munich</p>
                                    <p className="text-lg font-semibold max-[500px]:text-[16px]">Munich States Office</p>
                                    <p className="text-[12px] text-[#4B5563] max-[500px]:text-[8px]">205 Middle Road, 2nd Floor, New York</p>
                                </div>

                                <div className="flex flex-col ">
                                    <p className="text-lg font-semibold max-[500px]:text-[16px]">+5 456 123 22</p>
                                    <p className="text-[#2563EB] cursor-pointer max-[500px]:text-[16px]">contact@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* data */}
                <div className="w-[50%] flex flex-col gap-3 max-[1000px]:w-full">
                    <p className="text-[12px] text-[#6B7280]">On dekande mydurtad mora även om skurkstat. Semirade timaheten rena. Radiogen pasam inte loba även om prerade i garanterad traditionell specialitet till bebel.</p>
                    <form className="w-full flex flex-col gap-4">
                        <div className="w-full flex items-center justify-between gap-5">
                            <label className="flex-1">
                                <p className="">Your name *</p>
                                <input className="w-full p-2 rounded-lg outline-0 border border-[#D1D5DB]" type="text" required />
                            </label>

                            <label className="flex-1">
                                <p className="">Your email *</p>
                                <input className="w-full p-2 rounded-lg outline-0 border border-[#D1D5DB]" type="email" required />
                            </label>
                        </div>
                        <label className="w-full">
                            <p className="">Subject *</p>
                            <input className="w-full py-3 px-2   rounded-lg outline-0 border border-[#D1D5DB]" type="text" required />
                        </label>

                        <label className="w-full">
                            <p className="">Your message</p>
                            <textarea className="w-full border border-[#D1D5DB] rounded-lg outline-0 p-2 h-25"></textarea>
                        </label>

                        <button type="submit" className="w-fit py-3 px-5 bg-[#634C9F] text-white rounded-lg cursor-pointer">Send Message</button>
                    </form>
                </div>
            </div>


            {/* slide cards */}
            <div className="w-full flex items-center justify-between gap-3 overflow-x-auto">
                {cardSlice.map((i, key) => (
                    <div key={key} className="flex items-center justify-between gap-5 flex-shrink-0">
                        <img className="w-12 h-12" src={i.image} alt="" />
                        <div>
                            <p className="text-sm font-semibold">{i.title}</p>
                            <p className="max-w-45 text-[10px] text-[#6B7280]">{i.descripton}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}