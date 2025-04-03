"use client"
import i18n from "i18next";
import React, { createContext, useEffect, useState } from 'react'
import Footer from '../_componants/Footer';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation } from 'react-i18next';
import "./i8n"
import { Cairo } from "next/font/google";
export const Provider:any = createContext(null);


const geistSans = Cairo({
  subsets: ["latin"],
  weight:["200","300" ,"400" , "700" , "900"]
});

function Context({children}: {children:React.ReactNode}) {
    const [value,setValue]:any = useState(null)
const [lang , setLang] = useState("")
    const { t, i18n } = useTranslation();

    const [d,setD] = useState(true)

    
    
    
    useEffect(() => {
      const rememberaccount = onAuthStateChanged(auth , (user:any) => {
            const getData = async () => {
              const data:any = (await getDoc(doc(db , "users" , `${user.uid}`))).data();                
              i18n.changeLanguage(data.lang);
          window.document.dir = i18n.dir();
              setValue({
                id:user.uid,
                    loginType: user.providerData[0].providerId,
                    ...data,
                })     
              }
              if (user) {
                console.log("succes you are loged in")
                getData();
              } else {
              }
            })
          },[])
          
          useEffect(() => {
            setTimeout(() => {
              setD(false)
            },2000)
        },[])
        return (
      <div  className={`${value?.lang === "ar" ? `${geistSans.className}` : ""} antialiased`}>
          <div className="loader fixed flex-col-reverse w-full h-full flex justify-center items-center bg-slate-100 left-0 top-0 z-[9999999999999999999999999999999] animate-end-sec">
          <div className="cube"></div>
          <h1 className="font-[800] text-[100px] animate-pre-start max-xl:text-[50px]">Sefoo Store</h1>
        </div>
    <Provider.Provider value={value}>
   {children}
   <Footer />
   <button onClick={() => signOut(auth)}>sign out</button>
    </Provider.Provider>
    </div>
  )
}

export default Context
