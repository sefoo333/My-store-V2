"use client"
import React, { useContext, useState } from 'react'
import { GoStarFill } from 'react-icons/go'
import { IoIosLogIn } from "react-icons/io";
import { Provider } from '../_context/Context';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';

function Rate_window(props:{id_product:string , className:string , rate_window:boolean}) {

    const [close,setClosed] = useState(false)


    const data:any = useContext(Provider);
const [content,setContent] = useState("")
const [Number,setNumber] = useState("")
const [open,setOpen]:any = useState(false)

    const sendReview = async () => {
        const datya = (await getDoc(doc(db,"products" , `${props.id_product}`))).data();
        await updateDoc(doc(db,"products" , `${props.id_product}`) , {
                // count:datya?.count,
                reviews:[  ...datya?.reviews,
                    {
                        Name:data?.UserName,
                        image:data?.Image,
                        rate_content:content,
                        rate_nums:Number,
                        userid:data?.id
                    }   
                  ]
        })
        location.reload()
    }

  return (
 
 <>
 {!open ? (
     <div className="container p-[50px] rounded-2xl w-[500px] h-fit fixed bg-white max-xl:w-fit">
     <h1 className='text-center font-semibold text-[30px] mb-[30px]'>Rate Product 😀</h1>
         <div className="button ">
              <div onClick={() => {
                             !data ? window.open("/login" , "_parent") : null
                           }} className="card cursor-pointer duration-300 justify-center hover:bg-gray-100 w-full p-[20px] text-[18px] font-medium flex items-center gap-[20px] rounded-[20px] border-[1px] border-[#ccc]">
             {data ? <IoIosCheckmarkCircle size={30} /> :  <IoIosLogIn size={30} />}
             <h1>{data ? "LogedIn" : "LogIn Now !"}</h1>
                           </div>
         </div>
         <form action="" className='mt-[40px] flex flex-col gap-[30px]' onSubmit={(e) => {
            e.preventDefault();
            sendReview()
         }}>
         {data?.id === "" ? (
            <>
                <div className="email">
             <label htmlFor="Email" className="relative">
   <input
     type="email"
     id="Email"
     placeholder=""
     className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm p-[10px] sm:text-md"
   />
 
   <span
     className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
   >
     Email
   </span>
 </label>
             </div>
             <div className="userName">
             <label htmlFor="name" className="relative">
   <input
     type="text"
     id="name"
     placeholder=""
     className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm  p-[10px] sm:text-md"
   />
 
   <span
     className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
   >
     Name
   </span>
 </label>
             </div>
            </>
         ): null}
 <div className="rate">
 <div className="email">
             <label htmlFor="rate" className="relative">
   <input
     type="number"
     id="rate"
     max={5}
     onChange={(e) => {
        setNumber(e.target.value)
     }}
     placeholder=""
     className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm p-[10px] sm:text-md"
   />
 
   <span
     className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
   >
     Rate
   </span>
 </label>
             </div>
 </div>
 <div>
 <label htmlFor="massege">
   <span className="text-sm font-medium text-gray-700"> Massege </span>
 
   <textarea
     id="massege"
     className="mt-0.5 w-full p-[10px] resize-none rounded border-gray-300 shadow-sm sm:text-sm"
     rows={4}
     onChange={(e) => {
        setContent(e.target.value)
     }}
   ></textarea>
 </label>
 </div>
 
 <div className="submit flex gap-[30px] justify-end">
 {/* <a
   className="inline-block rounded-sm border bg-slate-50 border-[#ccc] px-8 py-3 text-sm font-medium text-black hover:bg-red-500 hover:text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
   href="#"
   onClick={() => {
    setOpen(false)
   }}
 >
   Cancel
 </a> */}
 <input
   className="inline-block rounded-sm bg-slate-50 px-8 py-3 text-sm font-medium text-black border-[#ccc] border-[1px] transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
   value={"Send"}
   type="submit"
 />
 
  {/* <button
           type="button"
           className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
         >
           Close
         </button>
         <button
           type="button"
           className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
         >
           Save
         </button> */}
 </div>
         </form>
     </div>
 ) : null}
 </>
  )
}

export default Rate_window
