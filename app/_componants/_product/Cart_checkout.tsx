"use client"
import { Provider } from '@/app/_context/Context'
import { db } from '@/app/config'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

function Cart_checkout(props:any) {
    const data:{id:string} = useContext(Provider);
    let [count , setCount] = useState(0);
    const [newData,setNew]:any = useState(null);

    useEffect(() =>{
        const feature = onSnapshot(doc(db,"users" , `${data?.id}`) , (doc) => {
         setNew(doc?.data()?.cart)
        })
       return () => {
         feature()
       }
     },
   [])
 
 const Delete = async (targ:string) => {
   await updateDoc(doc(db,"users" , `${props.userid}`) , {
     cart:arrayRemove(props.element),
   })
 }

 useEffect(() => {
 setCount(props.count)
     },[])

   const countUp = async(targ:number) => {
     const t = newData?.map((e:{id:string}) => {
       if (e.id === props.id){
         return {
           ...e,
           count:targ
         }
       } else {
         return {
           ...e
         }
       }
     })
    console.log(t)
    await updateDoc(doc(db,"users" , `${props.userid}`) , {
     cart:t
   })
   }


  return (
 <div className="card flex items-center justify-between py-[15px] pl-[10px] px-[35px] bg-white rounded-2xl border-[1px] border-[#f3f3f6]" >
     <div className="one flex flex-row-reverse items-start font-semibold gap-[18px]">
 <div className="text">
 <h1 className='text-[20px]'>{props.Title.split(" ").slice(0,6).join(" ")}....</h1>
 <span className='text-gray-600'>{props.price}$</span>
 </div>
 <img src={props.image} className='w-[90px] bg-gray-100 rounded-xl p-[10px]' alt='' width={300} height={300} />
 </div>
 {/* <h1 className='font-semibold'>X5</h1> */}
 <div className="two flex items-center gap-4">
 <RiDeleteBin6Line size={20} color='red' className='cursor-pointer' onClick={() => {
   Delete(props.element)
 }} />
 <div className="flex items-center w-fit rounded-sm border border-gray-200">
         <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer" onClick={() =>{
            if (count>=0){
                setCount((e) => e-1)
                countUp(count - 1)
              }
         }}>
           &minus;
         </button>
     
         <input
           type="number"
           id="Quantity"
           value={count}
           readOnly
           className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
         />
     
         <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer" onClick={() => {
            setCount(count+1)
            countUp(count + 1)
         }}>
           +
         </button>
       </div>
 </div>
 </div>
  )
}

export default Cart_checkout
