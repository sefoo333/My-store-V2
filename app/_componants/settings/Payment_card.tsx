"use client"

import React, { useContext, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaSave } from 'react-icons/fa'
import { MdDateRange, MdDelete } from 'react-icons/md'
import { RiVisaLine } from 'react-icons/ri'
import { PiPencilSimpleSlashFill } from "react-icons/pi";
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/config'
import { Provider } from '@/app/_context/Context'
import { RiMastercardFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { useTranslation } from 'react-i18next'

interface Payment_carde{
    card_num:string,
    ccv:number,
    data_end:string,
    id?:number,
    element?:object,
  }

function Payment_card(props:Payment_carde) {
    const user:{id:string , payments:string[]} = useContext(Provider)
    const [Card , setCard] = useState("")
    const [ccv , setCCV] = useState(123)
    const [date_num , setDate] = useState("")
    const [edit,setEdit] = useState(false)


      const EditCountry = async (e:Payment_carde) => {
          
          
          const filter2=user?.payments.filter((e:any,a) => e.id !== props.id);
          const filter=user?.payments.filter((e:any,a) => e?.id === props?.id).map((a:any) => {
              return {
                  card_num:a.card_num,
                  ccv:a?.ccv === 0 ? a.ccv : ccv,
                  date_end:a?.date_end === "" ? a.date_end : date_num,
                  id:a?.id
                }
            });
            const arr = [...filter, ...filter2]
          // if (Card !== ""){
          //       await updateDoc(doc(db,"users" , `${user?.id}`) , {
          //       payments: arr,
          //       })
          //       setTimeout(() => {location.reload()},1500)
    
          //   }
            if (ccv !== 0){
                
            await updateDoc(doc(db,"users" , `${user?.id}`) , {
                payments: arr,
                })
                setTimeout(() => {location.reload()},1500)

              }
    
            if (date_num !== ""){
            await updateDoc(doc(db,"users" , `${user?.id}`) , {
                payments:arr
                })
                setTimeout(() => {location.reload()},1500)
              }
      
        
    }

    const deletePayment = async (value:any) => {
      await updateDoc(doc(db,"users" , `${user?.id}`) , {
        payments:arrayRemove(value),
      })
      location.reload();
    }
const {t} = useTranslation();
  return (
        <>
        {!edit ? (
             <div className="card flex items-center justify-between max-xl:w-full">
             <div className="two flex items-center gap-[20px]">
{props?.card_num?.slice(0,1) === "4" ?  <RiVisaLine size={45} color='blue' /> : props.card_num.slice(0,2) === "51" || props.card_num.slice(0,2) === "51" || props.card_num.slice(0,4) === "2221" || props.card_num.slice(0,4) === "2720" ? <RiMastercardFill size={45} color='#ff9401' /> : <FaCreditCard size={40} color='black' />}
               <div className="text">
                 <h1 className='font-semibold text-[18px] mb-0'>**** ****{props?.card_num}</h1>
       
       <div className="data flex items-center gap-[5px] text-gray-600">
         <MdDateRange />
       <span className=''>{props?.data_end}</span>
       
       </div>
       
               </div>
                        </div>
         <div onClick={() => setEdit(!edit)} className='edit bg-white rounded-xl border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]'>
          <AiOutlineEdit />
          <span>{t("edit")}</span>
                      </div>    
             </div>
        ) : (
            <form action="" onSubmit={(e) => {
                e.preventDefault()
                EditCountry({
                    card_num:Card,
                    ccv:ccv,
                    data_end:date_num,
                    id:props?.id
                })
              }}>
              <div className="informations grid grid-cols-2 grid-rows-1 gap-7 my-[15px] max-xl:grid-cols-1">
                {/* <div className="fullName">
                  <h1 className='font-medium text-[16px] text-slate-600'>Card Number</h1>
                  <input type="text" onChange={(e) => setCard(e.target.value)} placeholder='Edit your Card Number' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
                </div> */}
                <div className="Email">
                  <h1 className='font-medium text-[16px] text-slate-600'>CVC</h1>
                  <input type="text" onChange={(e:any) => setCCV(e.target.value)} placeholder={`${props.ccv}`} className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
                </div>
                  <div className="password ">
                  <h1 className='font-medium text-[16px] text-slate-600'>{t("expire")}</h1>
                  <input type="text" onChange={(e) => setDate(e.target.value)} placeholder='Edit your Date end ' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'  />
                </div>
              </div>
           <div className="b-g flex justify-end gap-[20px] items-center">
           <div className="button edit bg-blue-500 rounded-xl duration-500 hover:bg-blue-600 text-white border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]">
              <input type='submit' value={t("submit")} className='w-full h-full'  />
    <FaSave />
              </div>
           <div onClick={() => setEdit(!edit)} className="button edit bg-red-500 rounded-xl duration-500 hover:bg-red-600 text-white border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]">
{t("cancel")}
    <PiPencilSimpleSlashFill size={18} />
              </div>
                        <MdDelete onClick={() => {
                          deletePayment(props.element)
                        }} color='red' size={20} />
              
           </div>
              </form>
        )}
        </>
  )
}

export default Payment_card
