"use client"

import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../config';
import Image from 'next/image';
import { IoMdHeartEmpty } from "react-icons/io";
import { GoStarFill } from 'react-icons/go';
import { CldUploadButton } from 'next-cloudinary';

// function page() {

//     const [Name,setData] = useState("")
//     const [image,setData2] = useState("")
//     const [price,setData3] = useState("")
//     const [price3,setData33] = useState("")
//     const [price33,setData333] = useState("")
//     const [price333,setData3333] = useState("")
//     const [rating,setData4] = useState("")
//     const [category,setData5] = useState("")
//     const [description,setData6] = useState("")
// // useEffect(() => {
// //     fetch('https://fakestoreapi.com/products')
// //     .then(response => response.json())
// //     .then(data => {
// //         const test = async () => {
// //             await setDoc(doc(db,"products", "test"), {
// //                 data
// //             })
// //         }
// //         test()
// //     });

// // },[])

// const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

// const addProduct = async () => {
//     await setDoc(doc(db,"products" , `No-${Date.now()}`) , {
//         Title: Name,
//         image:image,
//         images:[image],
//         price:price,
//             rate:rating,
//             count:0,
//         category:category,
//         informations:{},
//          description:description,
//          reviews:[]

//     })
// }
//     return (
// <div className="parent flex justify-center items-center">
//     <div className="test1">
//     <div className='p-[20px] bg-red-400 rounded-2xl flex flex-col gap-[50px]'>
//         <h1 className='text-center'>Admin products</h1>
//         <form action="" onSubmit={(e) => {
// e.preventDefault()
// if (Name !== "" || image !== ""){
//     addProduct()
// } else {
//     alert("failed")
// }
// }}>

// <div className="Name_product">
// <h1>Title : </h1>
// <input type="text" placeholder='Name' onChange={(e) => setData(e.target.value)} />


// </div>

// <div className="product_img">
// <h1>Image :</h1>
// <input type="text" placeholder='image' onChange={(e) => setData2(e.target.value)} />

// </div>
// <div className="product_img">
// <h1>Image2 :</h1>
// <input type="text" placeholder='image' onChange={(e) => setData2(e.target.value)} />

// </div>
// <div className="product_img">
// <h1>Image3 :</h1>
// <input type="text" placeholder='image' onChange={(e) => setData2(e.target.value)} />

// </div>



// <div className="price">
//   <h1>Price :</h1>
//   <input type="text" placeholder='price' onChange={(e) => setData3(e.target.value)} />
// </div>
// <div className="price">
//   <h1>informations1 :</h1>
//   <input type="text" placeholder='informations' onChange={(e) => setData3(e.target.value)} />
// </div>
// <div className="price">
//   <h1>informations2 :</h1>
//   <input type="text" placeholder='informations' onChange={(e) => setData33(e.target.value)} />
// </div>
// <div className="price">
//   <h1>informations3 :</h1>
//   <input type="text" placeholder='informations' onChange={(e) => setData333(e.target.value)} />
// </div>
// <div className="price">
//   <h1>informations4 :</h1>
//   <input type="text" placeholder='informations' onChange={(e) => setData3333(e.target.value)} />
// </div>

// <div className="category">
// <h1>Category:</h1>
// <input type="text" placeholder='category' onChange={(e) => setData5(e.target.value)} />

// </div>

// <div className="description">
// <h1>Description:</h1>
// <textarea placeholder='description' onChange={(e) => setData6(e.target.value)} />

// </div>
//             <input type="submit" value={"send"} className='px-[15px] py-[5px] bg-blue-500' />
//         </form>




//     <div>
//       <CldUploadButton
//         options={{ multiple: true }}
//         uploadPreset={cloudPresetName}
//       >
//         <span>Upload Image</span>
//       </CldUploadButton>
//     </div>

// export default CloudinaryUploader;
       
//     </div>
//     </div>
    
// </div>
//   )
// }

// export default page

export default function UploadButton() {
  const [imageUrl, setImageUrl] = useState(null);

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
  };

  return (
    <div className="flex flex-col items-center">
      <input type="file" onChange={handleUpload} className="mb-4 border p-2" />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="w-40 h-40 object-cover rounded-lg" />
      )}
    </div>
  );
}



// "use client";
// import { CldImage } from 'next-cloudinary';

// // By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
// export default function Page() {
//   return (
//     <CldImage
//       src="cld-sample-3" // Use this sample image or upload your own via the Media Explorer
//       width="500" // Transform the image: auto-crop to square aspect_ratio
//       height="500"
//       crop={{
//         type: 'auto',
//         source: true
//       }} alt={''}   
//        />
//   );
// }