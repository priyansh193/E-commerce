import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])

    const value = {
        
        currency,
        navigate,
        backendUrl,
        token,
        setToken,

    }

    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopContextProvider};