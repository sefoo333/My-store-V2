"use client"

import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../_componants/Navbar'
import Image from 'next/image'
import Cart from '../_componants/_product/Cart'
import { Provider } from '../_context/Context'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../config'
import Link from 'next/link'
import { toast, Toaster } from 'sonner'
import { useTranslation } from 'react-i18next'

function page() {

const data:any = useContext(Provider)
  
const [cart,setCart]:any = useState([]);
const [total,setTotal] = useState(0)


useEffect(() => {
  const featuree = onSnapshot(doc(db,"users" , `${data?.id}`) , (doc) => {
    setCart(doc?.data()?.cart)
    const totaly = doc?.data()?.cart?.map((e:{price:string , count:number}) => {
      return +e.price * e.count
    }).reduce((a:number,b:number) => {
      return a + b
    })
    setTotal(totaly)
  })
  return () => {
    featuree()
  }
},[data])

console.log(total)
const Tax = 20;
const Discount = 0;


const { t, i18n } = useTranslation();
const all = (total + Tax ) - Discount

  return (
    <>
    <Toaster />
    <Navbar className="text-black" />
   <div className="parent flex justify-center py-[60px]">
    <div className="container flex flex-col items-center justify-center">

{/* <div className="head text-center py-[30px]">
<h1 className='font-semibold text-[60px]'>Your Cart</h1>
</div> */}
        <div className="head_shop p-[80px] w-[1200px] max-xl:w-full max-xl:p-[40px] text-[#333d48] rounded-[20px] bg-linear-[(--shop)] flex flex-col items-center">

<h1 className='text-[60px] font-semibold text-center max-xl:text-[40px]'>{t("cart")}</h1>
{/* <p className='w-[500px] text-[18px] text-center text-[#757585]'>There are a many products you can buy any things likes laptop and you will enjoy it</p> */}
</div>

<div className="cart w-[80%] max-xl:w-full mt-[40px]">
<div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_title")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_category")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_price")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("cart_count")}</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{t("action")}</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200">
    
  {
    cart?.map((e:any) =>(
      <Cart element={e} image={e.image} Title={e.Title} userid={data?.id} category={e.category} price={e.price} id={e.id} key={e.id} count={e.count} />
    ))
  }
    
     

    
    </tbody>
  </table>
</div>
</div>

<div className="checout w-[80%]">
<div className="mt-8 flex justify-start border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>{t("subtotal")}</dt>
                <dd> {data?.price === "EG" ? (<>{(+total * 50.57).toFixed(0)} <span className='text-[17px]'>{t("EG")}</span></>) : data?.price === "SAR" ? (<>{(+total * 3.75).toFixed(0)} <span className='text-[17px]'>{t("SAR")}</span></>) : `${total}$`}</dd>
              </div>

              <div className="flex justify-between">
                <dt>{t("tax")}</dt>
                <dd> {data?.price === "EG" ? (<>{(+Tax * 50.57).toFixed(0)} <span className='text-[17px]'>{t("EG")}</span></>) : data?.price === "SAR" ? (<>{(+Tax * 3.75).toFixed(0)} <span className='text-[17px]'>{t("SAR")}</span></>) : `${Tax}$`}</dd>
              </div>

              <div className="flex justify-between">
                <dt>{t("discount")}</dt>
                <dd>-0%</dd>
              </div>

              <div className="flex justify-between text-2xl font-medium ">
                <dt>{t("total_price")}</dt>
                <dd>{!Number.isNaN(((total + Tax) - Discount)) ? (<>{data?.price === "EG" ? (<>{(+all * 50.57).toFixed(0)} <span className='text-[17px]'>{t("EG")}</span></>) : data?.price === "SAR" ? (<>{(+all * 3.75).toFixed(0)} <span className='text-[17px]'>{t("SAR")}</span></>) : `${all}$`}</>) : "0"}</dd>
              </div>
            </dl>

          

            <div className="flex justify-end">
              <Link
                href={`${cart?.length > 0 ? "/checkout" : "/cart"} `}
                onClick={() => {
                  cart?.length === 0 ? toast.error("You Have To add the cart any products !") : null
                }}
                className="block rounded-sm bg-blue-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-blue-400"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
   </div>
   </>
  )
}

export default page
