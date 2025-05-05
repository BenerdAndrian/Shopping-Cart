import { CartPage } from "./components/CartPage"
import { HomePage } from "./components/HomePage"
import { NavbarSection } from "./components/navbar"
import { ProductPage } from "./components/ProductPage"
import { DetailProduct } from "./components/detailProduct"
import App from "./App"
const routes = [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element:<ProductPage/> },  // redirect default to /products
        { path: 'products', element: <ProductPage /> },
        { path: 'products/:id', element: <DetailProduct /> },
        { path: 'cart', element: <CartPage /> },
      ]
    },
  ];
  
export {routes}