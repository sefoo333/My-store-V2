"use client"
import { db } from '@/app/config';
import { Confetti, ConfettiRef } from '@/components/magicui/confetti';
import { doc, getDoc } from 'firebase/firestore';
import { t } from 'i18next';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { use, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';


interface order {
  Title:string,
  count:number,
  price:string,
}

interface order_details{
  address:string,
  city:string,
  Name_buyer:string
}

function page() {
  const confettiRef:any = useRef<ConfettiRef>(null);

  const params = useParams()
  const set_id = params.finish_id;
const [mydata,setData]:any = useState({})
  useEffect(() => {
const getData = async () => {
 const data:any = (await getDoc(doc(db , "orders" , `${set_id}`))).data();
setData(data)
}
  getData()

  },[])
  const {t} = useTranslation();

  return (
    
  <><div className="parent flex justify-center items-center h-screen overflow-hidden" ref={confettiRef}>
      <div className="container text-center w-full flex flex-col items-center">
        <Image src={"/wired-flat-497-truck-delivery-hover-pinch.webp"} alt='' width={200} height={200} />
        <h1 className='font-semibold text-[65px]'>{t("order_coming")}</h1>
        <p className='w-[500px] text-gray-500 text-[20px]'>{t("order_par").split(" ").slice(0,2).join(" ")} {set_id} {t("order_par").split(" ").slice(2,t("order_par").length).join(" ")}</p>

        <div className="all">
          <div className="flow-root mt-[70px] w-full">
            <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm *:even:bg-gray-50">
              <div className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-semibold text-gray-900 ">{t("address")}</dt>

                <dd className="text-gray-700 sm:col-span-2">{mydata?.Country} - {mydata?.City}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-semibold text-gray-900">{t("total_price_tax")}</dt>

                <dd className="text-gray-700 sm:col-span-2">200$</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-3 sm:gap-4">
                <dt className="font-semibold text-gray-900">{t("order_name")}</dt>

                <dd className="text-gray-700 sm:col-span-2">{mydata?.Name_buyer}</dd>
              </div>
            </dl>
          </div>
          <div className="overflow-x-auto mt-[50px]">
            <table className="min-w-full divide-y-2 divide-gray-200 border border-gray-200">
              <thead className="ltr:text-left rtl:text-right">
                <tr className="*:font-semibold *:text-gray-900 font-semibold">
                  <th className="px-3 py-2 whitespace-nowrap font-semibold">{t("cart_title")}</th>
                  <th className="px-3 py-2 whitespace-nowrap font-semibold">{t("cart_count")}</th>
                  <th className="px-3 py-2 whitespace-nowrap font-semibold">{t("cart_price")}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">

                {mydata?.cart?.map((e: order) => (
                  <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-4 whitespace-wrap w-[50%] text-start text-wrap">{e.Title}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-start">{e.count}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-start">{e.price}</td>
                  </tr>

                ))}






              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div><Confetti
        className="absolute left-0 top-0 z-[-1] size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        } } /></>
  )
}

export default page
