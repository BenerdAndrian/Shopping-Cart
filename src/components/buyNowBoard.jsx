import closeIcon from '../assets/img/blackCloseIcon.svg'
import { useState } from 'react'
function BuynowBoard({data,setBuyNowState,setCheckoutNote,setNote}){
    const [number,setNumber]=useState(1)
    return (
        <>
     
         <div>
       <div className="bg-black opacity-50 fixed h-screen w-screen top-0 left-0 z-998"></div>
        <div className="p-2 w-70 md:w-100 fixed bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl z-999">
        <img onClick={()=>setBuyNowState(false)} className="w-7 h-7 cursor-pointer absolute top-3 right-3" src={closeIcon} alt="close icon" />
            <div className="flex flex-col">
            <img className="w-40 h-40 block mx-auto" src={data.thumbnail} alt="images" />
            <h1 className="font-bold text-[1.1rem] text-center">{data.title}</h1>
           
            <p className="flex justify-between">
                <span className="font-bold">Price: </span>
                <p>
                <span className="italic">{(data.price-(data.price*data.discountPercentage/100)).toFixed(2)}$</span>
                <span className="bg-amber-200 text-white px-2 line-through rounded-2xl ml-2">{data.price}</span>
                </p>
                
            </p>
            <p className="flex justify-between">
                <span className="font-bold">Discount Percentage: </span>
                <span className="italic">{data.discountPercentage}%</span>
            </p>
            <p className="flex justify-between">
                <span className="font-bold">Warranty Information: </span>
                <span className="italic">{data.warrantyInformation}</span>
            </p>
            <p className="flex justify-between">
                <span className="font-bold">Ship Information: </span>
                <span className="italic">{data.shippingInformation}</span>
            </p>
            <p className="flex justify-between">
                <span className="font-bold">Brand: </span>
                <span className="italic">{data.brand}</span>
            </p>
             <p className="text-neutral-300 italic text-[0.8rem]">{data.description}</p>
             <input onChange={(e)=>{setNumber(e.target.value)}} type="number" defaultValue="1" min="1" className="w-full border px-2" />
             <p className=" text-red-600 text-[1.6rem]">{((data.price-(data.price*data.discountPercentage/100))*number).toFixed(2)}$</p>
             <button onClick={()=>{setBuyNowState(false),setCheckoutNote(true)}} className="bg-green-400 text-white px-3 rounded-xl cursor-pointer">Checkout</button>
            </div>
        </div>
       </div>
    
     
        </>
    )
}
export {BuynowBoard}