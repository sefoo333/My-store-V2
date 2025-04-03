"use client"

import React, { useRef, useState } from 'react'
import { AnimatedShinyText } from './_small-comps/Branding'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { GoStarFill } from 'react-icons/go'
import { FaArrowRight , FaArrowLeft  } from "react-icons/fa6";
import { AnimatedTestimonials } from './_small-comps/Than'
import { useTranslation } from 'react-i18next'

function Thanks() {

    const images = [{
        image:"/personal1.jpg",
        id:1,
    },
{
    image:"/personal2.jpg",
    id:2,
},
{
    image:"/personal3.jpg",
id:3,
}
]

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Seifeldeen Ali",
    designation: "Store Owner",
    src: "/personal3.jpg",
    rates:5
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Mohamed Ali",
    designation: "store client",
    src: "/personal2.jpg",
    rates:5
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Gamal Mostafa",
    designation: "store client",
    src: "/personal1.jpg",
    rates:5
  }
];


const {t} = useTranslation();
    const [selector,setSelector] = useState(0)
  return (
    <>
    <div>
      <div className="parent p-parent2 max-xl:px-[55px] max-xl:py-[30px] ">
        <div className="container">
        <div className="main text-center">
            <div className="z-10 flex items-center justify-center ">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className='tracking-[3px]'>Testimonials </span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
    
                <h1 className='font-semibold text-[60px] max-xl:text-[40px]'>{t("tests")}</h1>
            </div>
           
            <div className="content">
              <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
            </div>
        </div>
      </div>
    </div>

    
    </>
  )
}

export default Thanks
