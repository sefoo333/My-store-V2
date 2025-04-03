import React from 'react'
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
<div className="parent flex items-center w-full">
  <div className="group flex items-center w-full">
    <div className="icon text-[25px] absolute pl-[5px] text-gray-400">
        <CiSearch />
    </div>
  <input type="text" placeholder='Search Product'  className=' rounded-md border-gray-200 py-[15px] rounded-tr-[0px] rounded-br-[0px] ps-12 shadow-xs text-[18px] max-sm:text-sm w-full'  />
  </div>
  <div className="button text-[18px] bg-black py-[15px] px-[25px] text-white rounded-tl-[0px] rounded-bl-[0px] rounded-[10px]">
    <input type="submit" value="Search" className='cursor-pointer' />
  </div>
</div>
  )
}

export default Search
