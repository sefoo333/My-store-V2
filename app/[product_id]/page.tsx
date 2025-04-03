"use client"
import React, { createContext, FC, use, useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../_componants/Navbar'
import { GoStarFill } from 'react-icons/go'
import { TbTruckDelivery } from "react-icons/tb";
import { FaMoneyBillWave } from "react-icons/fa6";
import Product from '../_componants/Product'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../config'
import { IoCheckmarkCircle } from "react-icons/io5";
import { Provider } from '../_context/Context'
import Rate_window from '../_componants/Rate_window'
import { toast, Toaster } from 'sonner'
import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../_componants/Carsoual'

export const Rates = createContext(true)



function page({params}:any) {

  const [count,setCount] = useState(1)
  const { Product_id }:any = use(params);



const [isZoomed, setIsZoomed] = useState(false);
  const imgRef:any = useRef(null);

  const handleMouseMove = (e:any) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;

    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    imgRef.current.style.transformOrigin = "center center";
  };


  const [data, setData]:any = useState({description:"" , rate:{count:0,rate:"5/5"}})
  const [data22, setData2]:any = useState([])
  useEffect(() => {
    const getData = async () => {
    const data2:any =  (await getDoc(doc(db,"products" , `${Product_id}`))).data();
    console.log(data)
    setData({
      id:Product_id,
      ...data2
    })
    }
    const getData2 = async () => {
    const data2:any =  (await getDocs(collection(db,"products")))
    data2.forEach((e:any) => {
      data22.push(e.data())
      setData2(data22)
    })
  }
    return () => {
      getData()
      getData2()
    }
  },[])
console.log(data)




const user:any = useContext(Provider)
    const [cart,setCart] = useState(0)
    const [wishlist,setWishlist] = useState(0)

    const addToCart = async () => {
      await updateDoc(doc(db,"users" , `${user?.id}`) , {
        cart:arrayUnion({
          Title:data.Title,
          image:data.image[0],
          category:data.category,
          price:data.price,
          count: count, // Increase count
          id:data.id
        })
      })

    }

    const [done,setDone] = useState(false)


const split = Object.assign({} , data.informations);
const values:string[] = Object.values(split);
const keys = Object.keys(split);
console.log(data.rate.personals?.[0])

const [rate_window,setWindow]:any = useState(false);

const [allRates,setallRates] = useState(0)

 useEffect(() => {
  if (typeof(data?.reviews) !== "undefined"){
    setallRates(data?.reviews?.map((e:{rate_nums:string}) => {
      return +e.rate_nums
    })?.reduce((a:number,b:number) => {
      return a + b
    }))
  } 
 
},[])
const { t, i18n } = useTranslation();



  return (
    <>
    <Toaster />
    <Navbar className="text-black" />
<Rates.Provider value={setWindow}>
{rate_window ? (
      <Rate_window id_product={`${Product_id}`} />

) : null}
</Rates.Provider>
    <div className="parent py-[80px] flex justify-center">
        <div className="container flex flex-col items-center max-xl:px-[5px]">
          {/* breadChumb first page */}
            <div className="breadChamb w-full">
            <nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-1 text-sm text-gray-600">
    <li>
      <a href="#" className="block transition hover:text-gray-700">
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
      </a>
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
      <a href="#" className="block transition hover:text-gray-700"> Products </a>
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
      <a href="#" className="block transition hover:text-gray-700"> {Product_id} </a>
    </li>
  </ol>
</nav>
            </div>
            {/* The Head Product */}
            <div className="main mt-[50px] max-xl:flex-col-reverse max-xl:w-fit flex justify-center gap-[50px] flex-row-reverse w-full">
                <div className="content">
                <div className="text basis-1/2">
<h1 className='text-[40px] font-semibold w-[500px] max-xl:w-fit'>{data.Title}</h1>
<p className='w-[400px] text-[#120b0b] max-xl:w-fit'>{data.description.split(" ").slice(0,11).join(" ")}</p>
<div className="rates flex gap-[10px] items-end my-[15px] ">
    <div className="group text-[22px] mt-[10px] flex text-orange-400">
       {Array.from(Array(data.rate) , (e,i) => (
           <GoStarFill key={i} />
         ))
       }
  </div>
  <span>({data.count})</span>
</div>
<h3 className='text-[35px] font-semibold'><span className='font-semibold text-[22px]'>{user?.price === "EG" ? (<>{(+data.price * 50.57).toFixed(0)}<span className='text-[17px]'>{t("EG")}</span></>) : user?.price === "SAR" ? (<>{(+data.price * 3.75).toFixed(0)}<span className='text-[17px]'>{t("SAR")}</span></>) : `${data.price}$`}</span>
</h3>
<div className="counter mt-[30px]">
<div className="flex items-center w-fit rounded-full border border-gray-200">
        <button type="button" className="size-12 leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer" onClick={() => count > 0 ? setCount((e) => e-1) : null}>
          &minus;
        </button>
    
        <input
          type="number"
          id="Quantity"
          value={count}
          readOnly
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
    
        <button type="button" className="size-12 leading-10 text-gray-600 transition hover:opacity-75 cursor-pointer" onClick={() => setCount(count+1)}>
          +
        </button>
      </div>
</div>
                </div>
                <div className="buttons flex gap-[30px] mt-[30px] w-full">
                <a
  className=" transition-[0.5s] text-nowrap flex items-center justify-center gap-3 relative rounded-full w-full text-center  border border- bg-[#19376D] px-12 py-4 text-md font-semibold text-white hover:bg-transparent hover:text-[#19376D] focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => {
    addToCart()
    setDone(true)
    toast.success("The Product in Cart")
  }}
>
  {t("add_cart")} {done ? (<IoCheckmarkCircle size={20}  />) : null}
</a>
<a
  className="inline-block text-nowrap transition-[0.5s] rounded-full w-full  text-center border border-[#19376D] px-12 py-4 text-md font-semibold text-[#19376D] hover:bg-[#19376D] hover:text-white focus:ring-3 focus:outline-hidden"
  href="#"
>
{t("order")}
</a>
                </div>
                <div className="features my-[40px] p-[20px] gap-[20px] rounded-2xl flex flex-col border-[1px] border-[#ccc]">
<div className="card flex gap-[30px]  rounded-2xl ">
<TbTruckDelivery className='text-[40px] text-[#19376D] ' />
<div className="text">
<h1 className='text-[25px] font-semibold'>{t("delivery")}</h1>
<p>{t("delivery_par")}</p>
</div>
</div>
<div className="t w-full flex justify-center">
<hr className='w-[90%] ' />
</div>
<div className="card flex gap-[30px]  rounded-2xl ">
<FaMoneyBillWave className='text-[40px] text-[#19376D] ' />
<div className="text">
<h1 className='text-[25px] font-semibold'>{t("return")}</h1>
<p>{t("return_par")}</p>
</div>
</div>
                </div>
                </div>
                <div className="images flex  basis-[50%] flex-col relative">
                  <div className="images2 relative">
                 <div className="group relative">
                
               <div className="max-xl:flex max-xl:justify-center max-xl:w-full">
               <Carousel className='w-[600px] h-[600px] bg-slate-200 rounded-xl max-xl:w-[300px] max-xl:h-[300px]'>
  <CarouselContent className='max-xl:w-fit max-xl:h-fit'>
    {data?.images?.map((e:any , a:number) => (
                 <CarouselItem id={e} key={a}>
      <div className={`image w-[600px] h-[600px] max-xl:w-full max-xl:h-full `}
              
      >
                   <img src={e} key={a} alt='' width={600} className={`bg-gray-100  aspect-square object-contain rounded-2xl p-[10px] max-xl:w-fit max-xl:h-fit ${isZoomed ? 'scale-150' : 'scale-100'}`} 
                 ref={imgRef}
                 onMouseMove={handleMouseMove}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 height={600} />

                </div>
                </CarouselItem>
                               ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext  />
</Carousel>
               </div>
                 
                 </div>
                    <div className="group flex gap-[20px] mt-[20px] pl-[50px]">
                    {data?.images?.map((e:any , a:number) => (
                 <a href={`#${e}`} key={a}>
                 <img src={e} alt='' width={150} id={e} className='bg-gray-100  aspect-square object-contain rounded-2xl p-[10px]' height={150} />
                 </a>
               ))}
                    </div>
                  </div>
                </div>
            </div>

            {/* about product */}
            <div className="description text-justify mt-[60px] w-[80%]">
              <p>{data.description}</p>
            </div>
            {/* deatils product => (weight - inc...) */}
            <div className="details_reviews w-full mt-[90px] ">
              <div className="buttons hidden w-full text-center my-[30px] relative before:w-full before:absolute before:h-[1px] before:bg-gray-200 before:left-0 before:z-[-1] before:top-1/2 before:translate-[-50%,-50%]">
              <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-xs">
  <button
    className="inline-block cursor-pointer px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:relative"
  >
    Details
  </button>

  <button
    className="inline-block cursor-pointer px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:relative"
  >
    Reviews
  </button>
</span>
              </div>
              {/* details information */}
              <div className="details w-full flex  justify-center mt-[30px]">
              <div className="overflow-x-auto w-[80%]">
  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
    <tbody className="divide-y divide-gray-200 border-[1px] border-gray-200 w-1/2">
    {keys.map((key , index:number) => (
      <tr key={index} className="odd:bg-gray-50 flex gap-[50px] py-[10px] px-[15px] justify-start">
      <th className={` px-4 py-2 font-semibold text-gray-900 ${user?.lang !== "ar" ? "border-r-[1px]" : "border-l-[1px]"} border-gray-200 basis-[10%]`}>{key}</th>
        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{values[index]}</td>
      </tr>
    ))}
     
  
     

    
    </tbody>
  </table>
</div>
              </div>
            </div>
            {/* reviews */}
            <div className="reviews mt-[90px] grid grid-cols-2 gap-[100px] justify-items-center max-xl:grid-cols-1">
              
              {/* reviews people */}
            <div className="people_rates">
            <h1 className='text-[25px] font-semibold pb-5'>{t("Rate")} </h1>
  <div className="persons overflow-y-scroll h-[550px]">
  {data?.reviews?.map((e:any) => (
    <div className="person p-[10px]" key={e.Name}>
    <div className="two flex justify-between">
    <div className="profile flex items-center gap-[25px] ">
      <img src={`${e.image}`} alt='' className='w-[50px] h-[50px] object-cover rounded-full' width={200} height={200} />
      <h1 className='text-[20px] font-semibold'>{e.Name}</h1>
    </div>
    <div className="rates text-[17px] mt-[10px] flex text-orange-400">
       {Array.from(Array(+e.rate_nums) , (e,i) => (
           <GoStarFill key={i} />
         ))
       }
    </div>
    </div>
    <div className="the_rate w-[500px] py-[20px]">
      <p>{e.rate_content}</p>
    </div>
    </div>
   
  ))}
  </div>
</div>
              {/* reviews panel */}
<div className="rates_group">
  <h1 className='text-[25px] font-semibold pb-0'>{t("users_review")} <span className='text-[12px] text-gray-400'>({data?.reviews?.length})</span></h1>
 <div className="rates flex gap-[5px] items-end mb-[20px]">
 <div className="rates text-[22px] mt-[10px] flex text-orange-400">
     {Array.from(Array(5) , (e,i) => (
         <GoStarFill key={i} />
       ))
     }
     </div>
{data?.reviews ? (
       <span className='text-gray-600 text-sm'>{Math.floor(allRates / data?.reviews?.length)}/5</span>

):(1)}
 </div>

 <div className="rates_ranges flex gap-[30px] flex-col w-fit">
  <div className="range flex justify-between gap-[50px] max-xl:justify-start max-xl:gap-[20px]">
    <h1 className='font-semibold'>5 Rates</h1>

    <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    className="block rounded-md bg-gray-200 w-[300px] max-xl:w-[200px]"
  >
    <span className="block h-6 rounded-md bg-[#576CBC]" style={{width:`${((data?.reviews?.filter((e:any) => e.rate_nums === "5").length / data?.reviews?.length) * 100).toFixed()}%`}}></span>
  </span>

<h1>{((data?.reviews?.filter((e:any) => e.rate_nums === "5").length / data?.reviews?.length) * 100).toFixed()}%</h1>
  </div>
 
  <div className="range flex justify-between gap-[50px] max-xl:justify-start max-xl:gap-[20px]">
  <h1 className='font-semibold'>4 Rates</h1>

    <div>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    className="block rounded-md bg-gray-200 w-[300px] max-xl:w-[200px]"
  >
    <span className="block h-6 rounded-md bg-[#576CBC]" style={{width:`${((data?.reviews?.filter((e:any) => e.rate_nums === "4").length / data?.reviews?.length) * 100).toFixed()}%`}}></span>
    </span>
</div>

<h1>{((data?.reviews?.filter((e:any) => e.rate_nums === "4").length / data?.reviews?.length) * 100).toFixed()}%</h1>
</div>
 
<div className="range flex justify-between gap-[50px] max-xl:justify-start max-xl:gap-[20px]">
<h1 className='font-semibold'>3 Rates</h1>

    <div>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    className="block rounded-md bg-gray-200 w-[300px] max-xl:w-[200px]"
  >
    <span className="block h-6 rounded-md bg-[#576CBC]" style={{width:`${((data?.reviews?.filter((e:any) => e.rate_nums === "3").length / data?.reviews?.length) * 100).toFixed()}%`}}></span>
    </span>
</div>

<h1>{((data?.reviews?.filter((e:any) => e.rate_nums === "3").length / data?.reviews?.length) * 100).toFixed()}%</h1>
</div>
 
<div className="range flex justify-between gap-[50px] max-xl:justify-start max-xl:gap-[20px]">
<h1 className='font-semibold'>2 Rates</h1>

    <div>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    className="block rounded-md bg-gray-200 w-[300px] max-xl:w-[200px]"
  >
    <span className="block h-6 rounded-md bg-[#576CBC]" style={{width:`${((data?.reviews?.filter((e:any) => e.rate_nums === "2").length / data?.reviews?.length) * 100).toFixed()}%`}}></span>
    </span>
</div>

<h1>{((data?.reviews?.filter((e:any) => e.rate_nums === "2").length / data?.reviews?.length) * 100).toFixed()}%</h1>
</div>
 
<div className="range flex justify-between gap-[50px] max-xl:justify-start max-xl:gap-[20px]">
<h1 className='font-semibold'>1 Rate</h1>

    <div>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    className="block rounded-md bg-gray-200 w-[300px] max-xl:w-[200px]"
  >
    <span className="block h-6 rounded-md bg-[#576CBC]" style={{width:`${((data?.reviews?.filter((e:any) => e.rate_nums === "1").length / data?.reviews?.length) * 100).toFixed()}%`}}></span>
  </span>
</div>

<h1>{((data?.reviews?.filter((e:any) => e.rate_nums === "1").length / data?.reviews?.length) * 100).toFixed()}%</h1>
</div>
 
  
 </div>
 <div className="create">

 {data?.reviews?.filter((e:any) => e.userid !== user?.id).length === 0 ? (
 <button
  className="inline-block cursor-pointer transition-[0.5s] rounded-full w-fit mt-[30px] text-center  border bg-[#19376D] px-9 py-3 text-sm font-semibold text-white hover:bg-transparent hover:text-[#19376D] focus:ring-3 focus:outline-hidden"
  onClick={() => {
    setWindow(!rate_window)
  }}
>
  {t("review")}
</button>
 ):null}
 </div>
</div>

{/* recommend products */}
            </div>
            <div className="fetured_products mt-[130px]">
            <h1 className='font-semibold text-[50px] text-center'>{t("recommend")}</h1>
            <div className={`products relative grid grid-cols-4 gap-[50px] w-full mt-[60px] justify-center  items-center max-xl:grid-cols-1 max-xl:w-fit `}>
  <>
  {data22.slice(0,4).map((e:any) => (
 <Product Title={e?.Title} category={e?.category} imagesize="w-full"  Description={e?.description} Rate={e.rate} price={e?.price} discount={e?.discount} thumb={e?.image} id={e?.id} key={e?.id} />
))}
  </>
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default page
