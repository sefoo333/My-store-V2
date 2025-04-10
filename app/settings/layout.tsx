"use client"


import React, { ReactNode, useState } from 'react'
import Sidebar_settings from '../_componants/sidebar_settings'
import Profile from '../_componants/settings/Profile';
import Public from '../_componants/settings/Public';
import Navbar from '../_componants/Navbar';
import Payment from '../_componants/settings/Payment';
import { RiSidebarUnfoldFill } from 'react-icons/ri';

function Layout({children}:any) {
  const [open ,setOpen] = useState(false)

  return (
    <>
        <RiSidebarUnfoldFill onClick={() => setOpen(!open)} size={15} className='p-[10px] hidden max-xl:flex w-[50px] h-[50px] items-center justify-center bg-blue-500 text-white rounded-full fixed left-[20px] bottom-[30px] z-[99999999999]' />

        <Navbar className=" text-black" />
<div className="parent flex justify-center bg-[#f5f6f8] gap-[30px] z-[9]">
    <Sidebar_settings on={open} />
  <div className="container flex  gap-[40px] bg-[#f5f6f8] max-xl:flex-col">
{children}

  </div>
</div>
</>
  )
}

export default Layout
