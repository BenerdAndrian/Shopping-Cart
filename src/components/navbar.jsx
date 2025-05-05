import { Link,useOutletContext } from "react-router-dom"
import PropTypes from "prop-types"
import storeImg from '../assets/img/store.svg'
import { useState } from "react"
//NavbarSection component with amount passing as props represent total amount
function NavbarSection({amount}){
    const [menu,setMenu]=useState(false)
   const toggleMenu=()=>{
     if(menu) setMenu(false);
     else setMenu(true)
   }
    return (
        <>
        <header className='bg-blue-500 text-white flex items-center justify-between p-5 absolute z-200 w-full'>
            <img className='w-10 h-10' src={storeImg} alt="logo" />
            <nav> 
                <ul className="hidden md:flex justify-evenly items-center w-100 text-[1.2rem]">
                    <li className="after:content-[''] after:w-0 after:h-[2px] after:bg-white after:block after:m-auto after:transition-all after:duration-300 hover:after:w-full">
                        <Link to="products">Products</Link>
                    </li>
                    <li className="relative after:content-[''] after:w-0 after:h-[2px] after:bg-white after:block after:m-auto after:transition-all after:duration-500 hover:after:w-full">
                        <Link to="cart">Cart</Link>
                        <p className="absolute bg-red-600 text-white px-2 rounded-full -top-2 -right-6 text-[0.9rem]">{amount}</p>
                    </li>
                </ul>
                 <div class="md:hidden">
            <button onClick={toggleMenu} id="menu-btn" className="focus:outline-none cursor-pointer">
                <span className="relative">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <p className="absolute bg-red-600 text-white px-2 rounded-full -top-2 -right-6 text-[0.9rem]">{amount}</p>
                </span>
               
            </button>
            </div>
            </nav>
        </header>
        <div id="mobile-menu" className={`block absolute md:-top-20 ${menu?'top-20':'-top-20'} w-full px-4 pt-2 pb-4 bg-white shadow z-100 transition-all duration-300`}>
            <ul class="space-y-2">
            <li> <Link to="products">Products</Link></li>
            <li> 
            <Link to="cart">
             <span className="relative">
                Cart
                <p className="absolute bg-red-600 text-white px-2 rounded-full -top-2 -right-6 text-[0.9rem]">{amount}</p>
             </span>
            </Link>
           
            </li>
            </ul>
           </div>
        </>
    )
}
//checking props type
NavbarSection.propsType={
amount:PropTypes.number.isRequired,
}
export {NavbarSection}