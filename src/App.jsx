
import viteLogo from '/vite.svg'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavbarSection } from './components/navbar'
function App() {
  const [cart,setCart]=useState([])
  const [amount,setAmount]=useState()
  const addToCart=(item,number)=>{
    setCart([...cart,item])
    setAmount(number)
  }
  return (
    <>
     <NavbarSection amount={amount}/>
     <Outlet context={{cart,addToCart,amount,setCart}}/>
    </>
  )
 
}

export default App
