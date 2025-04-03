"use client"

import React, { useContext, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { AnimatedCircularProgressBar } from '../_small-comps/Progress'
import { MdClear } from 'react-icons/md'
import { Provider } from '@/app/_context/Context'
import Prograss from './Prograss'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/config'
import { useTranslation } from 'react-i18next'

function Public() {
    const [value,useValue] = useState("US");

    const user:{id:string, price:string} = useContext(Provider);

    const selectPrice = async (e:any) => {
      await updateDoc(doc(db , "users" , `${user?.id}`) , {
        price:e !== "" ? e : user?.price,
      })
      setTimeout(() =>       location.reload() , 600)
    }
    const changelang = async (e:any) => {
      await updateDoc(doc(db , "users" , `${user?.id}`) , {
        lang: e !== "" ? e : user?.price
      })
setTimeout(() =>       location.reload() , 600)
    }
const {t} = useTranslation();
  return (
<div className="window mt-[40px] w-full">
<h1 className='font-semibold text-[40px] my-[30px] max-xl:px-[20px]'>{t("public")}</h1>
<div className="two flex justify-center gap-[40px] max-xl:flex-col max-xl:px-[10px]">
<div className="panel flex flex-col w-[80%] max-xl:w-full gap-[20px] font-semibold bg-white rounded-2xl p-[30px] py-[35px]">
<div className="option flex justify-between items-center">
    <h1>{t('darkMode')}</h1>
    <label
  htmlFor="AcceptConditions"
  className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
>
  <input type="checkbox" id="AcceptConditions" className="peer sr-only" />

  <span
    className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
  ></span>
</label>
</div>
<div className="option flex justify-between items-center w-full">
    <h1>{t("lan")}</h1>
    <Select  onValueChange={(e) => {
      changelang(e)
    }}>
      <SelectTrigger className="w-[220px] mt-[20px] max-xl:w-[55%]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className='font-semibold' value="en">English</SelectItem>
          <SelectItem className='font-semibold' value="ar">Arabic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
<Select />

</div>


<div className="option flex justify-between items-center w-full">
    <h1>{t("price_kind")}</h1>
    <Select onValueChange={(e) => {
      selectPrice(e)
    }} >
      <SelectTrigger className="w-[220px] max-xl:w-[55%]">
        <SelectValue placeholder="Select Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className='font-semibold' value="US">US</SelectItem>
          <SelectItem className='font-semibold' value="EG">EG</SelectItem>
          <SelectItem className='font-semibold' value="SAR">SAR</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
<Select />

</div>
</div>
<Prograss />
</div>
</div>
  )
}

export default Public
