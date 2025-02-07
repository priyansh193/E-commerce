import React, { useEffect, useState } from "react"
import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import {Routes, Route} from 'react-router-dom'
import Orders from "./pages/Orders.jsx"
import AddFashion from "./pages/AddFashion.jsx"
import List from "./pages/List.jsx"
import Login from "./components/Login.jsx"
import {ToastContainer} from 'react-toastify'
import Add from './pages/Add.jsx'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
 
function App() {

  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  useEffect(() => {
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === ""
        ? <Login setToken={setToken}/>
        :
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className="flex w-full">
            <Sidebar/>
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path='/add' element = {<Add/>}/>
                <Route path='/list' element = {<List token={token}/>}/>
                <Route path='/orders' element = {<Orders token={token}/>}/>
                <Route path='/fashion' element = {<AddFashion token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
    } 
    </div>
  )
}

export default App
