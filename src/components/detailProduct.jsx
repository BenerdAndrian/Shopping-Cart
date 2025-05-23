import { useParams,useOutletContext } from "react-router-dom"
import { useFetchFixedAPI } from "./ProductPage";
import { useState } from "react";
import { LoadingPage } from "./utils";
import { Notification } from "./utils";
import { BuynowBoard } from "./buyNowBoard";
function DetailProduct(){
   const {id}=useParams();
   const [close,setClose]=useState(false)
   const {data,error,loading}=useFetchFixedAPI(id)
   const [number,setNumber]=useState(1)
   const [currImg,setImage]=useState('');
   const {addFixedItem}=useOutletContext();
   const [note,setNote]=useState(false);
   const [checkoutNote,setCheckoutNote]=useState(false)
   const [buyNowState,setBuyNowState]=useState(false)
   console.log('day la data: ',data)
   if(error) return <p>There is server error.</p>
   if(loading) return <LoadingPage/>
   console.log('day la images : ',data.images)
   const changeImage=(index)=>{
     setImage(data.images[index])
   }
  const increaseNumber=()=>{
    setNumber(number=>number+1)
  }
  const decreaseNumber=()=>{
   if(number>1) setNumber(number=>number-1)
  }
  const toClose=()=>{
    console.log('hello')
    setNote(false)
   }
   const toCloseCheckoutBox=()=>{
    setCheckoutNote(false)
   }
    return (
     <div className="pt-[5rem] pb-[3rem]">
     {buyNowState && <BuynowBoard setCheckoutNote={setCheckoutNote} setBuyNowState={setBuyNowState} data={data}/>}
     {checkoutNote&&<Notification closeNotification={toCloseCheckoutBox} notify={checkoutNote} role='checkout'/>}
     <div className="px-3 py-3">
      <Notification notify={note} role='cart' closeNotification={toClose}/>
    <div className="flex flex-col md:flex-row">
    <div className="flex flex-col w-full md:w-1/4 flex-shrink-0">
     <img className="w-60 h-60 md:w-60 md:h-60" src={currImg===''?data.images[0]:currImg} alt="product's image" />
     <ul className="flex mb-2 gap-x-2 mt-2">
       {data.images.map((image,index)=>(
        <li onMouseEnter={()=>changeImage(index)} className="cursor-pointer">
            <img className="w-15 h-15 bg-gray-200 pr-2 pb-2" src={image} alt="image" />
        </li>
       ))}
     </ul>
     </div>
     <div className="flex flex-col w-full pb-3 pt-8">
     <h1 className="text-[1.7rem] font-bold">{data.title}</h1>
     <h2 className="font-bold">Price: {data.price}$</h2>
     <p className="italic">Category: {data.category}</p>
     <p className="italic">Brand: {data.brand}</p>
     <p className="text-shadow-gray-300">{data.description}</p>
     <div className="flex gap-x-1">
        <button onClick={()=>increaseNumber()} className="px-2 border cursor-pointer">+</button>
        <p className="px-2 border">{number}</p>
        <button onClick={()=>{decreaseNumber()}} className="px-2 border cursor-pointer">-</button>
     </div>
     <div className="flex mt-2 items-center">
     <p className="text-orange-700 text-3xl mr-2">Total: {(data.price*number).toFixed(2)}$</p>
     <p className="mr-2 bg-emerald-300 text-white text-[0.75rem] p-0.5 rounded-full baseline px-2 font-bold">-{data.discountPercentage}%</p>
     <p className="line-through mr-2 bg-yellow-500 text-white text-[0.75rem] p-0.5 rounded-full px-2 font-bold">{(data.price+(data.price*data.discountPercentage/100)).toFixed(2)}$</p>
     </div>
     
     <div className="mt-2">
     <button onClick={()=>setBuyNowState(true)} className="py-0.5 px-3 bg-green-500 text-white mr-1 cursor-pointer">Buy Now</button>
      <button onClick={()=>{addFixedItem(data,number),setNote(true)}}  className="py-0.5 px-3 bg-red-500 text-white cursor-pointer">Add To Cart</button>
     </div>
     </div>
    </div>
    <div className="p-2 bg-gray-200 text-[0.8rem] italic">
        <h2 className="font-bold text-[1.22rem]">Detailed Information</h2>
        <p>Width:{data.dimensions.width}</p>
        <p>Height: {data.dimensions.height}</p>
        <p>Depth: {data.dimensions.depth}</p>
        <p>Warranty Information: {data.warrantyInformation}</p>
        <p>Shipping Information: {data.shippingInformation}</p>
        <p>Availability Status: {data.availabilityStatus}</p>
     </div>
     </div>
     </div>
     
    )
}
export {DetailProduct}