"use client"

import { Provider } from '@/app/_context/Context'
import { db } from '@/app/config'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

interface cart{
  image:string,
  count:number,
  Title:string,
  category:string,
  price:string
  id:string,
  userid:string,
  element:any
}

function Cart(props:cart) {

const data:{id:string} = useContext(Provider);
    let [count , setCount] = useState(0);
    const [newData,setNew]:any = useState(null);

    useEffect(() => {
setCount(props.count)
    },[])

   


  
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
     await updateDoc(doc(db,"users" , `${props.userid}`) , {
      cart:t
    })
    }

    
   


  return (
      <tr>
            <td className="whitespace-nowrap px-7 pr-9 py-2 text-gray-700  flex items-center gap-[30px]">
            <img src={props.image} className='aspect-square rounded-xl object-contain  w-[10%] max-xl:hidden' alt='' width={300} height={300} />
            <h1 className='font-semibold text-wrap'>{props.Title}</h1>
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{props.category}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{props.price}$</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            <div>
      <label htmlFor="Quantity" className="sr-only"> Quantity </label>
    
      <div className="flex items-center w-fit rounded-sm border border-gray-200">
        <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer" onClick={() => {


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
    
        <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer" onClick={() =>{
           setCount(count+1)
           countUp(count + 1)
          }}>
          +
        </button>
      </div>
    </div>
            </td>
    
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            <a
      className="inline-block rounded-sm bg-red-400 px-5 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
      href="#"
      onClick={() => {
        Delete(props.id)
      }}
    >
      Delete
    </a>
            </td>
          </tr>
  )
}

export default Cart
