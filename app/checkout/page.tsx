"use client"
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FaCreditCard } from "react-icons/fa6";
import { SiVisa } from 'react-icons/si';
import { FaMoneyBills } from "react-icons/fa6";
import { RiDeleteBin6Line, RiMastercardFill, RiVisaLine } from "react-icons/ri";
import Link from 'next/link';
import { Provider } from '../_context/Context';
import { MdDateRange } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { arrayRemove, arrayUnion, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import Cart_checkout from '../_componants/_product/Cart_checkout';
import { toast, Toaster } from 'sonner';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
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
  payments:[{
    card_num:string,
    ccv:number,
    date_end:string,
  }]
}

interface Payment_carde{
  card_num:string,
  ccv:number,
  date_end:string,
}

interface cart{
  image:string,
  count:number,
  Title:string,
  category:string,
  price:string
  id:string,
  userid:string,
  element:any
}

function page() {
  const user:user = useContext(Provider)
    const [count,setCount] = useState(0);


    const[name_card,setCard1] = useState("")
    const[card_num,setCard2] = useState("")
    const[cvc,setCard3] = useState("")
    const[expire_date,setCard4] = useState("")

    const [address , setAddress1] = useState("")
    const [city , setAddress2] = useState("")
    const [pastel_code , setAddress3] = useState("")

    const [index ,setIndex] = useState(0)


    const [cart,setCart] = useState([]);
    const [total,setTotal] = useState(0)
    
    useEffect(() => {
      const featuree = onSnapshot(doc(db,"users" , `${user?.id}`) , (doc:any) => {
        const totaly = doc?.data()?.cart?.map((e:{price:string , count:number}) => {
          return +e.price * e.count
        }).reduce((a:number,b:number) => {
          return a + b
        })
        setTotal(totaly)
        setCart(doc.data().cart)

        if (doc.data().payments.length === 0){
          setIndex(1)
        }
      })


      return () => {
        featuree()
      }
    },[user])
    
    const Tax = 20;
    const Discount = 0;
    
    const Delete = async (targ:object) => {
      await updateDoc(doc(db,"users" , `${user?.id}`),{
        cart:arrayRemove(targ)
      })
    }

    const savepayment = async (check:boolean) => {
     if (check) {
      updateDoc(doc(db,"users" , `${user?.id}`) , {
        payments:arrayUnion({
          card_num:card_num,
          ccv:cvc,
          date_end:expire_date
        })
      })
     }
    }
    const saveAddress = async (check:boolean) => {
     if (check) {
      updateDoc(doc(db,"users" , `${user?.id}`) , {
       Adress:{
        City:city,
        Country:address,
        postal_code:pastel_code,
       }
      })
     }
    }


    const [save,setSave] = useState(false)
    const [save2,setSave2] = useState(false)
const [select,setSelect] = useState({})
const [Name,setName] = useState("")

const nyid = `Order-${Date.now()}`
const payment = async (id:string) => {
await setDoc(doc(db,"orders" , `${id}`) , {
  cart:cart,
  City:city,
  Country:address,
 postal_code:pastel_code,
 Name_buyer:name_card !== "" ? name_card : user?.UserName,
 id:id,
 payment: !select ? {
  card_num:card_num,
  ccv:cvc,
  date_end:expire_date
 } : select 
})

await updateDoc(doc(db,"users" , `${user?.id}`) , {
  cart:[]
})
}

const {t} = useTranslation();

  return (
    <div className="parent  py-[80px] flex justify-center">
  <Toaster />
    <div className="container flex flex-row-reverse justify-center gap-[130px] max-xl:flex-col-reverse max-xl:px-[15px]">
<div className="productsssss bg-[#e3f2fd] border-[2px] border-gray-600/20 basis-[60%] rounded-xl w-full h-[900px]">
    <div className="container p-[40px] flex flex-col h-full justify-between">
        <div className="cards overflow-hidden flex flex-col gap-[30px]">
{cart?.map((e:cart) => (
  <>
       <Cart_checkout element={e} image={e.image} Title={e.Title} userid={user?.id} category={e.category} price={e.price} id={e.id} key={e.id} count={e.count} />
  </>

))}
        </div>
        <div className="checkout w-full  text-[2px] text-gray-500 flex flex-col gap-1">
            <div className="subtotal flex justify-between">
                <h1 className='font-medium text-[19px]'>Subtotal</h1>
                <h1 className='text-[19px]'>{total}$</h1>
            </div>
            <div className="subtotal flex justify-between">
                <h1 className='font-medium text-[19px]'>Tax</h1>
                <h1 className='text-[19px]'>{Tax}$</h1>
            </div>
            <div className="subtotal flex justify-between border-b-[2px] pb-[10px] border-b-gray-700">
                <h1 className='font-medium text-[19px]'>Discount</h1>
                <h1 className='text-[19px]'>{Discount}$</h1>
            </div>
            <div className="subtotal flex justify-between pt-[10px] text-gray-700">
                <h1 className='font-bold text-2xl'>Total</h1>
                <h1 className='text-[19px]'>{!Number.isNaN(((total + Tax) - Discount)) ? (total + Tax ) - Discount : "0"}$</h1>
            </div>
        </div>
    </div>
</div>
{/* checkout form */}
<div className="check_form basis-[70%]">
    {/* step */}
<div className='step'>
  <h2 className="sr-only">Steps</h2>

  <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
    <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
      <li className={`relative flex justify-start ${index >= 0 ? "text-blue-600" : ""}`}>
        <span className={`absolute start-0 -bottom-[1.75rem] rounded-full  ${index >= 0 ? "bg-blue-600" : "bg-gray-600"} text-white`}>
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <span className="hidden sm:block"> saved Payments </span>

        <svg
          className="size-6 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
      </li>

      <li className={`relative flex justify-center  ${index >= 1 ? "text-blue-600" : ""}`}>
        <span
          className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full  ${index >= 1 ? "bg-blue-600" : "bg-gray-600"} text-white`}
        >
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <span className="hidden sm:block"> Credit Card </span>

        <svg
          className="mx-auto size-6 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </li>

      <li className={`relative flex justify-end  ${index >= 2 ? "text-blue-600" : ""}`}>
        <span className={`absolute end-0 -bottom-[1.75rem] rounded-full  ${index >= 2 ? "bg-blue-600" : "bg-gray-600"} text-white`}>
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <span className="hidden sm:block"> Address </span>

        <svg
          className="size-6 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </li>
    </ol>
  </div>
</div>
{index == 1 ? (
  <div className="panel">
<h1 className='font-semibold text-[35px] my-[30px]'>{t("payment")}</h1>
<div className="payments_type flex gap-[30px] select-none max-xl:flex-col">
  
     <div onClick={() => {
                  }} className="card justify-center cursor-pointer duration-300 hover:bg-slate-50/30  bg-white w-full p-[20px] text-[18px] font-medium flex items-center gap-[20px] rounded-[20px] border-[1px] border-[#f3f3f6]">
    <Image src={"/partenars/visa.png"} alt='' width={300} height={150} className='h-[55px] object-contain' />
    </div>
     <div onClick={() => {
      toast.error("The payment not worked Now please try other payment")
                  }} className="card justify-center cursor-pointer duration-300 hover:bg-slate-50/30  bg-white w-full p-[20px] text-[18px] font-medium flex items-center gap-[20px] rounded-[20px] border-[1px] border-[#f3f3f6]">
    <Image src={"/partenars/Paypal.png"} alt='' width={300} height={150} className='h-[60px] object-cover' />
                  </div>
     <div onClick={() => {
      setIndex(2)
                  }} className="card justify-center cursor-pointer duration-300 hover:bg-slate-50/30  bg-white w-full p-[20px] text-[18px] font-medium flex items-center gap-[20px] rounded-[20px] border-[1px] border-[#f3f3f6]">
    <Image src={"/partenars/8992633.png"} alt='' width={300} height={150} className='h-[90px] object-contain' />
    </div>

</div>
<form className='my-[40px] flex flex-col gap-[35px]' action="">
<div className="fullName">
              <label htmlFor='card_num' className='font-semibold text-[17px] text-slate-600'>{t("userName")}</label>
              <input id='card_num' type="text" onChange={(e) => setCard1(e.target.value)} placeholder='Seifeldeen Ali' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
<div className="fullName">
              <label htmlFor='card_num' className='font-semibold text-[17px] text-slate-600'>{t("card_num")}</label>
              <input id='card_num' maxLength={20} type="text" onChange={(e) => setCard2(e.target.value)} placeholder='0000-0000-0000-0000' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
<div className="two flex justify-start gap-[20px]">
<div className="fullName w-[60%]">
              <label htmlFor='cvc' className='font-semibold text-[17px] text-slate-600'>CVC</label>
              <input id='cvc' type="text" maxLength={3} onChange={(e) => setCard3(e.target.value)} placeholder='MM/YY' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
            <div className="fullName w-[40%]">
              <label htmlFor='expire' className='font-semibold text-[17px] text-slate-600'>{t("expire")}</label>
              <input id='expire' type="text" maxLength={5} onChange={(e) => setCard4(e.target.value)} placeholder='CVC' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
</div>
<label htmlFor="Option1" className="inline-flex items-center gap-3">
      <input type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" onChange={(e) => {
        setSave2(e.target.checked)
      }} id="Option1" />

      <span className="font-semibold text-gray-700"> {t("save1")} </span>
    </label>
    <div className="buttons flex justify-center max-xl:h-[65px] max-xl:w-full">
    <a
  className=" rounded-sm border duration-500 border-[#1084d8] max-xl:px-8 max-xl:py-3 px-20 flex justify-center items-center py-6 text-xl font-medium text-[#1084d8] hover:bg-[#1084d8] hover:text-white focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => setIndex((e) => e-1)}
>
{t("previsous")}
</a>
    <a
  className=" w-full text-center duration-500 text-nowrap rounded-xl border max-xl:px-8 max-xl:py-3  flex justify-center items-center border-[#1084d8] bg-[#1084d8] px-20 py-6 text-xl ml-[30px] font-medium text-white hover:bg-transparent hover:text-[#1084d8] focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => setIndex((e) => e+1)}
>
  {t("Next")}
</a>
    </div>
</form>
</div>
) : index == 2 ? (
  <div className="panel">
<h1 className='font-semibold text-[35px] my-[30px]'>{t("address")}</h1>
<form className='my-[40px] flex flex-col gap-[35px]' action="">
<div className="fullName">
              <label htmlFor='card_num' className='font-semibold text-[17px] text-slate-600'>{t("country")}</label>
              <input id='card_num' type="text" onChange={(e) => setAddress1(e.target.value)} placeholder='Seifeldeen Ali' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
<div className="fullName">
              <label htmlFor='card_num' className='font-semibold text-[17px] text-slate-600'>{t("city")}</label>
              <input id='card_num' maxLength={20} type="text" onChange={(e) => setAddress2(e.target.value)} placeholder='0000-0000-0000-0000' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>
<div className="fullName ">
              <label htmlFor='cvc' className='font-semibold text-[17px] text-slate-600'>{t("postal_code")}</label>
              <input id='cvc' type="text" maxLength={3} onChange={(e) => setAddress3(e.target.value)} placeholder='MM/YY' className='mt-[10px] font-semibold text-[17px] flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' />
            </div>

<label htmlFor="Option1" className="inline-flex items-center gap-3">
      <input type="checkbox" className="size-5 rounded border-gray-300 shadow-sm" onClick={(e:any) => {
setSave2(e.target.checked);
      }} id="Option1" />

      <span className="font-semibold text-gray-700"> {t("save2")} </span>
    </label>
    <div className="buttons flex justify-center max-xl:h-[65px] max-xl:w-full">
    <a
  className=" rounded-sm border duration-500 border-[#1084d8] max-xl:px-10 max-xl:py-3 flex justify-center items-center px-20 py-6 text-xl font-medium text-[#1084d8] hover:bg-[#1084d8] hover:text-white focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => setIndex((e) => e-1)}
>
  {t("previsous")}
</a>
    <Link
  className=" w-full text-center duration-500 rounded-xl max-xl:px-10 max-xl:py-3 flex justify-center items-center border border-[#1084d8] bg-[#1084d8] px-20 py-6 text-xl ml-[30px] font-medium text-white hover:bg-transparent hover:text-[#1084d8] focus:ring-3 focus:outline-hidden"
  href={address !== "" && city !== "" ? `/finish/${nyid}` : `/checkout`}
  onClick={() => {
    if (save) {
      savepayment(true)
    }
    if (save2) {
      saveAddress(true)
    }
    if (address !== "" && city !== ""){
      setIndex((e) => e+1)
      payment(`${nyid}`)
    } else {
      toast.error("Please Complete The Fields")
    }
  }}
>
  {t("finish")}
</Link>
    </div>
</form>
</div>
) : index == 0 ? (

  <div className="panel">
<h1 className='font-semibold text-[35px] my-[30px]'>{t("choose_payment")}</h1>
<div className="payments flex flex-col justify-between ">
     <div className="cards flex flex-col gap-[30px]">
    {user?.payments.length > 0 ? (
      <>
      {user?.payments.map((e:Payment_carde,a:number) => (
        <div className="card flex items-center justify-between border-[1px] border-[#e7e4e4] p-[15px] rounded-md">
         <div className="two flex items-center gap-[20px]">
  {e?.card_num?.slice(0,1) === "4" ?  <RiVisaLine size={45} color='blue' /> : e?.card_num.slice(0,2) === "51" || e?.card_num.slice(0,2) === "51" || e?.card_num.slice(0,4) === "2221" || e?.card_num.slice(0,4) === "2720" ? <RiMastercardFill size={45} color='#ff9401' /> : <FaCreditCard size={40} color='black' />} 
           <div className="text">
             <h1 className='font-semibold text-[18px] mb-0'>**** **** {e.card_num.slice(0,4)}</h1>
   
   <div className="data flex items-center gap-[5px] text-gray-600">
     <MdDateRange />
   <span className=''>{e.date_end}</span>
   
   </div>
   
           </div>
                    </div>
     <div className='edit bg-white rounded-xl border-[1px] border-[#f3f3f6] py-[10px] px-[15px] cursor-pointer flex items-center gap-[10px]'>
      {/* <AiOutlineEdit /> */}
      <input
        type="radio"
        name="option"
        value="option"
        id="option"
        className=""
        onChange={() => {
          setSelect(e)
          setIndex(2)
        }}
      />
                  </div>    
         </div>
      ))}
      </>
    ) : null}
     <h1 className='font-semibold text-[17px] mt-[10px] text-gray-600' style={{textDecoration:"underline" , cursor:"pointer"}}>
      <Link href={"/settings/payment"}>
      {t("diffrent_payment")}
      </Link>
     </h1>
     </div>


     <div className="buttons flex justify-center mt-[100px] max-xl:h-[65px] max-xl:w-full">
     <a
  className=" rounded-sm border duration-500 border-[#1084d8] px-20 py-6 max-xl:px-10 max-xl:py-3  flex justify-center items-center text-xl font-medium text-[#1084d8] hover:bg-[#1084d8] hover:text-white focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => setIndex((e) => e-1)}
>
  {t("cancel")}
</a>
    <a
  className=" w-full text-center duration-500 rounded-xl text-nowrap border flex justify-center items-center border-[#1084d8] bg-[#1084d8] px-20 py-6 max-xl:px-10 max-xl:py-3 text-xl ml-[30px] font-medium text-white hover:bg-transparent hover:text-[#1084d8] focus:ring-3 focus:outline-hidden"
  href="#"
  onClick={() => setIndex((e) => e+1)}
>
  {t("Next")}
</a>
    </div>
</div>
  </div>

) : null}
</div>
    </div>
</div>
  )
}

export default page
