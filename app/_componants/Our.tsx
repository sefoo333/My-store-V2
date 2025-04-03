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

function Our() {

 const data = useContext(Provider)
    const [products , setPrducts]:any = useState([])


const {t} = useTranslation();

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
    
                <h1 className='font-semibold text-[60px] max-md:text-5xl  max-md:mt-[10px] text-nowrap'>{t("our")}</h1>
            </div>
            <div className="panel relative w-full">

              {/* <span className='text-[54px] absolute left-[-75px] top-1/2 transltae-y-[-50%] z-30 cursor-pointer' onClick={() => {
                product.current.scrollBy(-350,0)
              }}>
                <MdKeyboardArrowLeft />
              </span> */}
            <div className="cccy relative  overflow-x-hidden w-full scroll-smooth" ref={product} onClick={(e) => {
            }}>
            <div className={`products relative grid grid-cols-4 w-full mt-[60px] justify-start justify-items-center  max-xl:grid-cols-2 max- max-md:grid-cols-1`}>
            {products.slice(0,8).map((e:any) => (
 <Product Title={e.Title} category={e.category} imagesize="w-full" Description={e.description} Rate={5} price={e.price} discount={e.discount} thumb={e.image} id={e.id} key={e.id} />
))}
           
            </div>
            </div>
            {/* <span className='text-[54px] absolute right-[-60px] top-1/2 transltae-y-[-50%] z-30 cursor-pointer'  onClick={() => {
                product.current.scrollBy(350,0)
              }}><MdKeyboardArrowRight /></span>
            Next */}
        </div>
        .
         <div className="button flex justify-center items-center mt-[50px]">
         <Buttons Name={t("all_products")} isfill={true} className='px-[40px] py-[15px] hover:text-black' />
         </div>
    </div>
    </div>

  )
}

export default Our
