import React, { useState } from 'react' 
import Navbar from './components/navbar/Navbar' 
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'
import Cart from './pages/cart/cart'
import PlaceOrder from './pages/placeorder/placeorder'
import Footer from './components/footer/footer'
import Loginpopup from './components/login/login'
import Verify from './pages/verify/verify'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Myorder from './pages/myorders/myorder'

function App() {
  const[showlogin, setShowlogin] = useState(false)
  return (
    <>
      <ToastContainer/>
    {showlogin?<Loginpopup  setShowlogin={setShowlogin}/>:<></>}
       <div className='app'>   
      <Navbar 
      setShowlogin={setShowlogin}
      />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/Order' element={<PlaceOrder/>} />
        <Route path='*' element={<Home/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/myorder" element={<Myorder/>} />
      </Routes>
    </div>
    <Footer />
    </>
 
  )
} 
export default App 