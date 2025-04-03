"use client"


import React, { useContext, useEffect, useState } from 'react'
import Buttons from './_small-comps/Buttons'
import Image from 'next/image'
import Link from 'next/link'
import { FaLongArrowAltRight } from "react-icons/fa";
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config'
import { Provider } from '../_context/Context'
import { t } from 'i18next'

function Categories() {
    const data = useContext(Provider)
    const [cateogries , SetCategories]:any = useState([])
    useEffect(() => {
const getCategories = async () => {
    const data = (await getDocs(collection(db,"products"))).forEach((doc:any) => {
        cateogries.push(doc.data())
        SetCategories(cateogries)
            })
    return data
}

return () => {
    getCategories()

}
},[data])
  return (
   <div className="parent relative p-parent2 overflow-hidden max-md:px-[55px] max-md:py-[80px]">
          <h1 className='teeeeee'>Sefoo</h1>
    <div className="container flex justify-between items-center max-xl:flex-col max-xl:gap-[45px]">
        <div className="text  flex flex-col items-start max-md:items-center max-xl:text-center">
            <h1 className='text-[70px] font-semibold leading-[80px] mb-[5px] max-md:text-[55px] max-md:leading-[60px] max-xl:text-nowrap'>{t("categories_sec").split(" ").slice(0,1).join(" ")} 
                <span className='block'> {t("categories_sec").split(" ").slice(1,3).join(" ")}</span></h1>
            <p className='w-[300px] text-[19px] mb-[25px] text-[#6e6e6e]'>{t("categories_sec_par")}</p>
            <Buttons Name={t("explore")} isfill={true}  className='hover:text-black px-[40px] py-[15px] rounded-md'/>
        </div>
        <div className="images grid grid-cols-2 gap-[10px] max-xl:grid-cols-1">
           <Link href={"/"} className='big-cate w-full h-[220px]'>
           <Image src={"/category/headphone"} alt='' width={400} height={400} className='cate h-full w-full rounded-xl object-cover' />
           <div className="text">
            <h1>Headphones</h1>
            <p>{cateogries?.filter((e:any) => e.category.toLowerCase() === "headphone").length} {t("products")}</p>
            <span  className='explore flex items-center gap-[5px] text-white'>{t("explore")} <FaLongArrowAltRight /></span>
           </div>
           </Link>
<Link href={"/category/pc"} className='big-cate w-full h-[220px]'>
<Image src={"/pc.jpg"} alt='' width={400} height={400} className='cate h-full w-full rounded-xl object-cover' />
<div className="text">
            <h1>PC</h1>
            <p>{cateogries?.filter((e:any) => e.category.toLowerCase() === "pc").length} {t("products")}</p>
            <span  className='explore flex items-center gap-[5px] text-white'>{t("explore")} <FaLongArrowAltRight /></span>
           </div>
</Link>           
<Link href={"/"} className='big-cate md:col-span-2 w-full h-[400px] max-md:h-[220px]'>
<Image src={"/laptopview.jpg"} alt='' width={400} height={400} className='cate h-full w-full rounded-xl object-cover' />
<div className="text">
            <h1 className='text-[60px]'>Laptop</h1>
            <p>{cateogries?.filter((e:any) => e.category.toLowerCase() === "laptop").length} {t("products")}</p>
            <span  className='explore flex items-center gap-[5px] text-white'>{t("explore")} <FaLongArrowAltRight /></span>
           </div>
</Link>
<Link href={"/"} className='big-cate w-full h-[220px]'>
<Image src={"/console.jpg"} alt='' width={400} height={400} className='cate h-full w-full rounded-xl object-cover' />
<div className="text">
            <h1>Console</h1>
            <p>{cateogries?.filter((e:any) => e.category.toLowerCase() === "console").length} {t("products")}</p>
            <span  className='explore flex items-center gap-[5px] text-white'>{t("explore")} <FaLongArrowAltRight /></span>
           </div>
</Link>
<Link href={"/"} className='big-cate w-full h-[220px]'>
<Image src={"/phone.png"} alt='' width={400} height={400} className='cate h-full w-full rounded-xl object-cover' />
<div className="text">
            <h1>Phone</h1>
            <p>{cateogries?.filter((e:any) => e.category.toLowerCase() === "phone").length} {t("products")}</p>
            <span  className='explore flex items-center gap-[5px] text-white'>{t("explore")}<FaLongArrowAltRight /></span>
           </div>
</Link>
        </div>
    </div>
   </div>
  )
}

export default Categories
