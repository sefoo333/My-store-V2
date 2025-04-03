
"use client"
import React from 'react'
import Buttons from './_small-comps/Buttons'
import Image from 'next/image'
import "../globals.css"
import { BlurFade } from './_small-comps/Landing_heading'
import { AnimatedShinyText } from './_small-comps/Branding'
import { ArrowRightCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

function Landing() {
  const {t} = useTranslation()
  return (
<div className="f">
<div className="parent-home px-[150px] py-[80px] bg-[#576CBC] max-md:px-[50px] max-xl:py-[30px]">
    <div className="container grid grid-cols-2  items-center h-home max-xl:h-screen max-xl:flex max-xl:justify-center max-xl:flex-col">
        <div className="text-white sss max-md:text-center">
       
          {/* <span className='font-medium text-[18px] tracking-wider '>Great Electric Store</span> */}
           
          
    <h1 className='text-[80px] font-semibold leading-[1.3] mb-[15px] max-md:w-full max-md:text-5xl max-md:text-center'> 
    <BlurFade delay={2.25} inView>
        {t("landing_title").split(" ").slice(0,2).join(" ")}
      </BlurFade>
      <BlurFade delay={2.50} inView>
      {t("landing_title").split(" ").slice(2,t("landing_title").length).join(" ")}
      </BlurFade>
    </h1>
<div className="par max-xl:flex max-xl:justify-center">
<p className='text-[19px] max-xl:w-[80%] w-[450px] pb-[40px] text-[#e6e5e5fa] '>{t("landing_head")}</p>
</div>
           <div className="buttons flex gap-[30px] max-md:text-nowrap max-xl:w-fit">
           
           <Link href={"/shop"}>
           <Buttons Name={t("get_started")} className="px-[40px] py-[15px] max-xl:px-[30px]" isfill={true} />
           </Link>
<Link href={"#Our"}>
<Buttons Name={t("shop_button")} className="px-[40px] py-[15px] max-xl:px-[30px]" isfill={false} />
</Link>
           </div>
        </div>
<BlurFade delay={2.50} inView>
       <div className="image flex justify-end max-md:hidden">
       <div className="imagee flex justify-center items-center">


<Image src={"/Beautiful_gaming_headphone_-6-removebg-preview (1).png"} alt='image' width={600} height={600} />

        </div>
       </div>
</BlurFade>
    </div>
</div>
</div>
  )
}

export default Landing
