import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import Loginpopup from './components/Loginpopup/Loginpopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <div className='app'>
        <ToastContainer />
        {isLogin ? <Loginpopup setIsLogin={setIsLogin} /> : <></>}
        <Navbar setIsLogin={setIsLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;