import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orders from './pages/Orders.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import FashionCollection from './pages/FashionCollection.jsx'
import ElectronicsCollection from './pages/ElectronicsCollection.jsx'
import HomeCollection from './pages/HomeCollection.jsx'
import BeautyCollection from './pages/BeautyCollection.jsx'
import SportsCollection from './pages/SportsCollection.jsx'
import ToysCollection from './pages/ToysCollection.jsx'
import Verify from './pages/Verify.jsx'

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> 
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/fashion' element={<FashionCollection/>} />
        <Route path='/electronics' element={<ElectronicsCollection/>} />
        <Route path='/home-collection' element={<HomeCollection/>} />
        <Route path='/beauty' element={<BeautyCollection/>} />
        <Route path='/sports' element={<SportsCollection/>} />
        <Route path='/toys' element={<ToysCollection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>

      <Footer/>
    </div>
  )
}

export default App

