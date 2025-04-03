"use client"
import * as React from "react"
import Navbar from "../_componants/Navbar"
import Image from "next/image"
import { IoPersonSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

 function page() {
  const { t, i18n } = useTranslation();

  return (
    <>
        <Navbar className=" text-black" />
   <div className="parent  flex justify-center">
    <div className="container py-[80px] flex flex-col items-center">
    {/* <div className="head_shop p-[80px] w-[1200px] text-black rounded-[20px] bg-linear-[(--shop)] flex flex-col items-center">

<h1 className='text-[18px] text-blue-500 font-medium text-center uppercase'>Contact Us</h1>
<p className=' text-[60px] font-semibold text-center '>Get in touch with for <br />
<span>Any information</span></p>
</div> */}

<div className="two flex max-md:flex-col-reverse max-md:px-[30px] max-md:py-[20px] gap-[40px] px-[10px]  w-full justify-around items-center" >
  <div className="image relative w-fit ttte">
    <Image src={"/contact2.jpg"} className="rounded-[30px]" style={{filter:"brightness(0.7)"}} alt="" width={500} height={900} />
    <div className="text absolute text-white bottom-0 px-[25px] py-[30px]  w-full rounded-br-[20px] rounded-bl-[20px] z-10">
      <div className="logo mb-[10px]  w-[50px] h-[50px] flex justify-center items-center   text-black rounded-full bg-white">
<IoPersonSharp size={25} />
      </div>
      <h1 className="text-[30px]  font-semibold pb-[5px]">{t("contact_head")}</h1>
      <p className="text-[16px] text-gray-200 w-[80%]">{t("contact_par")}</p>
    </div>
  </div>
  <div className="form w-[40%] flex-col flex gap-[20px] max-md:w-full max-xl:w-[70%]">
    <div className="Name flex gap-[30px] max-md:flex-col">
      <div className="t1 flex flex-col gap-[15px] basis-1/2">
      <label htmlFor="first" className="font-semibold">{t("first")}</label>
      <input placeholder="First Name" id="first" className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" type="text" name="first"  />
      </div>
      <div className="t2 flex-col flex gap-[15px] basis-1/2">
      <label  htmlFor="last" className="font-semibold">{t("last")}</label>
      <input placeholder="Last Name" id="last" className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" type="text" name="last"  />
      </div>
    </div>
    <div className="email flex flex-col gap-[15px]">
    <label htmlFor="email" className="font-semibold">{t("email")}  <span className="text-red-400">*</span></label>
    <input placeholder="Your Email" id="email" className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" type="email" name="email"  />
    </div>
    <div className="phone flex-col flex gap-[15px]">
    <label htmlFor="phone" className="font-semibold">{t("phone")}  <span className="text-red-400">*</span></label>
    <input placeholder="Phone Number" id="phone" className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" type="text" name="email"  />
    </div>
    <div className="massege flex flex-col gap-[15px]">
    <label htmlFor="massege" className="font-semibold">{t("Massege")} <span className="text-red-400">*</span></label>
    <textarea
    id="massege"
className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    rows={4}
    placeholder="Enter your massege here..."
  ></textarea>
    </div>
    <div className="button">
    <a
  className="inline-block rounded-sm w-full text-center bg-[#19376D] px-8 py-5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
>
  {t("send")}
</a>
    </div>
  </div>
</div>
    </div>
   </div>



 
   </>
  )
}
export default page
