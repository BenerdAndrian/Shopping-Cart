import { useOutletContext,useNavigate } from "react-router-dom"

function CartPage(){
    const {cart,amount,setCart}=useOutletContext()
    const navigate=useNavigate()
    const deleteItem=(index)=>{
      const newArray=Array.from(cart);
      newArray.splice(index,1)
      setCart(newArray);
    }
    console.log('cart here: ',cart)
    return(
        <>
          <h1 className="text-[2rem] font-bold text-center pt-5">This is the cart page</h1>
          <ul>
          {cart.map((item,index)=>(
            <li className="flex justify-evenly items-center">
                <img src={item.thumbnail} alt="thumbnail" className="w-20 h-20" />
                <p className="font-bold">{item.title}</p>
                <p>{item.price}$</p>
                <p>{amount}</p>
                <p>Total: {(item.price*amount).toFixed(2)}</p>
                <button onClick={()=>deleteItem(index)} className="bg-red-600 text-white py-1 px-2 rounded-md cursor-pointer">Delete</button>
                <button onClick={()=>navigate(`/products/${item.id}`)} className="bg-green-500 text-white py-1 px-2">More</button>
            </li>
        ))}
          </ul>
        </>
      
    )
}

export{CartPage}