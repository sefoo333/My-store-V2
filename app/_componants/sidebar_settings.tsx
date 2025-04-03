"use client"

import Image from 'next/image'
import React from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsFillCreditCardFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function Sidebar_settings(props:any) {


  const {t} = useTranslation();

  return (
    <div className={`flex h-screen max-xl:z-[9999999] flex-col justify-between border-e border-gray-100 bg-white  duration-500  max-xl:w-full max-xl:fixed max-xl:flex  max-xl:h-full ${!props.on ? "max-xl:opacity-100 max-xl:left-0" : "max-xl:opacity-0 max-xl:left-[-1000px]"}`}>
    <div className="px-4 py-6">
  <Image src={"/logo_black.png"} alt='' width={300} height={100} className='h-[55px] object-cover' />
  
      <ul className="mt-6 space-y-1">
        <li>
          <Link
            href={"/settings/profile"}
            className=" rounded-lg flex font-semibold gap-[5px] text-[16px] items-center  px-4 py-3  text-gray-700"
          >
           <IoPersonCircleSharp className='mr-[10px]' size={24} /> {t("profile")}
          </Link>
        </li>
  
       
        <li>
          <Link
            href={"/settings/payment"}
            className=" rounded-lg flex font-semibold gap-[5px] text-[16px] items-center  px-4 py-3  text-gray-700"
          >
                     <BsFillCreditCardFill className='mr-[10px]' size={20} /> 
                     {t("payment")}
          </Link>
        </li>
        {/* <li>
          <a
            href="#"
            className=" rounded-lg flex font-semibold text-[16px] items-center  px-4 py-2  text-gray-700"
          >
                     <IoMdCart className='mr-[10px]' size={20} /> 
                     Cart
          </a>
        </li> */}
  
        <li>
          <Link
            href={"/settings/public"}
            className=" rounded-lg flex gap-[5px] font-semibold text-[16px] items-center px-4 py-3  text-gray-700"
          >
          <MdPublic className='mr-[10px]' size={22} />  {t("public")}
          </Link>
        </li>
  
        {/* <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="text-sm font-medium"> Account </span>
  
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
  
            <ul className="mt-2 space-y-1 px-4">
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Details
                </a>
              </li>
  
              <li>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Security
                </a>
              </li>
  
              <li>
                <form action="#">
                  <button
                    type="submit"
                    className="w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </details>
        </li> */}
      </ul>
    </div>
  
    {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="size-10 rounded-full object-cover"
        />
  
        <div>
          <p className="text-xs">
            <strong className="block font-medium">Eric Frusciante</strong>
  
            <span> eric@frusciante.com </span>
          </p>
        </div>
      </a>
    </div> */}
  </div>
  )
}

export default Sidebar_settings
