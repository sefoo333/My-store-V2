"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { LuNfc } from "react-icons/lu";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { MdClear, MdDateRange } from "react-icons/md";
import { AnimatedCircularProgressBar } from '../_small-comps/Progress';
import Prograss from './Prograss';
import { Provider } from '@/app/_context/Context';
import Payment_card from './Payment_card';
import { MdAddCard } from "react-icons/md";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/config';
import { PiPencilSimpleSlashFill } from 'react-icons/pi';
import { FaCreditCard, FaSave } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { MdDelete } from "react-icons/md";

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
  payments:[{
    card_num:string,
    ccv:number,
    date_end:string,
  }]
}

interface Payment_carde{
  card_num:string,
  ccv:number,
  date_end:string,
}

function Payment() {

  const user:user = useContext(Provider);
  const [add,setAdd] = useState(false);

   const [Card , setCard] = useState("")
      const [ccv , setCCV] = useState(123)
      const [date_num , setDate] = useState("")  
        const AddPayment = async () => {
                          if (Card !== "" && ccv && date_num !== ""){
                await updateDoc(doc(db,"users" , `${user?.id}`) , {
                        payments: arrayUnion({
                          card_num:Card,
                          ccv:ccv,
                          date_end:date_num,
                          UserName:user?.UserName,
                        }),
                        })

                        location.reload();

      }
    }
    const {t} = useTranslation();

  return (
    <>
    <div className="window mt-[40px] w-full">
     <h1 className='font-semibold text-[40px] my-[30px] max-xl:px-[20px]'>{t("payment")}</h1>
    
   <div className="two flex gap-[40px] max-xl:flex-col max-xl:px-[10px]">
   <div className="two_sec_one w-[80%] max-xl:w-full">
   <div className="card rounded-4xl w-[600px] max-xl:w-full  p-[20px] font-semibold relative bg-[#0b416d] text-white border-[2px] border-[#073a62]">
        {/* before:bg-[#6d6d6d5d] before:left-0 before:top-0 w-[30%] before:w-full before:absolute before:h-full before:rounded-3xl before:blur-[2px] */}
<div className="two flex px-[15px] items-center justify-between">
<h1 className='text-[20px] '>{t("card")}</h1>
<div className="image">
  <LuNfc size={30} />
</div>
</div>
        <div className="information_credit  mt-[60px] relative z-1">
<div className="two">
<h1 className='text-[35px] flex gap-[20px]'><span>****</span>  <span>****</span>  <span>****</span>  <span>{user?.payments?.length >= 1 ? user?.payments[0]?.card_num?.slice(0,4) : null}</span></h1>
<h1 className='uppercase text-[20px] mt-[5px]'>{user?.UserName}</h1>
</div>
         <div className="group flex justify-between">
         <div className="two flex gap-[40px] items-center">
          <div className="two flex flex-col py-[15px]">
                <span className='text-gray-300 text-[14px]'>Expair Date</span>
                <span>{user?.payments[0]?.date_end}</span>
            </div>
            <div className="two flex flex-col  py-[15px]">
                <span className='text-gray-300 text-[14px]'>CCV</span>
                <span>{user?.payments[0]?.ccv}</span>
            </div>
          </div>
                <div className="credit_type pr-[15px] flex items-center">
{user?.payments.length > 1 ? (
<>
{user?.payments[0]?.card_num?.slice(0,1) === "4" ?  <RiVisaLine size={45} color='blue' /> : user?.payments[0].card_num.slice(0,2) === "51" || user?.payments[0].card_num.slice(0,2) === "51" || user?.payments[0].card_num.slice(0,4) === "2221" || user?.payments[0].card_num.slice(0,4) === "2720" ? <RiMastercardFill size={45} color='#ff9401' /> : <FaCreditCard size={40} color='black' />}
</>
):null}
            </div>
         </div>
        </div>
     </div>
   <div className="panel w-full bg-white border-[1px] border-[#ecebee] rounded-3xl p-[20px] flex flex-col gap-[30px] mt-[30px]">
     <div className="cards flex flex-col gap-[30px]">
      {
        user?.payments?.map((e:Payment_carde , index) => (
        <Payment_card element={e} card_num={e.card_num} ccv={e.ccv} data_end={e.date_end} id={index} key={index} />
        ))
      }

      {
        add ? (
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            AddPayment()
          }}>
          <div className="informations grid grid-cols-2 grid-rows-1 gap-7 my-[15px] max-xl:grid-cols-1">
            <div className="fullName">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("card_num")}</h1>
<div className="two relative">
<input type="text" maxLength={16} onChange={(e) => setCard(e.target.value)} placeholder='Add your Card Number' className='pl-[40px] mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
<div className="icon absolute top-1/2 translate-y-[-50%] left-[10px] duration-300 ">
{Card?.slice(0,1) === "4" ?  <RiVisaLine size={23} color='blue' /> : Card.slice(0,2) === "51" || Card.slice(0,2) === "55" || Card.slice(0,4) === "2221" || Card.slice(0,4) === "2720" ? <RiMastercardFill size={23} color='#ff9401' /> : <FaCreditCard size={23} color='black' />}
</div>
</div>
            </div>
            <div className="Email">
              <h1 className='font-medium text-[16px] text-slate-600'>CVC</h1>
              <input type="text" maxLength={3} onChange={(e) => setCCV(+e.target.value)} placeholder={`Add your ccv`} className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
              <div className="password ">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("expire")}</h1>
              <input type="text" onChange={(e) => setDate(e.target.value)} placeholder='Add your Date end ' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'  />
            </div>
          </div>
       <div className="b-g flex justify-end gap-[20px]">
       <div className="button edit bg-blue-500 rounded-xl duration-500 hover:bg-blue-600 text-white border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]">
          <input type='submit' value={t('add')}  />
<FaSave />
          </div>
       <div onClick={() => setAdd(!add)} className="button edit bg-red-500 rounded-xl duration-500 hover:bg-red-600 text-white border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]">
{t("cancel")}
<PiPencilSimpleSlashFill size={18} />
          </div>
       </div>
          </form>
        )
        : null
      }
     </div>

   <div className="buttons flex justify-end">
   <div onClick={() => setAdd(!add)}  className='edit bg-white rounded-xl duration-500 border-[1px] justify-end w-fit hover:bg-slate-50/40 border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]'>
     {t("add_payment")}
         <MdAddCard />
                   </div>
   </div>
     </div>
   </div>
    <Prograss />
   </div>
     </div>
     </>
  )
}


export default Payment
