import { Link } from "react-router-dom"
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
                    <li>
                        <Link to="cart">Cart</Link>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    )
}
export {NavbarSection}