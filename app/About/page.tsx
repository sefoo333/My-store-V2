import Image from 'next/image'
import React from 'react'
import { Raleway } from "next/font/google";
import { NumberTicker } from './_comps/T1';
import { FaGithub , FaYoutube , FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoIosUndo } from "react-icons/io";
import Link from 'next/link';


const geistSans = Raleway({
  subsets: ["latin"],
  weight:["100","300" ,"400" , "700" , "900" , "800"]
});

function page() {
  return (
<div className={"parent flex justify-center items-center" + ` ${geistSans.className} antialiased`}>
    <div className="container flex justify-center">
        <div className="step_1 w-full h-full fixed z-1 left-0 top-0 bg-black flex justify-center items-center text-white font-semibold text-[100px]">
            <h1 className='animate-pre-start duration-500 fixed'>Hello...</h1>
        </div>
        <div className="step_2 w-full max-xl:flex-col max-xl:overflow-y-scroll h-full fixed flex  gap-[60px] left-0 top-0 z-[-1] animate-end bg-slate-950">
<div className="image w-[800px] h-full flex items-center max-xl:w-full max-xl:h-[400px]">
<Image src={"/Snapchat-833250922.jpg"} className='w-full h-full  object-cover' alt='' height={900} width={400} />
</div>
<div className="text text-white py-[70px] flex flex-col w-full justify-start items-start max-xl:w-fit max-xl:px-[10px]">
<h1 className='font-[800] max-xl:text-[40px] max-xl:leading-[50px] text-[80px] leading-[90px]'>Hello My Name is <span className='block'>SeifEldeen Ali</span></h1>
<div className="undo text-white cursor-pointer absolute right-[90px] max-xl:right-[30px] top-[40px]">
<Link href={"/"}>
<IoIosUndo size={30} />
</Link>
</div>
{/* <h1 className=' text-[120px] leading-[120px] font-[900] left-[200px] top-[38%]'>Seifeldeen <span className='block text-end relative left-[40px]'>Ali</span></h1> */}
<p className='text-justify w-[600px] mt-[40px] max-xl:w-full'>
My Name is seifeldeen Ali, I Enthusiastic and detail-oriented Frontend Developer skilled in building user interfaces with React and Next gaining. hands-on experience in developing interactive, responsive web applications. in addition to, Strong understanding of HTML, CSS, and JavaScript, with a passion for creating smooth and efficient user experiences.
My Name is seifeldeen Ali, I Enthusiastic and detail-oriented Frontend Developer skilled in building user interfaces with React and Next gaining. hands-on experience in developing interactive, responsive web applications. in addition to, Strong understanding of HTML, CSS, and JavaScript, with a passion for creating smooth and efficient user experiences.
</p>

<div className="number flex gap-[50px] mt-[40px] *:text-nowrap max-xl:flex-col max-xl:w-full">
<div className="one text-center">
<NumberTicker
      value={45}
      className="whitespace-pre-wrap text-5xl mb-[10px] font-[800] tracking-tighter text-white "
    />
    <h1 className='font-medium text-xl'>Orders</h1>
    </div>
<div className="one text-center">
<NumberTicker
      value={34}
      className="whitespace-pre-wrap text-5xl mb-[10px] font-[800] tracking-tighter text-white "
    />
    <h1 className='font-medium text-xl'>Clients</h1>
</div>
<div className="one text-center">
<NumberTicker
      value={2}
      className="whitespace-pre-wrap text-5xl mb-[10px] font-[800] tracking-tighter text-white "
    />
    <h1 className='font-medium text-xl'>Years Of Experience</h1>
</div>
  
</div>
<div className="socials mt-[30px] flex gap-[20px]">
    <div className="github rounded-full p-[10px] bg-slate-900">
        <a href="https://github.com/sefoo333" target='_blank'>
            <FaGithub size={30} />
        </a>
    </div>
    <div className="github rounded-full p-[10px] bg-blue-400">
        <a href="https://www.linkedin.com/in/sefoo333/" target='_blank'>
            <FaLinkedin size={30} />
        </a>
    </div>
    <div className="github rounded-full p-[10px] bg-red-500">
        <a href="https://www.youtube.com/@seif333" target='_blank'>
            <FaYoutube size={30} />
        </a>
    </div>
</div>

{/* <div className="switcher flex gap-[15px] flex-row-reverse mt-[30px]">
<div className="right rounded-full p-[10px] border border-blue-500 cursor-pointer">
            <FaArrowRight size={20} />
    </div>
<div className="left rounded-full p-[10px] bg-blue-500  cursor-pointer">
            <FaArrowLeft size={20} />
    </div>
</div> */}
</div>
    <h1 className='font-[900] text-[120px] absolute right-[-250px] text-white top-1/2 translate-y-[-50%] rotate-[90deg] max-2xl:hidden'>ـــ About Me ـــ</h1>
</div>
    </div>
</div>
  )
}

export default page
