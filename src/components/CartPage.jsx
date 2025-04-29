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
    return(
        <>
          {notify && <Notification role="checkout" closeNotification={toClose}/>}
          <h1 className="text-[2rem] font-bold text-center pt-5">This is the cart page</h1>
          <ul className=" flex flex-col max-w-5/6 mx-auto gap-y-3">
          {cart.map((item,index)=>(
            <li className="flex flex-col md:flex-row md:justify-evenly md:items-center border gap-x-6 px-3 pb-3">
                <img src={item.thumbnail} alt="thumbnail" className="w-50 h-50 md:w-20 md:h-20 self-center" />
                <p className="font-bold flex-1">{item.title}</p>
                <p className="flex-1"><span className="font-semibold">Price: </span>{item.price}$</p>
                <p className="flex-1"><span className="font-semibold">Quantity: </span>{input[item.id]}</p>
                <p className="flex-1"><span className="font-semibold">Total Price: </span> {(item.price*input[item.id]).toFixed(2)}$</p>
                <div className="flex gap-x-2">
                <button onClick={()=>deleteItem(index,item)} className="bg-red-600 text-white py-1 px-2 rounded-md cursor-pointer ">Delete</button>
                <button onClick={()=>navigate(`/products/${item.id}`)} className="bg-green-500 text-white py-1 px-2">More</button>
                </div>

            </li>
        ))}
          </ul>
          {cart.length===0 && <p className="text-center mt-6">There is no item here.</p>}
          {cart.length>0 && <button onClick={handleCheckOut} className="bg-green-500 text-white text-[1.2rem] p-1.5 block mx-auto mt-3 rounded-2xl cursor-pointer">Check Out</button>}
        </>
      
    )
}

export{CartPage}