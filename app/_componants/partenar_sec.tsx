"use client"

import React from 'react'
import Buttons from './_small-comps/Buttons'
import Image from 'next/image'
import Link from 'next/link'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Marquee } from './_small-comps/partenrs';
import { cn } from '@/lib/utils';
import { AnimatedShinyText } from './_small-comps/Branding';
import { ArrowRightIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next'

function Partnar_sec() {
    

    const images = [{
        image:"apple.png",
        title:"Apple",
        span:"Technolgy"
    },
{
    image:"google.png",
    title:"Google",
    span:"Activity"
},
{
    image:"hp.png",
    title:"HP",
    span:"Technolgy"
} , 
{
    image:"microsof.png",
    title:"Microsoft",
    span:"Technolgy"
} , 
{
    image:"hp.png",
    title:"samsung.png",
    span:"Technolgy"
} , 
]



const one = images.slice(0 , images.length - 1);
const two = images.slice(0 , images.length - 3);
const three = images.slice(0 , images.length - 2);

const {t} = useTranslation();

  return (
   <div className="parent relative p-parent2 overflow-hidden max-md:px-[60px] max-md:py-[30px]">
          {/* <h1 className='teeeeee'>Sefoo</h1> */}
    <div className="container flex justify-between items-center w-full max-md:flex-col max-md:items-center max-md:gap-[80px]">
        <div className="text  flex flex-col items-start max-md:items-center">
            <div
                    className={cn(
                      "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                    )}
                  >
        <AnimatedShinyText className="inline-flex items-center justify-start px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>Our Partners </span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
        </div>
            <h1 className='text-[60px] font-semibold  leading-[80px] mb-[15px] text-nowrap max-md:text-[35px] max-md:leading-[45px] max-md:text-center'>{t("partner").split(" ").slice(0,3).join(" ")}
                <span className='block'> {t("partner").split(" ").slice(3,7).join(" ")}</span></h1>
            <p className='w-[300px] text-[19px] mb-[25px] text-[#6e6e6e]'>{t("partner_par")}</p>
            {/* <Buttons Name='Explore Now' isfill={true}  className='hover:text-black px-[40px] py-[15px] rounded-md'/> */}
        </div>
        <div className="relative w-full  flex h-[500px]  md:flex-row max-xl:flex-col items-center justify-end overflow-hidden">

      <>
      
      <Marquee pauseOnHover vertical className="[--duration:20s]">
      {
    one.map((e) => (
        <div key={e.image} className={cn(
            "relative h-full w-[180px] cursor-pointer overflow-hidden rounded-xl border p-4",
            // light styles
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            // dark styles
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
          )}>
        <Image className='w-[50px] h-[50px] object-cover mb-[10px]' src={`/partenars/${e.image}`} alt='' width={200} height={200} />
        <h1 className='font-semibold text-[25px]'>{e.title}</h1>
        <p className='font-medium text-[17px] text-gray-500'>{e.span}</p>
     </div>
    ))
  }   
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
      {
    two.map((e) => (
        <div key={e.image} className={cn(
            "relative h-full w-[180px] cursor-pointer overflow-hidden rounded-xl border p-4",
            // light styles
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            // dark styles
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
          )}>
        <Image className='w-[50px] h-[50px] object-cover mb-[10px]' src={`/partenars/${e.image}`} alt='' width={200} height={200} />
        <h1 className='font-semibold text-[25px]'>{e.title}</h1>
        <p className='font-medium text-[17px] text-gray-500'>{e.span}</p>
     </div>
    ))
  }      </Marquee>
      <Marquee pauseOnHover vertical  className="[--duration:20s]">
      {
    three.map((e) => (
        <div key={e.image} className={cn(
            "relative h-full w-[180px] cursor-pointer overflow-hidden rounded-xl border p-4",
            // light styles
            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
            // dark styles
            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
          )}>
        <Image className='w-[50px] h-[50px] object-cover mb-[10px]' src={`/partenars/${e.image}`} alt='' width={200} height={200} />
        <h1 className='font-semibold text-[25px]'>{e.title}</h1>
        <p className='font-medium text-[17px] text-gray-500'>{e.span}</p>
     </div>
    ))
  }   
      </Marquee>
      </>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
    </div>
   </div>
  )
}

export default Partnar_sec
