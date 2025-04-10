"use client"


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { InteractiveGridPattern } from '../_componants/_small-comps/Login_bg';
import { cn } from '@/lib/utils';
import { Spotlight } from '@/components/ui/Spotlight';
import { FaUser } from "react-icons/fa";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';


interface account {
  uid:string,
  email:string,
  displayName:string,
  password:string,
  photoURL:string,
  reviews:string[],
  cart:string[],
  wishlist:string[],
  Adress:object,
  payments:string[],
  lang:string,
  price:string,
}
import { FiHome } from "react-icons/fi";


function page() {


  const provider = new GoogleAuthProvider()
  const provider2 = new FacebookAuthProvider()
  
  const createAccount = async (data:account) => {
const getuser = (await getDoc(doc(db,"users" , `${data.uid}`))).data();

   if(!getuser){
    await setDoc(doc(db,"users" , `${data.uid}`) , {
      UserName:data.displayName,
      Email:data.email,
      password:"",
      Image:data.photoURL,
      reviews:[],
      cart:[],
      wishlist:[],
      Adress:{
        Country:"",
        City:"",
        postal_code:""
      },
      lang:"en",
      payments:[],
      price:"",
    })
   }
  }
  function signinWithGooge() {
    signInWithPopup(auth , provider).then((result:{user:any}) => {
      createAccount(result.user)
    }).catch((error) => {
      console.log("failed => " , error)
    })
  }
  function signinWitFacebook() {
    signInWithPopup(auth , provider2).then((result:any) => {
      createAccount(result)
    }).catch((error) => {
      console.log("failed => " , error)
    })
  }
  
  useEffect(() => {
const rememberaccount = onAuthStateChanged(auth , (user) => {
  if (user) {
    console.log("succes you are loged in")
    setTimeout(() => window.open("/" , "_parent") , 3000)
  }
})
  },[])

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [userName,setUserName] = useState("")
  const [rememberMe,setNotice] = useState(false)

 function signinWithEmail(signType:boolean) {
if (signType) {
  signInWithEmailAndPassword(auth,email,password).then((e) => {
  }).catch((e) => {
    alert(e)
  })
} else {
  createUserWithEmailAndPassword(auth,email,password).then((e) => {
    createAccount({
      displayName: userName,
      email: email,
      password: password,
      uid: e.user.uid,
      photoURL: '',
      reviews: [],
      cart: [],
      wishlist: [],
      Adress:{
        Country:"",
        City:"",
        postal_code:""
      },
      lang:"en",
      payments:[],
      price:"",
    })
  })

}
}

const [reset,SetReset] = useState(false)

  const [register , SetReigster] = useState(false)



  return (
    <>
    
 <div className="parent p-[100px] h-screen overflow-hidden overflow-y-scroll flex justify-center max-xl:px-[40px] max-xl:py-[50px]">
    <div className="container flex h-full justify-between max-xl:flex-col max-xl:w-fit max-xl:h-screen">
      <div className="text xl:basis-[35%]">
        <div className="title font-semibold flex justify-between items-center text-[55px] text-white">
          {/* <h1>Sefoo Store</h1> */}
<Image src={"/logo2.png"} width={300} height={100} alt='' className='h-[55px] object-cover' />
<div className="Home text-[16px] font-semibold ">
<Link href={"/"}>
<h1 className='max-xl:hidden'>Return To Home</h1>
<FiHome className='xl:hidden max-xl:mr-[40px] ' size={27} />
</Link>
</div>
        </div>
        <div className="login mt-[60px] text-white max-xl:px-[10px]">
          <h1 className='font-semibold text-[28px] pb-[35px] max-xl:text-[24px]'> {!register ? "Login to" : "Register"} Your Account</h1>
       {!reset ? (
           <form action="" onSubmit={((e) => {
            e.preventDefault()
            if (userName !== "" && register){
              signinWithEmail(false)
            } else {
              signinWithEmail(true)
            }
          })} >
            {register ? (
               <div className="userName flex flex-col mb-[25px] gap-[15px]">
               <label htmlFor="userName" className='font-medium text-[18px]'>UserName</label>
              
              <div className="input relative">
              <input
     type="text"
     id="userName"
 onChange={(e) => setUserName(e.target.value)}
     placeholder="UserName"
     className="mt-1 pl-[48px] max-xl:w-[95%] xl:w-full rounded-md p-4 shadow-xs sm:text-sm border-gray-700 bg-[#313131] text-[#b7b7b7]"
   />        
 <FaUser className='text-[25px] absolute left-[10px] bottom-[13px]' />
              </div>
              
                  </div>
            ) : null}
            <div className="email flex flex-col gap-[15px]">
              <label htmlFor="email" className='font-medium text-[18px]'>Your Email</label>
             
             <div className="input relative">
             <input
    type="email"
    id="email" 
    onChange={(e) => setEmail(e.target.value)}


    placeholder="Your Email"
    className="mt-1 pl-[48px] max-xl:w-[95%] xl:w-full rounded-md p-4 shadow-xs sm:text-sm border-gray-700 bg-[#313131] text-[#b7b7b7]"
  />        
<MdEmail className='text-[25px] absolute left-[10px] bottom-[13px]' />
             </div>
             
                 </div>
           
            <div className="password flex flex-col mt-[25px] gap-[15px]">
              <label htmlFor="password" className='font-medium text-[18px]'>Your Password</label>
          <div className="input relative">
          <input
    type="password"
    id="password"
    onChange={(e) => setPassword(e.target.value)}

    placeholder="Your password"
    className="mt-1 xl:w-full pl-[48px] rounded-md p-4 max-xl:w-[95%] shadow-xs sm:text-sm border-gray-700 bg-[#313131] text-[#b7b7b7]"
  />

<span className='bg-clip-text button' style={{WebkitTextFillColor:"transparent"}}>
<IoLockClosed className='text-[25px] absolute left-[10px] bottom-[13px] text-white ' />
</span>
          </div>
            </div>
          {!register ? (
              <div className="remember_account flex justify-between mt-[40px] mb-[20px]">
              <div className="keep flex gap-[18px] items-center">
                <input type="checkbox" className='w-5 cursor-pointer h-5 accent-[#576CBC]' name="" id="rememberMe" />
                <label htmlFor="rememberMe" className='font-medium'>Keep me signed In</label>
              </div>
              <div className="forget font-semibold">
                <a onClick={() => {
                  SetReset(!reset)
                }} href="#">Forget pasword ?</a>
              </div>
            </div>
          ) : null}
    
<div className="submit flex justify-center items-center">
{register ?             <input type="submit" value="Register" className='w-full py-[12px] max-xl:w-[95%] button_login text-black rounded-xl text-2xl font-semibold cursor-pointer mt-[30px]' /> :             <input type="submit" value="Login" className='xl:w-full max-xl:w-[95%] py-[12px] button_login text-black rounded-xl text-2xl font-semibold cursor-pointer' />
}
</div>

          </form>
       ) : (
        <form action=""  className='max-xl:flex max-xl:flex-col max-xl:items-start'>             
          <div className="email flex flex-col gap-[15px] max-xl:w-full">
            <label htmlFor="email" className='font-medium text-[18px]'>Your Email</label>
           
           <div className="input relative">
           <input
  type="email"
  id="email" 
  onChange={(e) => setEmail(e.target.value)}


  placeholder="Your Email"
  className="mt-1 pl-[48px] w-full max-xl:w-[95%] rounded-md p-4 shadow-xs sm:text-sm border-gray-700 bg-[#313131] text-[#b7b7b7]"
/>        
<MdEmail className='text-[25px] absolute left-[10px] bottom-[13px]' />
           </div>
           
               </div>
         
      
        {!register ? (
            <div className="remember_account flex justify-end mt-[20px]">
           
            <div className="forget font-semibold">
              <a onClick={() => {
                SetReset(!reset)
              }} href="#">Remember Account ?</a>
            </div>
          </div>
        ) : null}
<div className="submit flex justify-center items-center max-xl:w-full">
<input type="submit" value="Send" className='w-full py-[12px] button_login max-xl:w-[95%] text-black rounded-xl text-2xl font-semibold cursor-pointer mt-[30px]' /> 

</div>
        </form>
       )}

        {!reset ? (
          <>
            <div className="socials_login mt-[80px]">
            <h1 className='text-[20px] my-[30px]'>Choose your preferred method to continue</h1>
            <div className="cards flex justify-between gap-[40px]">
              <div onClick={() => {
                signinWithGooge()
              }} className="card cursor-pointer duration-300 hover:bg-[#202020] bg-[#1c1c1c] w-full p-[20px] text-[18px] font-medium flex items-center gap-[20px] rounded-[20px] border-[1px] border-[#363535]">
<FcGoogle size={30} />
<h1>Google</h1>
              </div>
              <div onClick={() => {
                signinWitFacebook()
              }} className="card cursor-pointer duration-300 hover:bg-[#202020]  bg-[#1c1c1c] w-full p-[20px] text-[18px] font-medium flex items-center gap-[20px] rounded-[20px] border-[1px] border-[#363535]">
<FaFacebook size={30} color='#1670fff7' />
<h1>Facebook</h1>
              </div>
            </div>
          </div>
          <div className="register my-[20px]">
<h1>            <a href="#" className='font-semibold text-[#A5D7E8]' onClick={() => SetReigster(!register)}>{register ? "Already Have an account?" : "New Member?"}</a> Try {register ? "Sign in" : "Sign up"}</h1>
          </div>
          </>
        ) : null}
        </div>
      </div>
      <div className="image basis-[40%] max-xl:hidden"> 
        <Image src={"/login.jpg"} className='h-full object-cover rounded-2xl ' alt='' width={800} height={1000} />
      </div>
      {/* 
          background-color: #1c1c1c;
    padding: 20px;
    font-size: 22px;
    font-weight: 500;
    display: flex
;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    border: 1px solid #363535;
      */}
    </div>
  </div>
      <div className="absolute h-screen w-full left-0 top-0  overflow-hidden bg-[#0f0f0f] z-[-1]">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60 z-[-1] "
        fill="white"
      />
      {/* <Spotlight
        className="top-[-20%] left-[51%]  z-[-1] "
        fill="white"
      /> */}
      <InteractiveGridPattern
      width={60}
      height={60}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_top,white,transparent)]",
          "inset-x-0 inset-y-[30%] skew-y-0 rotate-[-20deg] w-full h-full  absolute left-0 top-[-251px] opacity-[45%]",
        )}
      />
      </div>
  </>
  )
}

export default page
