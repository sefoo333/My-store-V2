"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FiShoppingCart , FiUser , FiSearch ,FiHeart  } from "react-icons/fi";
import Search from './_small-comps/Search';
import Link from 'next/link';
import Image from 'next/image';
import { Provider } from '../_context/Context';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config';
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useTranslation } from 'react-i18next';

function Navbar(props:any) {
  const data:any = useContext(Provider)
const [cartnum,setNum] = useState(0)
const [cartnum2,setNum2] = useState(0)

useEffect(() =>{
       const feature = onSnapshot(doc(db,"users" , `${data?.id}`) , (doc) => {
         setNum(doc?.data()?.cart?.length)
       })
      return () => {
        feature()
      }
    },
  [data])
useEffect(() =>{
       const feature = onSnapshot(doc(db,"users" , `${data?.id}`) , (doc) => {
         setNum2(doc?.data()?.wishlist?.length)
       })
      return () => {
        feature()
      }
    },
  [data])

  const { t, i18n } = useTranslation();

  const [menuopen , setMenu] = useState(false)
  return (
   <div className="parent flex justify-center shadow relative z-20">
     <div className={`container  flex  justify-between items-center py-[25px] px-[30px] max-xl:flex-row  ${props.className}`}>
     {/* <h1 className='text-[25px] font-semibold'>Sefoo Store</h1> */}
{props.white ? (
  <Image src={"/logo2.png"} alt='' width={300} height={100} className='h-[55px] object-cover max-xl:h-[30px]' />

) : (
  <Image src={"/logo2.png"} alt='' width={300} height={100} className='h-[55px] object-cover max-xl:h-[30px]' />
)}
       {/* <div className="search basis-[70%]">
        <Search />
       </div> */}
       <ul className={`flex items-center dark:text-white gap-[50px] text-[18px] ${!menuopen ? "max-xl:left-[-500px] max-xl:blur-2xl max-xl:opacity-0 max-xl:z-[-99999999]" : " max-xl:opacity-100 max-xl:blur-none"} max-xl:left-0 max-xl:font-semibold max-xl:flex-col max-xl:justify-center duration-500 max-xl:top-0 max-xl:w-full max-xl:h-full max-xl:text-white max-xl:bg-[#0000008f] max-xl:fixed `}>
          <div className="cancel absolute right-3 hidden max-xl:block top-3" onClick={() => setMenu(!menuopen)}>
<MdCancel size={35} />
          </div>
            <li className='transition-[0.5s] cursor-pointer hover:text-gray-200'>
              <Link href={"/"}>
              {t("Home_Nav")}
              </Link>
            </li>
            <li className='transition-[0.5s] cursor-pointer hover:text-gray-200'>
              <Link href={"/shop"}>
              {t("Shop_Nav")}
              </Link>
            </li>
            <li className='transition-[0.5s] cursor-pointer hover:text-gray-200'>
              <Link href={"/About"}>
              {t("About_Nav")}
              </Link>
            </li>
            <li className='transition-[0.5s] cursor-pointer hover:text-gray-200'>
              <Link href={"/contact"}>
              {t("Contact_Nav")}
              </Link>
            </li>
        </ul>
     <div className="tools flex gap-[20px] items-center dark:text-white">
     <div className="cart text-[25px] relative cursor-pointer">
        <Link href={"/cart"}>
        <div className="counter flex justify-center items-center text-[12px] w-[20px] h-[20px] p-[5px] bg-yellow-500 rounded-full absolute left-[-10px] top-[-10px]">
<span>{cartnum}</span>
        </div>
        <FiShoppingCart />
        </Link>
       </div>
       {/* <div className="search text-[25px] cursor-pointer">
        <FiSearch />
       </div> */}
       <div className="user text-[25px] cursor-pointer">
        <Link href={`${data ? "/settings/profile" : "/login"}`}>
        {data?.Image !== undefined ? (<img src={data?.Image} alt="profile" width={200} height={200} className='rounded-full h-[30px] w-[30px]' />) : (<FiUser />)}
        </Link>
       </div>
       <div className="user text-[25px] cursor-pointer relative">
    <Link href={"/wishlist"}>
    {cartnum2 > 0 ? (
      <div className="counter flex justify-center items-center text-[12px] w-[15px] h-[15px] p-[5px] bg-red-400 rounded-full absolute left-[-8px] top-[-6px]">
        </div>
    ) : null}
        <FiHeart />
        </Link>
       </div>
        <div className="menu hidden max-xl:flex">
<IoMenu size={25} onClick={() => {
  setMenu(!menuopen)
}} />
        </div>
     </div>
      </div>
      {/* <div className="section_two flex justify-center py-[25px]">
        
      </div> */}
    </div>
  )
}

export default Navbar
