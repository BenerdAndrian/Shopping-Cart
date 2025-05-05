import { useOutletContext,useNavigate } from "react-router-dom"
import { Notification } from "./utils"
import { useState } from "react"
function CartPage(){
    const {cart,amount,setCart,setAmount,input}=useOutletContext()
    const [notify,setNotify]=useState(false)
    console.log('day la inputvalue: ',input)
    const navigate=useNavigate()
    const deleteItem=(index,item)=>{
      const newArray=Array.from(cart);
      newArray.splice(index,1)
      setCart(newArray);
      setAmount(amount=> amount-Number(input[item.id]||1))
    }
    console.log('cart here: ',cart)
    const handleCheckOut=()=>{
      setNotify(true);
      setCart([])
      setAmount(0)
    }
    const toClose=()=>{
      setNotify(false)
    }
    const calculateTotalPrice=(cart,input)=>{
      let count=0;
      cart.forEach(item=>{
         count+=item.price*input[item.id]
      })
      return count.toFixed(2);
    }
    const calculateDiscount = (cart, input) => {
      let count = 0;
      cart.forEach(item => {
        const discountedPrice = item.price - ((item.discountPercentage * item.price)/100);
        count += discountedPrice * input[item.id];
      });
      return count.toFixed(2); // Final result formatted as string
    };
    
    return(
        <div className="pt-[5rem] pb-[3rem]">
          <Notification notify={notify} role="checkout" closeNotification={toClose}/>
          <h1 className=" text-[1.2rem] md:text-[2rem] font-bold text-center pt-5 mb-3">This is the cart page</h1>
          <ul className=" flex flex-col max-w-5/6 mx-auto gap-y-3">
          {cart.map((item,index)=>(
            <li className="flex flex-col md:flex-row md:justify-evenly md:items-center border gap-x-6 px-3 pb-3">
                <img src={item.thumbnail} alt="thumbnail" className="w-50 h-50 md:w-20 md:h-20 self-center" />
                <p className="font-bold flex-1">{item.title}</p>
                <p className="flex-1"><span className="font-semibold">Unit Price: </span>{item.price}$</p>
                <p className="flex-1"><span className="font-semibold">Quantity: </span>{input[item.id]}</p>
                <p className="flex-1"><span className="font-semibold">Total Price: </span> {(item.price*input[item.id]).toFixed(2)}$</p>
                <div className="flex gap-x-2">
                <button onClick={()=>deleteItem(index,item)} className="bg-red-600 text-white py-1 px-2 rounded-md cursor-pointer ">Delete</button>
                <button onClick={()=>navigate(`/products/${item.id}`)} className="bg-green-500 text-white py-1 px-2">More</button>
                </div>

            </li>
        ))}
          </ul>
          {cart.length===0 && <p className="text-[0.8rem] md:text-[1rem] text-center mt-6">There is no item here.</p>}
          
          {cart.length>0 && 
          <div className="px-3 md:px-8">
          <hr className="border border-b-gray-200 mt-7 " />
          <div className="w-full border md:w-2/4 mx-auto py-2 px-2 mt-10 mb-10">
            <h2 className="text-[1rem] font-bold text-center md:text-[1.4rem]">Paying Price</h2>
            <div>
              <p className="flex justify-between">
                <span className="font-bold">Total Price:</span>
                <span>{calculateTotalPrice(cart,input)}$ </span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">Total discount value:</span>
                <span>{(calculateTotalPrice(cart,input)-calculateDiscount(cart,input)).toFixed(2)}$ </span>
              </p>
              <p className="flex justify-between">
                <span className="font-bold">You have to pay:</span>
                <span>{calculateDiscount(cart,input)}$ </span>
              </p>
            </div>
            <button onClick={handleCheckOut} className="bg-green-500 text-white text-[1.2rem] p-1.5 block mx-auto mt-3 rounded-2xl cursor-pointer">Check Out</button>
          </div>
        
          </div>
         
}
</div>
)
}
export{CartPage}