import { CartPage } from "./components/CartPage"
import { HomePage } from "./components/HomePage"
import { NavbarSection } from "./components/navbar"
import { ProductPage } from "./components/ProductPage"
import App from "./App"
const routes = [
    {path:'/',element:<App/>,children:[
        {index:true,element:<HomePage/>},
        {path:'products',element:<ProductPage/>},
        {path:'cart',element:<CartPage/>}
    ]},
]
export {routes}