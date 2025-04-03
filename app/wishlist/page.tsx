"use client"
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../_componants/Navbar'
import Image from 'next/image'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { Provider } from '../_context/Context';
import { useTranslation } from 'react-i18next';

function page() {

const data:any = useContext(Provider);
  const [wishlist,setWish] = useState([]);
  
  
  useEffect(() => {
      const featuree = onSnapshot(doc(db,"users" , `${data?.id}`) , (doc) => {
        setWish(doc?.data()?.wishlist)
      })
    return () => {
      featuree()
    }
    },[data])

      const Delete = async (targ:object) => {
        await updateDoc(doc(db,"users" , `${data?.id}`) , {
          wishlist:arrayRemove(targ),
        })
      }

  const addToCart = async (e:any) => {
        await updateDoc(doc(db,"users" , `${data?.id}`) , {
          cart:arrayUnion({
            Title:e?.Title,
            image:e?.image[0],
            category:e?.category,
            price:e?.price,
            count:0,
            id:e?.id
          })
        })

        await updateDoc(doc(db,"users" , `${data?.id}`) , {
          wishlist:wishlist.filter((a:{id:string}) => a?.id !== e?.id)
      })
    }
const {t} = useTranslation();

  return (
    <>
    <Navbar className="text-black" />
   <div className="parent flex justify-center py-[60px]">
    <div className="container flex flex-col items-center justify-center">

{/* <div className="head text-center py-[30px]">
<h1 className='font-semibold text-[60px]'>Your Cart</h1>
</div> */}
        <div className="head_shop p-[80px] mb-[20px] w-[1200px] max-xl:w-full max-xl:p-[40px] text-[#333d48] rounded-[20px] bg-linear-[(--shop)] flex flex-col items-center">

<h1 className='text-[60px] max-xl:text-[45px] font-semibold text-center'>{t("wishlist")}</h1>
{/* <p className='w-[500px] text-[18px] text-center text-[#757585]'>There are a many products you can buy any things likes laptop and you will enjoy it</p> */}
</div>

<div className="cart w-[70%] max-xl:w-[92%]">
<div className="overflow-x-auto rounded-lg border border-gray-200">
<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
    <thead className="ltr:text-left rtl:text-right">
    <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_title")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_category")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_price")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("action")}</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
  
   {wishlist?.map((e:any) => (
      <tr key={e.id}>
    
    <td className="whitespace-nowrap px-7 pr-9 py-2 text-gray-700  flex items-center gap-[30px] dark:*:text-white">
    <img src={e.image} className='aspect-square rounded-xl object-contain  w-[10%]' alt='' width={300} height={300} />
        <h1 className='font-semibold'>{e.Title}</h1>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.category}</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{e.price}$</td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <a
  className="inline-block rounded-sm bg-red-400 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => {
    Delete(e)
  }}
>
  Delete
</a>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <a
  className="inline-block rounded-sm bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => {
    addToCart(e)
  }}
>
  Add To Cart
    </a>
        </td>
      </tr>

   ))}

     

    
    </tbody>
  </table>
</div>
</div>

    </div>
   </div>
   </>
  )
}


export default page
