"use client"
import React from 'react'
import Profile from '@/app/_componants/settings/Profile';
import Payment from '@/app/_componants/settings/Payment';
import Public from '@/app/_componants/settings/Public';
import { useParams } from 'next/navigation';
function page() {
  
  const params = useParams()
  const set_id = params.set_id;
    return (
    <>
      {set_id === "profile" ? (
        <Profile />
      ) : set_id === "payment" ? (
        <Payment />
      ) : (
        <Public />
      )}
    </>
  )
}

export default page
