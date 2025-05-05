import { CartPage } from "./components/CartPage"
import { HomePage } from "./components/HomePage"
import { NavbarSection } from "./components/navbar"
import { ProductPage } from "./components/ProductPage"
import { DetailProduct } from "./components/detailProduct"
import App from "./App"
const routes = [
    {path:'/',element:<App/>,children:[
        {path:'products',element:<ProductPage/>},
        {path:'cart',element:<CartPage/>},
        {path:'products/:id',element:<DetailProduct/>}
    ]},
]
export {routes}