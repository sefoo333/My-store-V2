import React from 'react'

function loading() {
  return (
    <div className="loader fixed dark:text-black flex-col-reverse w-full h-full flex justify-center items-center bg-slate-100 left-0 top-0 z-[9999999999999999999999999999999] animate-end-sec">
    <div className="cube"></div>
    <h1 className="font-[800] text-[100px] animate-pre-start max-xl:text-[50px]">Sefoo Store</h1>
  </div>
  )
}

export default loading
