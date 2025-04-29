
import viteLogo from '/vite.svg'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavbarSection } from './components/navbar'
function App() {
  //when we click on add to cart button, it will save the item to the cart,amount(total amount of item added),
  //and the quantity of each item respectively using useState to store cart,amount and input
  const [cart,setCart]=useState([])
  const [amount,setAmount]=useState(0)
  const [input,setInput]=useState({});
  //this addToCart function passing data from ProductPage up using useOutletContext
  const addToCart=(item,inputValue)=>{
    let flag=false;
    cart.map((product)=>{
       if(product.id===item.id) flag=true;
    })
    //if the flag false which means there is not the same item currently in cart,then we would add it to cart,
    //otherwise dont add and just increase the quantity
    if(!flag){
      setCart([...cart,item])
    }
    //if the quantity of the item already exist,let that one plus with the newly added quantity,otherwise,let it equal 0
    const quantity=input[item.id]?input[item.id]:0;
    //default value would be 1 if we not changing the quantity input
    if(!inputValue[item.id]) inputValue[item.id]=1;
    //update the quantity
    setInput({
      ...input,
      [item.id]:quantity+inputValue[item.id]
    })
    //update the total ammount of items
    setAmount(amount=>amount+Number(inputValue[item.id]||1))
  }
  const addFixedItem=(data,number)=>{
    let flag=false;
    cart.map((product)=>{
       if(product.id===data.id) flag=true;
    })
    //if the flag false which means there is not the same item currently in cart,then we would add it to cart,
    //otherwise dont add and just increase the quantity
    if(!flag){
      setCart([...cart,data])
    }
    //if the quantity of the item already exist,let that one plus with the newly added quantity,otherwise,let it equal 0
    const quantity=input[data.id]?input[data.id]:0;
    //default value would be 1 if we not changing the quantity input
    //update the quantity
    setInput({
      ...input,
      [data.id]:quantity+number,
    })
    //update the total ammount of items
    setAmount(amount=>amount+Number(number||1))
  }
  return (
    <>
     <NavbarSection amount={amount}/>
     <Outlet context={{cart,addToCart,amount,setCart,setAmount,input,addFixedItem}}/>
    </>
  )
 
}

export default App
