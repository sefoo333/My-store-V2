"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FiShoppingCart , FiUser , FiSearch ,FiHeart  } from "react-icons/fi";
import Search from './_small-comps/Search';
import Link from 'next/link';
import Image from 'next/image';
import { Provider } from '../_context/Context';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config';
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { FiLogIn } from "react-icons/fi";

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
   <div className={"parent flex justify-center shadow relative z-20 " + ` ${props?.classParent}`}>
     <div className={`container  flex  justify-between items-center py-[25px] px-[30px] max-xl:px-[15px] max-xl:flex-row  ${props.className}`}>
     {/* <h1 className='text-[25px] font-semibold'>Sefoo Store</h1> */}
<Link href={"/"} className='max-xl:w-[175px]' aria-label='Logo Website'>
{props.white ? (
  <Image src={"/logo2.png"} alt='' width={300} height={100} className='h-[55px] object-cover max-xl:h-[30px]' />

) : (
  <Image src={"/logo_black.png"} alt='' width={300} height={100} className='h-[55px] object-cover max-xl:h-[30px]' />
)}
</Link>
       {/* <div className="search basis-[70%]">
        <Search />
       </div> */}
       <ul className={`flex items-center max-xl:z-[999999999999999999999999999999999999999999999999999999999999999999999999999999999999] dark:text-white gap-[50px] text-[18px] ${!menuopen ? "max-xl:left-[-500px] max-xl:blur-2xl max-xl:opacity-0 max-xl:z-[-9999999]" : " max-xl:opacity-100 max-xl:blur-none max-xl:z-[999999999999999999999]"} max-xl:left-0 max-xl:font-semibold max-xl:flex-col max-xl:justify-center duration-500 max-xl:top-0 max-xl:w-full max-xl:h-full max-xl:text-white max-xl:bg-[#0000008f] max-xl:fixed `}>
          <span className="cancel absolute right-3 hidden max-xl:block top-3" onClick={() => setMenu(!menuopen)}>
<MdCancel size={35} />
          </span>
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
           {data ? (
      <>
        <li className='transition-[0.5s] cursor-pointer hover:text-gray-200 max-xl:block xl:hidden'>
              <Link href={"/settings/profile"}>
              My Account
              </Link>
            </li>
             <li onClick={() => {
              signOut(auth)
              window.open("/login" , "_parent")
            }} className='transition-[0.5s] cursor-pointer hover:text-gray-200 max-xl:block xl:hidden'>
              
              Log Out
            </li>
      </>
           ) :  <button
           aria-label='Login to website'
           className=" text-[17px] hidden max-xl:flex font-semibold rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-sm  items-center justify-center text-white hover:bg-transparent hover:text-slate-600 focus:ring-3 focus:outline-hidden"
         >
           LogIn 
         </button>}
        </ul>
     <div className="tools flex gap-[20px] items-center dark:text-white">
     <div className="cart text-[25px] relative cursor-pointer">
     <Link href={`${data ? "/cart" : "/login"}`} aria-label='cart section'>
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
        <Link href={`${data ? "/settings/profile" : "/login"}`} aria-label='Profile section'>
{
  data ? (
    <>
            {data?.Image !== undefined ? (<img src={data?.Image} alt="profile" width={200} height={200} className='rounded-full h-[30px] w-[30px]' />)  : (<FiUser />) }

            </>
  )
  : 
  (
 <FiLogIn />
  )
}
        </Link>
       </div>
       <div className="user text-[25px] cursor-pointer relative">
    <Link href={"/wishlist"} aria-label='wishlist section'>
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
