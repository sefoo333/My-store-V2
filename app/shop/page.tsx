"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../_componants/Navbar'
import Product from '../_componants/Product'
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
import { db } from '../config';
import Link from 'next/link';
import { RiSidebarUnfoldFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

function page() {
   

const [Data,setData] = useState([])

useEffect(() => {
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products:any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(products);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  getData()
} , []);

const prices = Data.map((e:{price:string}) => {
  return +e.price
})

const max = Math.max(...prices)
const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(200);
  const minLimit = 0;
  const maxLimit = 1500;

  const handleMinChange = (e:{target:{value:string}}) => {
    const value = Number(e.target.value);
    if (value < maxPrice) setMinPrice(value);
    console.log(minPrice)
  };

  const handleMaxChange =  (e:{target:{value:string}}) => {
    const value = Number(e.target.value);
    if (value > minPrice) setMaxPrice(value);
    console.log(maxPrice)
  };

  
  const Categories = ["Laptop" , "PC" , "consoles" , "headphones" , "speakers"]
  const brands = ["Windows" , "HP" , "Playstaions" , "Xbox" , "MAC"]
  
  
  

const filter = Data.map((e:{category:string}) => {
  return e.category
})

const [rate,setRate] = useState(1);

const filter2 = Data.filter((e:any) => {
  return e.rate === rate
})

const [cart,setCart] = useState([])


  
 const [filtermoney , setFilterMoney] =useState([])
  useEffect(() => {
  const filter = Data.filter((e:{price:number}) => {
   return +e.price > minPrice && +e.price < maxPrice 
  })
  setFilterMoney(filter)
  } ,[minPrice,maxPrice])
  const [open,setOpen] = useState(false)


      const { t, i18n } = useTranslation();
  


    return (
    <>
    <RiSidebarUnfoldFill onClick={() => setOpen(!open)} size={15} className='p-[10px] hidden max-xl:flex w-[50px] h-[50px] items-center justify-center bg-blue-500 text-white rounded-full fixed left-[20px] bottom-[30px] z-50' />
    <Navbar className=" text-black" />
<div className="parent flex justify-center">
    <div className="container py-[80px] flex flex-col items-center max-xl:px-[15px]">
        <div className="head_shop p-[80px] w-[1200px] max-xl:w-fit max-xl:p-[40px] text-[#333d48] rounded-[20px] bg-linear-[(--shop)] flex flex-col items-center">

            <h1 className='text-[60px] font-semibold text-center max-xl:text-[45px]'>{t("shop")}</h1>
            <p className='w-[500px] text-[18px] text-center text-[#757585] max-xl:w-fit max-xl:text-[16px]'>{t("par_shop")}</p>
        </div>
        <div className="products_two w-full flex justify-center max-xl:flex-col px-[40px] pt-[90px]">
          {/* sidebar */}
        <div className={`sidebar w-[40%] px-[30px] max-xl:w-full max-xl:h-full max-xl:fixed duration-500 transition-all  h-screen  z-40 max-xl:top-0 bg-white max-xl:left-[-1000px] max-xl:${open ? "left-0" : "left-[-1000px]"}`}>
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


{/* Category */}
<div className="category mt-[40px]">
<h1 className='text-[25px] font-semibold w-[80%] pb-[5px] border-b-[1px] border-b-[#ccc] '>{t("category_search")}</h1>
<div className="categories w-[87%] mt-[20px]">
  {[...new Set(filter)].map((e) => (
    <div className="" key={e}>
      <Link className='category flex justify-between pr-[30px] py-[8px] cursor-pointer' href={"/category/" + e}>
{e}
<IoIosArrowForward size={20} color='#999999' className='transition-[2s] relative hover:left-[2px]' />
      </Link>
    </div>
  ))}
</div>
</div>

{/* Rate */}
<div className="rate mt-[40px]">
<h1 className='text-[25px] font-semibold w-[80%] pb-[5px] border-b-[1px] border-b-[#ccc] '>{t("Rate")}</h1>

<Select onValueChange={(e) => {
  setRate(+e)
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

{/* brands */}
<div className="products mt-[40px]">
<h1 className='text-[25px] font-semibold w-[80%] pb-[5px] border-b-[1px] border-b-[#ccc] '>{t("brands")}</h1>
<div className="categories w-[87%] mt-[20px]">
  {brands.map((e) => (
    <div className="category flex justify-between pr-[30px] py-[8px] cursor-pointer" key={e}>
{e}
<IoIosArrowForward size={20} color='#999999' className='transition-[2s] relative hover:left-[2px]' />
    </div>
  ))}
</div>
</div>
</div>

{/* products section */}
{rate > 1 ? (
         <>
         {filtermoney.length > 0 ? (
             <div className={`products relative ${filtermoney.length > 0 ? "grid grid-cols-3 max-md:grid-cols-1 max-2xl:grid-cols-2" : "text-center"} gap-[50px] w-full mt-[60px] justify-center  items-center `}>
             <>
            {filtermoney.length > 0 ? (
             <>
             {filtermoney.map((e:any) => (
               <Product Title={e.Title} count={e?.count} imagesize=""  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} key={e.id} />
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
          <div className={`products relative ${filter2.length > 0 ? "grid grid-cols-3 max-xl:grid-cols-1 max-md:grid-cols-2" : "text-center"} gap-[50px] w-full mt-[60px] justify-center  items-center `}>
          <>
         {filter2.length > 0 ? (
          <>
          {filter2.map((e:any) => (
            <Product Title={e.Title} count={e?.count} imagesize="w-full"  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} key={e.id} />
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
  
<div className={`products relative grid grid-cols-3 max-xl:grid-cols-1 max-2xl:grid-cols-2 gap-[50px] w-full mt-[60px] justify-center  items-center `}>
  <>
  {rate > 1 ? (
    <>
    {[...filtermoney , ...filter2].map((e:any) => (
 <Product Title={e.Title} category={e.category} imagesize="w-full" parentsize={"h-[60%]"}  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} id={e.id} key={e.id} />
))}
    </>
  ) : (
    (
      <div className={`products relative ${filter2.length > 0 ? "grid grid-cols-3 max-xl:grid-cols-1 max-md:grid-cols-2" : "text-center"} gap-[50px] w-full mt-[60px] justify-center  items-center `}>
      <>
     {filtermoney.length > 0 ? (
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
     )
  )}
  </>
            </div>

) :(
  <div className={`products relative grid grid-cols-3 max-md:grid-cols-1 max-2xl:grid-cols-2 gap-[50px] w-full mt-[60px] justify-center  items-center `}>
  <>
  {Data.map((e:any) => (
 <Product Title={e.Title} category={e.category} count={e?.count} imagesize="w-full" parentsize={"h-[60%]"}  Description={e.description} Rate={e.rate} price={e.price} discount={e.discount} thumb={e.image} id={e.id} key={e.id} />
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
