// react
import { useState } from "react";
import toast from "react-hot-toast";


export default function CheckOut({ onSubmit }) {

    const uzbRegions = [
        { code: "AN", name: "Andijon viloyati" },
        { code: "BU", name: "Buxoro viloyati" },
        { code: "FA", name: "Farg‘ona viloyati" },
        { code: "JI", name: "Jizzax viloyati" },
        { code: "NG", name: "Namangan viloyati" },
        { code: "NW", name: "Navoiy viloyati" },
        { code: "QA", name: "Qashqadaryo viloyati" },
        { code: "QR", name: "Qoraqalpog‘iston Respublikasi" },
        { code: "SA", name: "Samarqand viloyati" },
        { code: "SI", name: "Sirdaryo viloyati" },
        { code: "SU", name: "Surxondaryo viloyati" },
        { code: "TO", name: "Toshkent viloyati" },
        { code: "TV", name: "Toshkent shahri" },
        { code: "XO", name: "Xorazm viloyati" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries());
        if (!data.firstName || !data.lastName || !data.state || !data.city || !data.street || !data.phone || !data.email) {
            toast.error('Please fill in all fields!')
            return;
        }
        onSubmit(data);
    }

    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-5">
                <label className="flex-1 flex flex-col gap-1">
                    <p className="text-sm cursor-pointer">First name *</p>
                    <input name="firstName" className="w-full border border-[#D1D5DB] rounded-lg outline-0 p-2" type="text" required />
                </label>
                <label className="flex-1 flex flex-col gap-1">
                    <p className="text-sm cursor-pointer">Last name *</p>
                    <input name="lastName" className="w-full border border-[#D1D5DB] rounded-lg outline-0 p-2" type="text" required />
                </label>
            </div>
            <label className="w-full flex flex-col gap-1">
                <p className="text-sm cursor-pointer">State *</p>
                <select className="w-full border border-[#D1D5DB] rounded-lg  p-3" name="state" required>
                    {uzbRegions.map((i, index) => (
                        <option key={index} value={`${i.name}`} required>{i.name}</option>
                    ))}
                </select>
            </label>
            <label className="w-full flex flex-col gap-1">
                <p className="text-sm cursor-pointer">Town / City *</p>
                <input name="city" className="w-full border border-[#D1D5DB] rounded-lg outline-0  p-2" type="text" required />
            </label>
            <label className="w-full flex flex-col gap-1">
                <p className="text-sm cursor-pointer">Street address *</p>
                <input name="street" className="w-full border border-[#D1D5DB] rounded-lg outline-0  p-2" type="text" placeholder="House number and street name" required />
            </label>
            <label className="w-full flex flex-col gap-1">
                <p className="text-sm cursor-pointer">Phone *</p>
                <input name="phone" className="w-full border border-[#D1D5DB] rounded-lg outline-0  p-2" type="number" required />
            </label>
            <label className="w-full flex flex-col gap-1">
                <p className="text-sm cursor-pointer">Email address *</p>
                <input name="email" className="w-full border border-[#D1D5DB] rounded-lg outline-0  p-2" type="email" required />
            </label>
            <button type="submit" id="order" className="hidden"></button>
        </form>
    )
}