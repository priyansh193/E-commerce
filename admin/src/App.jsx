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
import AddElectronics from "./pages/AddElectronics.jsx"
import AddHomeLiving from "./pages/AddHomeLiving.jsx"
import AddBeauty from "./pages/AddBeauty.jsx"
import AddBooksToys from "./pages/AddBooksToys.jsx"
import AddSports from "./pages/AddSports.jsx"
import { useContext } from "react"
import { ShopContext } from "./context/ShopContext.jsx"

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
 
function App() {

  const {token, setToken} = useContext(ShopContext)

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer/>
      {token === ""
        ? <Login/>
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
                <Route path='/Fashion' element = {<AddFashion token={token}/>} />
                <Route path='/Electronics' element = {<AddElectronics token={token}/>} />
                <Route path='/HomeLiving' element = {<AddHomeLiving token={token}/>} />
                <Route path='/Beauty' element = {<AddBeauty token={token}/>} />
                <Route path='/BooksToys' element = {<AddBooksToys token={token}/>} />
                <Route path='/Sports' element = {<AddSports token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
    } 
    </div>
  )
}

export default App
