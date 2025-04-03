import React from 'react'
import Buttons from './_small-comps/Buttons'
import Image from 'next/image'
import "../globals.css"
import { BlurFade } from './_small-comps/Landing_heading'
import { AnimatedShinyText } from './_small-comps/Branding'
import { ArrowRightCircle } from 'lucide-react'

function Landing() {
  return (
<div className="f">
<div className="parent-home px-[150px] py-[80px] bg-[#576CBC] max-md:px-[50px] max-xl:py-[30px]">
    <div className="container grid grid-cols-2  items-center h-home max-xl:h-screen max-xl:flex max-xl:justify-center max-xl:flex-col">
        <div className="text-white sss max-md:text-center">
       
          {/* <span className='font-medium text-[18px] tracking-wider '>Great Electric Store</span> */}
           
          
    <h1 className='text-[80px] font-semibold leading-[1.3] max-md:w-full max-md:text-5xl max-md:text-center'> 
    <BlurFade delay={2.25} inView>
        Upgrade With
      </BlurFade>
      <BlurFade delay={2.50} inView>
        Sefoo Store
      </BlurFade>
    </h1>
            <p className='text-[19px] w-[450px] max-md:w-fit pb-[40px] text-[#e6e5e5fa] '>Sefoo store is electronic store for buy consoles , PC , phones</p>
           <div className="buttons flex gap-[30px] max-md:text-nowrap">
           <Buttons Name="Get Started" className="px-[40px] py-[15px]" isfill={true} />
           <Buttons Name="Shop Now" className="px-[40px] py-[15px]" isfill={false} />
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
