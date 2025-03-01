import React from 'react'
import { useContext } from 'react'
import {ShopContext} from '../context/ShopContext.jsx'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Verify() {

    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendUrl+ '/api/v1/order/verify', {success,orderId}, {headers: {token}})
            
            if (response.data.success){
                setCartItems({})
                navigate('/orders')
            } else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token){
            verifyPayment()
        }
    }, [token]); 


  return (
    <div>
      <p>Verifying Payment...</p>
    </div>
  )
}

export default Verify
