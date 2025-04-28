import { Link,useOutletContext } from "react-router-dom"
function NavbarSection(){
    return (
        <>
        <header className='bg-blue-500 text-white flex items-center justify-between p-5'>
            <h2>This is the logo</h2>
            <nav>
                <ul className="flex justify-evenly items-center w-100 text-[1.2rem]">
                    <li>
                       <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="products">Products</Link>
                    </li>
                    <li classNae="relative">
                        <Link to="cart">Cart</Link>
                        <p className="absolute bg-red-600 text-white p-1">{amount}</p>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}
export {NavbarSection}