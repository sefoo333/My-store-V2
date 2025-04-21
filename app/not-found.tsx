import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

function notFound({err}:any) {
    console.log(err)
  return (
<div className="parent flex justify-center items-center w-full h-screen">
    <div className="container flex justify-center items-center flex-col">
        <h1 className='font-extrabold text-[90px] mb-0'>404</h1>
        <h2 className='text-gray-700 text-[18px] mt-[-16px]'>Oops, You page is Not Found</h2>
<Button className='font-semibold mt-[25px] text-[16px]  cursor-pointer p-[20px]'>
<Link href={"/"}>
Return To Home
</Link>
</Button>
    </div>
</div>
  )
}

export default notFound
