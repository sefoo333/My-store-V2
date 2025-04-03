"use client"
import React, { createContext, useEffect, useState } from 'react'
import Product from '../../_componants/Product'
import { IoIosArrowForward } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GoStarFill } from 'react-icons/go';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/config';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/_componants/Navbar';
import { useTranslation } from 'react-i18next';

export const t = createContext(null)

function page() {
    const paramas = useParams();
    const id = paramas.category_id;


    const [minPrice, setMinPrice] = useState(10);
      const [maxPrice, setMaxPrice] = useState(100);
      const minLimit = 0;
      const maxLimit = 500;
    
      const handleMinChange = (e:{target:{value:string}}) => {
        const value = Number(e.target.value);
        if (value < maxPrice) setMinPrice(value);
      };
    
      const handleMaxChange =  (e:{target:{value:string}}) => {
        const value = Number(e.target.value);
        if (value > minPrice) setMaxPrice(value);
      };
    
    const [Data,setData] = useState([])
    
      useEffect(() => {
        const getData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products:any = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })).filter((e:any) => {
                return e.category === id
            });
            setData(products);
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        }
        getData()
    } , []);




    
    const [rate,setRate] = useState(1);
    
    const filter2 = Data.filter((e:any) => {
      return e.rate === rate
    })
    
      
     const [filtermoney , setFilterMoney] =useState([])
      useEffect(() => {
      const filter = Data.filter((e:any) => {
       return +e.price > minPrice && +e.price < maxPrice 
      })
      setFilterMoney(filter)
      } ,[minPrice,maxPrice])

      const {t} = useTranslation()
  return (
    <>
    <Navbar />
 <div className="parent flex justify-center py-[70px]">
    <div className="container flex flex-col items-center justify-center">
    <div className="breadChamb w-full mb-[40px]">
            <nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-1 text-sm text-gray-600">
    <li>
      <Link href="/" className="block transition hover:text-gray-700">
        <span className="sr-only"> Home </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>
    </li>

    <li className="rtl:rotate-180">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </li>

    <li>
      <Link href="/shop" className="block transition hover:text-gray-700"> Category </Link>
    </li>

    <li className="rtl:rotate-180">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </li>

    <li>
      <Link href={"/category/" + id} className="block transition hover:text-gray-700"> {id} </Link>
    </li>
  </ol>
</nav>
            </div>
    <div className="head_shop p-[80px] w-[1200px] text-[#333d48] rounded-[20px] bg-linear-[(--shop)] flex flex-col items-center">

<span className="text-blue-500 font-semibold text-xl">{t("cart_category")}</span>
<h1 className='text-[65px] font-semibold text-center'>{id}</h1>
{/* <p className='w-[500px] text-[18px] text-center text-[#757585]'>There are a many products you can buy any things likes laptop and you will enjoy it</p> */}
<div className="button mt-[25px]">
<Link
  className="inline-block rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-[16px] font-medium text-white duration-300 hover:bg-blue-700 focus:ring-3 focus:outline-hidden"
  href="/shop"
>
  {t("shop_all")}
</Link>

</div>
</div>
<div className="products_two w-full flex justify-center px-[40px] pt-[90px]">
          {/* sidebar */}
        <div className="sidebar w-[40%] px-[30px]">
{/* <div className="search">

</div> */}

{/* filter by price */}
<div className="filter_money">
<h1 className='text-[25px] w-[80%] font-semibold  pb-[5px] border-b-[1px] border-b-[#ccc] '>{t("price")}</h1>
<div className="group w-[275px]">
<div className="two grid relative mt-[20px] w-full">
  <input min={minLimit} max={maxLimit} value={minPrice} onChange={handleMinChange} type="range" className='tt col-span-2 rows-grid-2 z-10 relative' name="" id="" />
  <input min={minLimit} max={maxLimit} value={maxPrice} onChange={handleMaxChange} type="range" className='tt z-10 relative overflow-hidden' name="" id="" />
  <div className="slider w-full rounded-xl h-[5px] bg-slate-400 absolute translate-y-[-50%] top-1/2 z-[-1]">
 
  <div className="prograss  rounded-xl h-[5px] bg-[#19376D] absolute translate-y-[-50%] top-1/2 z-[1]"
  style={{
    left: `${(minPrice / maxLimit) * 100}%`,
    right: `${100 - (maxPrice / maxLimit) * 100}%`,
  }}
  ></div></div>
</div>
   <div className="two flex justify-between mt-[15px]">
    <input type="text" className='w-[68px] border-[1px] border-[#ddd] bg-slate-100 p-[5px] rounded-sm' name="" id="" value={minPrice.toString() + "$"} readOnly />
    <input type="text" className='w-[68px] border-[1px] border-[#ddd] bg-slate-100 p-[5px] rounded-sm' name="" id="" value={maxPrice.toString() + "$"} readOnly />
   </div>
</div>
</div>


{/* Rate */}
<div className="rate mt-[40px]">
<h1 className='text-[25px] font-semibold w-[80%] pb-[5px] border-b-[1px] border-b-[#ccc] '>{t("Rate")}</h1>

<Select onValueChange={(e) => {
  setRate(+e)
  console.log(rate)
}}>
      <SelectTrigger className="w-[220px] mt-[20px]">
        <SelectValue placeholder="Select a Rate" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rates</SelectLabel>
          <SelectItem value="1"><GoStarFill color='orange' /></SelectItem>
          <SelectItem value="2">
          <div className="t flex gap-[5px]">
             {Array.from(Array(2) , (e,i) => (
                   <GoStarFill key={i} color='orange' />
                 ))
               }
               </div>
          </SelectItem>
          <SelectItem value="3"> 
            <div className="t flex gap-[5px]">
             {Array.from(Array(3) , (e,i) => (
                   <GoStarFill key={i} color='orange' />
                 ))
               }
               </div>
             </SelectItem>
          <SelectItem value="4">
          <div className="t flex gap-[5px]">
             {Array.from(Array(4) , (e,i) => (
                   <GoStarFill key={i} color='orange' />
                 ))
               }
               </div>
          </SelectItem>
          <SelectItem value="5">
             <div className="t flex gap-[5px]">
             {Array.from(Array(5) , (e,i) => (
                   <GoStarFill key={i} color='orange' />
                 ))
               }
             </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
<Select />

{rate > 0 ? (
  <div className="reset mt-[15px]">
  <span
  onClick={() => {
    setRate(0)
  }}
    className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[#576CBC]"
  >
    <p className="whitespace-nowrap text-sm">Reset</p>
  
    <button
      className="-me-1 ms-1.5 inline-block rounded-full bg-blue-200 p-0.5 text-blue-700 transition hover:bg-blue-300"
    >
      <span className="sr-only">Remove rate</span>
  
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
  
  </div>
) : null}
</div>

</div>

{/* products section */}
{rate > 1 ? (
         <>
         {filtermoney.length > 0 ? (
             <div className={`products relative ${filtermoney.length > 0 ? "grid grid-cols-3" : "text-center"} gap-[50px] w-full mt-[60px] justify-center  items-start `}>
             <>
            {filtermoney.slice(0,3).length > 0 ? (
             <>
             {filtermoney.map((e:any) => (
               <Product Title={e.Title} imagesize="w-full"  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} key={e.id} />
              ))}
              </>
            ) : (
             <div className="grid h-screen place-content-center bg-white px-4">
             <h1 className="uppercase tracking-widest text-gray-500">Oops ! ,  The store is empty or the intrnet is not Good</h1>
           </div>
            )}
             </>
             </div>
         ) : (
          <div className={`products relative ${filter2.length > 0 ? "grid grid-cols-3" : "text-center"} gap-[50px] w-full mt-[60px] justify-center  items-start `}>
          <>
         {filter2.slice(0,3).length > 0 ? (
          <>
          {filter2.map((e:any) => (
            <Product Title={e.Title} imagesize="w-full"  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} key={e.id} />
           ))}
           </>
         ) : (
          <div className="grid h-screen place-content-center bg-white px-4">
          <h1 className="uppercase tracking-widest text-gray-500">Oops ! ,  The store is empty or the intrnet is not Good</h1>
        </div>
         )}
          </>
          </div>
         )}
         </>
) : filtermoney.length > 0 ? (
  
<div className={`products relative grid grid-cols-3 gap-[50px] w-full mt-[60px] justify-center  items-start `}>
  <>
  {filtermoney.slice(0,3).map((e:any) => (
 <Product Title={e.Title} category={e.category} imagesize="w-full" parentsize={"h-[60%]"}  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} id={e.id} key={e.id} />
))}
  </>
            </div>

) :(
  <div className={`products relative grid grid-cols-3 gap-[50px] w-full mt-[60px] justify-center  items-start `}>
  <>
  {Data.slice(0,3).map((e:any) => (
 <Product Title={e.Title} category={e.category} imagesize="w-full" parentsize={"h-[60%]"}  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} id={e.id} key={e.id} />
))}
  </>
            </div>
)}

        </div>
    </div>
 </div>
 </>
  )
}

export default page
