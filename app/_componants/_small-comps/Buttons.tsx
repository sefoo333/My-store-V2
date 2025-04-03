import React from 'react'


interface button {
    Name:string;
    isfill:boolean;
    className?:string;
}

function Buttons(props:button) {
  return (
   <div className={`button text-xl rounded-full cursor-pointer border-[1px] border-[#19376D] transition-[1s] ${props.isfill ? "bg-[#19376D] text-white hover:bg-transparent" : "bg-transparent  hover:bg-[#19376D] hover:text-white"} ${props.className}`}>
    {props.Name}
   </div>
  )
}

export default Buttons
