import { Link,useOutletContext } from "react-router-dom"
import PropTypes from "prop-types"
import storeImg from '../assets/img/store.svg'
//NavbarSection component with amount passing as props represent total amount
function NavbarSection({amount}){

    return (
        <>
        <header className='bg-blue-500 text-white flex items-center justify-between p-5'>
            <img className='w-10 h-10' src={storeImg} alt="logo" />
            <nav> 
                <ul className="hidden md:flex justify-evenly items-center w-100 text-[1.2rem]">
                    <li>
                       <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="products">Products</Link>
                    </li>
                    <li className="relative">
                        <Link to="cart">Cart</Link>
                        <p className="absolute bg-red-600 text-white px-2 rounded-full -top-2 -right-6 text-[0.9rem]">{amount}</p>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}
//checking props type
NavbarSection.propsType={
amount:PropTypes.number.isRequired,
}
export {NavbarSection}