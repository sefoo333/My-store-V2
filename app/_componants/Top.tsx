// "use client"

// import { cn } from '@/lib/utils'
// import React, { useRef } from 'react'
// import { AnimatedShinyText } from './_small-comps/Branding'
// import { ArrowRightIcon } from 'lucide-react'
// import {FiHeart , FiShoppingCart } from "react-icons/fi";
// import { GoStarFill } from "react-icons/go";
// import { MdKeyboardArrowRight , MdKeyboardArrowLeft  } from "react-icons/md";
// import Buttons from './_small-comps/Buttons'

// function Top() {


//     const products:any = [{
//         Title:"Laptop HD GTX 1080",
//         Description:"loream loream loream loream  lorema",
//         Rate:5,
//         price:200,
//         discont:20,
//         Default:"USD",
//      thumb:"/laptop.png",
//        images:["/laptop.png"],
//       Reviews:0,
//       changeable:false,
//       id:1,
//       buys:3,
//     },
//     {
//         Title:"Laptop HD GTX 1080",
//         Description:"loream loream loream loream  lorema",
//         Rate:5,
//         price:200,
//         discont:0,
//         Default:"USD",
//      thumb:"/laptop.png",
//        images:["/laptop.png"],
//       Reviews:0,
//       changeable:true,
//       id:2,
//       buys:10,
//     },
//     {
//         Title:"Laptop HD GTX 1080",
//         Description:"loream loream loream loream  lorema",
//         Rate:5,
//         price:200,
//         discont:0,
//         Default:"USD",
//      thumb:"/laptop.png",
//        images:["/laptop.png"],
//       Reviews:0,
//       changeable:false,
//       id:3,
//       buys:2,
//     }

// ]

// const product:any = useRef(null) 
//   return (
//     <div className="parent relative p-parent2">
//         <div className="container ">
//             <div className="main text-center">
//             <div className="z-10 flex items-center justify-center ">
//       <div
//         className={cn(
//           "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
//         )}
//       >
//         <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
//           <span className='tracking-[3px]'>Exclusive</span>
//           <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
//         </AnimatedShinyText>
//       </div>
//     </div>
    
//                 <h1 className='font-semibold text-[60px]'>Top Selling</h1>
//             </div>
//             <div className="panel relative">

             
//             <div className="cccy relative  overflow-x-hidden scroll-smooth" ref={product} onClick={(e) => {
//             }}>
//             <div className="products relative flex gap-[50px] w-full  mt-[60px] justify-center  items-center">
// {products.map((e:any) => (
//  <div key={e.id}>
//  {e.buys > 5 ? (
//    <div className="product relative bottom-[35px] overflow-hidden flex flex-col" key={e.id}>
//    <a href="#" className="group block" >
//  <div className="image relative group-hover:">
//  {e.discont > 0 ? (
//    <span className='Discount absolute text-[17px] font-extralight text-white px-[15px] py-[5px] bg-red-400 left-[15px] top-[30px] rounded-sm'>-{e.discont}%</span>
//  ) : null}
//  <img
//     src={e.thumb}
//     alt=""
//     className="aspect-square w-full rounded-xl object-contain bg-[#f2f2f2] h-full" style={{userSelect:"none"}}
//   />
//  <div className="wishlist transition-[0.8s] ease-in-out w-[50px] h-[50px] flex justify-center items-center absolute right-[-50px] top-[30px]  text-black rounded-full bg-slate-50">
//     <FiHeart size={25} />
//   </div>
//   <div className="cart transition-[0.8s] ease-in-out w-[50px] h-[50px] flex justify-center items-center absolute right-[-50px] top-[90px]  text-black rounded-full bg-slate-50">
//     <FiShoppingCart size={25} />
//   </div>
//  </div>

//   <div className="mt-3">
//     <h3 className="text-[20px] font-medium text-gray-900 transition-[0.8s] group-hover:text-gray-600 ">
//       {e.Title}
//     </h3>

//     <p className="mt-1 text-md text-gray-700">${e.price}</p>
//   </div>
// <div className="rates text-[22px] mt-[10px] flex text-orange-400">
// {Array.from(Array(e.Rate) , (e,i) => (
//     <GoStarFill key={i} />
//   ))
// }
// </div>

// </a>
//  </div>
//  ) : (
//   <div className="product relative overflow-hidden flex flex-col" key={e.id}>
//   <a href="#" className="group block" >
// <div className="image relative group-hover:">
// {e.discont > 0 ? (
//   <span className='Discount absolute text-[17px] font-extralight text-white px-[15px] py-[5px] bg-red-400 left-[15px] top-[30px] rounded-sm'>-{e.discont}%</span>
// ) : null}
// <img
//    src={e.thumb}
//    alt=""
//    className="aspect-square w-full rounded-xl object-contain bg-[#f2f2f2] h-full" style={{userSelect:"none"}}
//  />
// <div className="wishlist transition-[0.8s] ease-in-out w-[50px] h-[50px] flex justify-center items-center absolute right-[-50px] top-[30px]  text-black rounded-full bg-slate-50">
//    <FiHeart size={25} />
//  </div>
//  <div className="cart transition-[0.8s] ease-in-out w-[50px] h-[50px] flex justify-center items-center absolute right-[-50px] top-[90px]  text-black rounded-full bg-slate-50">
//    <FiShoppingCart size={25} />
//  </div>
// </div>

//  <div className="mt-3">
//    <h3 className="text-[20px] font-medium text-gray-900 transition-[0.8s] group-hover:text-gray-600 ">
//      {e.Title}
//    </h3>

//    <p className="mt-1 text-md text-gray-700">${e.price}</p>
//  </div>
// <div className="rates text-[22px] mt-[10px] flex text-orange-400">
// {Array.from(Array(e.Rate) , (e,i) => (
//    <GoStarFill key={i} />
//  ))
// }
// </div>

// </a>
// </div>
//  )}
//  </div>
// ))}
//             </div>
//             </div>
           
//         </div>
       
//     </div>
//     </div>

//   )
// }

// export default Top



"use client"

import { cn } from '@/lib/utils'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AnimatedShinyText } from './_small-comps/Branding'
import { ArrowRightIcon } from 'lucide-react'
import {FiHeart , FiShoppingCart } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { MdKeyboardArrowRight , MdKeyboardArrowLeft  } from "react-icons/md";
import Buttons from './_small-comps/Buttons'
import Product from './Product'
import { Provider } from '../_context/Context'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config'
import { useTranslation } from 'react-i18next'

function Top() {

 const data = useContext(Provider)
    const [products , setPrducts]:any = useState([])



useEffect(() => {
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products:any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPrducts(products);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  getData()
} , []);


const {t} = useTranslation()
const product:any = useRef(null) 
  return (
    <div className="parent p-parent2 max-xl:px-[60px] max-xl:py-[30px]">
        <div className="container ">
            <div className="main text-center">
            <div className="z-10 flex items-center justify-center ">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className='tracking-[3px]'>Creative</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
    
                <h1 className='font-semibold text-[60px] max-xl:text-[40px]'>{t("Top")}</h1>
            </div>
            <div className="panel relative">

              {/* <span className='text-[54px] absolute left-[-75px] top-1/2 transltae-y-[-50%] z-30 cursor-pointer' onClick={() => {
                product.current.scrollBy(-350,0)
              }}>
                <MdKeyboardArrowLeft />
                {/* previous 
              </span> */}
            <div className="cccy relative  overflow-x-hidden scroll-smooth" ref={product} onClick={(e) => {
            }}>
            <div className={`products relative grid grid-cols-4 max-md:grid-cols-1 max-xl:grid-cols-2 w-full mt-[60px] justify-start justify-items-center `}>
            {products.slice(0,4).map((e:any) => (
 <Product Title={e.Title} category={e.category} count={e?.count} imagesize="w-full" Description={e.description} Rate={5} price={e.price} discount={e.discount} thumb={e.image} id={e.id} key={e.id} />
))}
            </div>
            </div>
            {/* <span className='text-[54px] absolute right-[-60px] top-1/2 transltae-y-[-50%] z-30 cursor-pointer'  onClick={() => {
                product.current.scrollBy(350,0)
              }}><MdKeyboardArrowRight /></span>
            Next */}
        </div>
        .
         {/* <div className="button flex justify-center items-center mt-[50px]">
         <Buttons Name='All Products' isfill={true} className='px-[40px] py-[15px] hover:text-black' />
         </div> */}
    </div>
    </div>

  )
}

export default Top
