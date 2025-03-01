import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const shopUrl = import.meta.env.VITE_SHOP_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products,setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();


    const AddToCart = async (itemId,size, subCategory) => {

        if (subCategory === 'Clothing' || subCategory === 'Mobiles' || subCategory === 'Televisons'){
            if (!size){
                toast.error('Please select size')
                return
            }
            
        }

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size]++;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)  
        
        if (token) {
            try {
                await axios.post(backendUrl + '/api/v1/cart/add', {itemId,size}, {headers : {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems) {
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const getCartAmount =  () => {
        let total = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0){
                        total += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            } 
        }
        return total
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (token){
            try {
                await axios.post(backendUrl+ '/api/v1/cart/update', {itemId, size, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + "/api/v1/products/list")
            console.log(response)
            if (response.data.sucess){
                setProducts(response.data.data)
            } else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/v1/cart/get', {}, {headers: {token}})
            if (response.data.success){
                setCartItems(response.data.cartData)
            } else{
                toast.error(response.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    },[])

    useEffect(() => {
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products,
        currency,
        delivery_fee, 
        search, 
        setSearch, 
        showSearch, 
        setShowSearch, 
        cartItems, 
        AddToCart, 
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems,
        shopUrl

    }

    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export {ShopContext, ShopContextProvider};