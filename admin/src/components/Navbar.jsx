import React from "react";
import {assets} from '../assets/assets.js'
import { ShopContext } from "../context/ShopContext.jsx";
import { useContext } from "react";



const Navbar = () => {
    const {setToken} = useContext(ShopContext)

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        navigate('/login')
    }
    return(
        <div className="flex items-center py-2 px-[4%] justify-between">
            <p className='text-2xl font-bold mb-4 mt-4 rounded-2xl'>Shop Panel</p>
            <button onClick={logout} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full">Log out</button>
        </div>
    )
}

export default Navbar