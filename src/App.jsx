
import viteLogo from '/vite.svg'

import { Outlet } from 'react-router-dom'
import { NavbarSection } from './components/navbar'
function App() {
  return (
    <>
     <NavbarSection/>
     <Outlet/>
    </>
  )
 
}

export default App
