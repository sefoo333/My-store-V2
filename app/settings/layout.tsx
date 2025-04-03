"use client"


import React, { ReactNode } from 'react'
import Sidebar_settings from '../_componants/sidebar_settings'
import Profile from '../_componants/settings/Profile';
import Public from '../_componants/settings/Public';
import Navbar from '../_componants/Navbar';
import Payment from '../_componants/settings/Payment';

function Layout({children}:any) {

  return (
    <>
        <Navbar className=" text-black" />
<div className="parent flex justify-center bg-[#f5f6f8] gap-[30px]">
  <Sidebar_settings />
  <div className="container flex  gap-[40px] bg-[#f5f6f8] max-xl:flex-col">
{children}

  </div>
</div>
</>
  )
}

export default Layout
