"use client"
import React, { useContext, useEffect, useState } from 'react'
import { AnimatedCircularProgressBar } from '../_small-comps/Progress'
import { MdClear } from 'react-icons/md'
import { Provider } from '@/app/_context/Context'
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast, Toaster } from 'sonner'
import { useTranslation } from 'react-i18next'
interface user {
    Adress:{
      City:string,
      Country:string,
      postal_code:string
    },
      id:string,
    Image:string,
    loginType:string,
    UserName:string,
    Email:string,
    password:string,
    payments:string[]
  }

function Prograss() {
    const [value,setValue] = useState(20)
    const user:user = useContext(Provider);
    const {t} = useTranslation();

    useEffect(() => {
      let count = 0
const check = () => {
    if (user?.Image !== ""){
        setValue((e) => e + 20);
        count++
    }
    // if (user?.UserName !== "" && user?.Email !== "" && user?.password !== "") {
    //     setValue((e) => e + 20);
    // }
    if (user?.Adress.Country !== "" && user?.Adress.City !== "" && user?.Adress.postal_code !== "" ) {
        setValue((e) => e + 20);
        count++
    }

    if (user?.UserName !== "" && user?.Email !== "" && user?.Adress.Country !== "") {
        setValue((e) => e + 20);
        count++
      }
      
      if (user?.payments?.length !== 0) {
        setValue((e) => e + 20);
        count++
      }
}
const checkvalue = () => {

  if (count === 4) {
    toast(t("congrests"));
  }
}


setTimeout(() => checkvalue() , 1000) 
return () => {
    check()
}
},[user , user?.payments])


  return (
    <>
    <Toaster />
     <div className="prograss w-[20%] max-xl:w-full max-xl:my-[15px] bg-white border-[1px] border-[#ecebee] p-[30px] flex flex-col items-center gap-[20px] rounded-2xl">
         <h1 className='text-center font-semibold text-[20px]'>Complete Your Profile</h1>
         <div className="prgress">
         <AnimatedCircularProgressBar
             max={100}
             min={0}
             value={value}
             gaugePrimaryColor="#576CBC"
             gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
           />
         </div>
         <ul className='flex flex-col gap-[25px] text-start w-[80%] font-semibold'>
         <li className='flex items-center'><IoCheckmarkCircle className='mr-[10px]' size={20} />Setup Account</li>
           <li className='flex items-center'>{user?.Image !== "" ? <IoCheckmarkCircle className='mr-[10px]' size={20} /> : <MdClear className='mr-[10px]' />}Upload Your Photo</li>
           <li className='flex items-center'>{user?.UserName !== "" && user?.Email !== "" && user?.Adress.Country !== "" ? <IoCheckmarkCircle className='mr-[10px]' size={20} /> : <MdClear className='mr-[10px]' />}personal info</li>
           <li className='flex items-center'>{user?.Adress.Country !== "" && user?.Adress.City !== "" && user?.Adress.postal_code !== "" ? <IoCheckmarkCircle className='mr-[10px]' size={20} /> : <MdClear className='mr-[10px]' />}Adress</li>
           <li className='flex items-center'>{user?.payments.length > 0 ? <IoCheckmarkCircle className='mr-[10px]' size={20} /> : <MdClear className='mr-[10px]' />}Setup payment</li>
         </ul>
       </div>
       </>
  )
}

export default Prograss
