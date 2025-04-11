"use client"
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { GoStarFill } from 'react-icons/go'
import { db } from '../config'
import { Provider } from '../_context/Context'
import Image from 'next/image'
import { IoMdHeartEmpty } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import { toast, Toaster } from 'sonner'

function Product(props:any) {

const user:any = useContext(Provider)
    const [cart,setCart] = useState(0)
    const [wishlist,setWishlist] = useState(0)
      const { t, i18n } = useTranslation();


    const [NewData,setNew] = useState([]);

    useEffect(() =>{
      const feature = onSnapshot(doc(db,"users" , `${user?.id}`) , (doc) => {
       setNew(doc?.data()?.cart)
      })
     return () => {
       feature()
     }
   },
 [])


    const addToCart = async (id: any) => {
     const filter = NewData.filter((e:any) => {
      return e.id === props.id
     })
     if (filter.length === 0){
      await updateDoc(doc(db,"users" , `${user?.id}`) , {
        cart:arrayUnion({
          Title:props.Title,
          image:props.thumb,
          category:props.category,
          price:props.price,
          count: props.id[props.id] ? 1 : 1,
          id:props.id
        })
      }) 
     } else {
      const map = NewData.map((e:object | any) => {
        return e.id ===props.id ? {...e , count: e.count + 1} : {...e}
      })
      await updateDoc(doc(db,"users" , `${user?.id}`) , {
        cart:map
      }) 
     }
    }
    const addToWishlist = async () => {
      await updateDoc(doc(db,"users" , `${user?.id}`) , {
        wishlist:arrayUnion({
          Title:props.Title,
          image:props.thumb,
          category:props.category,
          price:props.price,
          count: props.id[props.id] ? 1 : 1,
          id:props.id
        })
      })

    }



  return (
   <>
   
   <div className={`card mt-[90px] max-xl:mt-[30px] w-[300px]   rounded-xl  ${props?.parentsize} max-xl:w-full`}>
            <Toaster />
          <div className="image bg-[#e9e9e9] dark:bg-gray-800 rounded-2xl  flex justify-center p-[20px] py-[40px]">
          {props.discont > 0 ? (
            <span className='Discount absolute text-[17px] font-extralight text-white px-[15px] py-[5px] bg-red-400 left-[15px] top-[30px] rounded-sm'>-{props.discont}%</span>
          ) : null}
          <Link href={`/${props.id}`} className={` ${props.imagesize} flex justify-center`}>
          <img src={`${props?.thumb}`} className='w-[200px] h-[200px] object-contain' alt='' width={200} height={200} />
          </Link>
          </div>
          <div className="text p-[10px]">
          <Link href={`/${props.id}`}>
<div className="two flex justify-between mb-[10px]">
<h1 className='font-semibold text-[21px] h-[63px] overflow-hidden'>         {props.Title}           </h1>
<span className='font-semibold text-[22px]'>{user?.price === "EG" ? (<>{(+props.price * 50.57).toFixed(0)}<span className='text-[17px]'>{t("EG")}</span></>) : user?.price === "SAR" ? (<>{(+props.price * 3.75).toFixed(0)}<span className='text-[17px]'>{t("SAR")}</span></>) : `${props.price}$`}</span>
</div>
           <div className="rates text-[18px] my-[5px] flex text-orange-400">
           {Array.from(Array(props.Rate) , (e,i) => (
       <GoStarFill key={i} />
     ))
   }
      <span className='ml-1 text-[14px] text-gray-700'>({props?.count})</span>
      
      </div>         
      </Link>
          </div>
          <div className="buttons flex justify-between h-[45px] gap-[15px]">
          <button
     className="inline-block duration-300 w-full rounded-sm border border-blue-600 text-center bg-blue-600 px-10 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
     onClick={() => {
      if (user) {
        addToCart(props.id)
      } else {
        // changetoLocal(props.element)
        toast.error("Please Sign Up to continue")
      }
   }}
   >
     {t("add_cart")}
   </button>
   <div onClick={() => {
      addToWishlist();
        setWishlist((e) => e++)
    }} className="button cursor-pointer p-[12px] flex justify-center items-center bg-slate-50 rounded-full dark:bg-gray-800 dark:text-white">
       <IoMdHeartEmpty size={20} />
   </div>
          </div>
       </div>
   </>
  )
}

export default Product
