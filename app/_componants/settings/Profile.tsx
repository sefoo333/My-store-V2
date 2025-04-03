"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AnimatedCircularProgressBar } from '../_small-comps/Progress';
import { MdClear } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { Provider } from '@/app/_context/Context';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/app/config';
import { updateEmail, updatePassword } from 'firebase/auth';
import Prograss from './Prograss';
import { useTranslation } from 'react-i18next';
import { toast, Toaster } from 'sonner';

interface ProfileEdit {
  UserName:string,
  Email:string,
  password:string,
  loginType:string,
}
interface EditCountry {
  country:string,
  city:string,
  postal_code:string,
}

interface user {
  Adress:{
    City:string,
    Country:string,
    postal_code:string
  },
    id:string,
  Image:string,
  loginType:string,
  UserName:string,
  Email:string,
  password:string,
payments:string[],
}
function Profile() {
  const user:user = useContext(Provider);
      const [value, setValue] = useState(30);


      const [UserName , setUserName]  = useState("")
      const [Email , setEmail]  = useState("")
      const [password , setPassword]  = useState("")

      const [country , setCountry]  = useState("")
      const [city , setCity]  = useState("")
      const [postal_code , setpostal_code]  = useState("")

      const EditProfile = async (e:ProfileEdit) => {
        const userAuth:any = auth.currentUser;
        if (UserName !== ""){
        await updateDoc(doc(db,"users" , `${user?.id}`) , {
          UserName:UserName
            })

        if (e.Email !== "" && e.loginType === "password"){
        await updateDoc(doc(db,"users" , `${user?.id}`) , {
          Email:Email
            })
updateEmail(userAuth , Email)
          }
        if (e.password !== ""){
        await updateDoc(doc(db,"users" , `${user?.id}`) , {
          password:password,
            })
            updatePassword(userAuth,password);
          }
      }
    }


      const EditCountry = async (e:EditCountry) => {
        if (country !== ""){
        await updateDoc(doc(db,"users" , `${user?.id}`) , {
          "Adress.Country":country,
            })

          }
        if (city !== ""){
        await updateDoc(doc(db,"users" , `${user?.id}`) , {
         "Adress.City":city,
            })
          }

        if (postal_code !== ""){
        await updateDoc(doc(db,"users" , `${user?.id}`) , {
         "Adress.postal_code":postal_code,
            })
          }
  
    }


     const [imageUrl, setImageUrl] = useState("/");
    
      const handleUpload = async (event:any) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData:any = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME);
    
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
    
        const data = await response.json();
        setImageUrl(data.secure_url);
        await updateDoc(doc(db,"users" , `${user?.id}`),{
          Image:data.secure_url,
        })
        toast.success("Your Image is Uploaded !")
      }
    

      const [edit,Setedit] = useState(false)
      const [edit2,Setedit2] = useState(false)
    const [on,setOn] = useState(false);
      const {t} = useTranslation();

  return (
<>
<Toaster />
<div className="window mt-[40px] w-full">
     <h1 className='font-semibold text-[40px] my-[30px] px-[25px]'>{t("profile")}</h1>
   <div className="flex justify-center px-[20px] gap-[40px]  max-xl:flex-col">
   <div className="two_panels w-[80%] flex flex-col max-xl:w-full">
    {/* email&password */}
     <div className="panel w-full bg-white border-[1px] border-[#ecebee] rounded-3xl p-[20px] flex flex-col gap-[30px] ">
      {/* image edit */}
       <div className="image flex gap-[50px] items-center justify-start max-xl:flex-col">
         <img src={`${imageUrl === "/" ?  user?.Image : imageUrl}`} alt="" width={300} height={300} className='rounded-full w-[180px] h-[180px] object-cover' />
       {!on ? (
          <div className="group flex flex-col gap-[30px] items-start">
          <button className='bg-white rounded-xl border-[1px] border-[#f3f3f6] py-[10px] px-[30px] cursor-pointer' onClick={() => {setOn(!on)}}>Upload your Image</button>
          <span className=' text-[#7a7b98]'>The best size is 800x800. <span className='block'>JPG or PNG is allowed</span></span>
        </div>
       ) : null}
         {on ? (
           <div className="two flex flex-col gap-[20px]">
            <div className="mx-auto max-w-xs">
  <label htmlFor="example5" className="mb-1 block text-sm font-medium text-gray-700">Upload file</label>
  <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
    <div className="space-y-1 text-center">
      <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
      </div>
      <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
      <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
    </div>
    <input id="example5" type="file" className="sr-only" onChange={handleUpload} />
  </label>
</div> 

           </div>
        ): null}
       </div>
         <hr />
         <div className="information_account px-[20px]">
             <div className="head flex justify-between font-semibold">
               <h1 className='text-[20px]'>{t("personal")}</h1>
               <div onClick={() => Setedit(!edit)} className='edit bg-white duration-500 hover:bg-slate-50 rounded-xl border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]'>
   <AiOutlineEdit />
   <span>{t("edit")}</span>
               </div>
             </div>
        {!edit ? (
              <div className="informations flex justify-start my-[15px] max-xl:flex-col max-xl:gap-[25px]">
               <div className="fullName">
                 <h1 className='font-medium text-[16px] text-slate-600'>{t("userName")}</h1>
                 <span className='font-semibold text-[17px]'>{user?.UserName}</span>
               </div>
               <div className="Email mx-[150px] max-xl:mx-[0px]">
                 <h1 className='font-medium text-[16px] text-slate-600'>{t("email")}</h1>
                 <span className='font-semibold text-[17px]'>{user?.Email}</span>
               </div>
               <div className="password ">
                 <h1 className='font-medium text-[16px] text-slate-600'>{t("password")}</h1>
                 <span className='font-semibold text-[17px]'>********</span>
               </div>
             </div>
        ) : (
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            EditProfile({
              UserName:UserName,
              Email:Email,
              password:password,
              loginType:user?.loginType
            })
          }}>
          <div className="informations grid grid-cols-2 grid-rows-1 gap-7 my-[15px] max-xl:grid-cols-1 ">
            <div className="fullName">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("userName")}</h1>
              <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder='Edit your userName' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
            <div className="Email">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("email")}</h1>
              <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Edit your email' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
           {
            user?.loginType === "password" ? (
              <div className="password ">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("password")}</h1>
              <input type="passsword" onChange={(e) => setPassword(e.target.value)} placeholder='Edit your passsword' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'  />
            </div>
            )
            : null
           }
          </div>
       <div className="b-g flex justify-end">
       <div className="button edit bg-blue-500 rounded-xl duration-500 hover:bg-blue-600 text-white border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]">
          <input type='submit' value={t("submit")}  />
<FaSave />
          </div>
       </div>
          </form>
        )}
         </div>
     </div>
     {/* adress */}
     <div className="panel w-full mt-[30px] bg-white border-[1px] border-[#ecebee] rounded-3xl p-[20px] flex flex-col gap-[30px]">
     <div className="information_account px-[20px]">
             <div className="head flex justify-between font-semibold">
               <h1 className='text-[20px]'>{t("address")}</h1>
               <div onClick={() => Setedit2(!edit2)} className='edit bg-white rounded-xl border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]'>
   <AiOutlineEdit />
   <span>{t("edit")}</span>
               </div>
             </div>
            
             {!edit2 ? (
            <div className="informations flex justify-start my-[15px] max-xl:flex-col max-xl:gap-[25px]">
            <div className="fullName">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("country")}</h1>
              <span className='font-semibold text-[17px]'>{user?.Adress.Country}</span>
            </div>
            <div className="Email mx-[150px] max-xl:mx-[0px]">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("city")}</h1>
              <span className='font-semibold text-[17px]'>{user?.Adress.City}</span>
            </div>
            <div className="password ">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("postal_code")}</h1>
              <span className='font-semibold text-[17px]'>{user?.Adress.postal_code}</span>
            </div>
          </div>
        ) : (
          <form action="" onSubmit={(e) => {
            e.preventDefault()
            EditCountry({
              city:city,
              country:country,
              postal_code:postal_code,
            })
          }}>
          <div className="informations grid grid-cols-2 grid-rows-1 gap-7 my-[15px] max-xl:grid-cols-1">
            <div className="Country">
            <h1 className='font-medium text-[16px] text-slate-600'>{t("country")}</h1>
            <input type="text" onChange={(e) => setCountry(e.target.value)} placeholder='Edit your Country' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
            <div className="City">
            <h1 className='font-medium text-[16px] text-slate-600'>{t("city")}</h1>
            <input type="text" onChange={(e) => setCity(e.target.value)} placeholder='Edit your City' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
              <div className="Postal">
              <h1 className='font-medium text-[16px] text-slate-600'>{t("postal_code")}</h1>
              <input type="text" onChange={(e) => setpostal_code(e.target.value)} placeholder='Edit your pastel Code' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'  />
            </div>
          </div>
       <div className="b-g flex justify-end">
       <div className="button edit bg-blue-500 rounded-xl duration-500 hover:bg-blue-600 text-white border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]">
          <input type='submit' value={t("submit")}  />
<FaSave />
          </div>
       </div>
          </form>
        )}
         </div>
     </div>
   </div>
  <Prograss />
   </div>
   </div>
   </>
  )
}

export default Profile
