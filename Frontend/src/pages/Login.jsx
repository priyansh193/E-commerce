import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {

  const [currentState, setCurrentState] = useState('Login')
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)

  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up'){
        const response = await axios.post(backendUrl+ '/api/v1/users/register', {name,email,password})
        if (response.data.sucess){
          toast.success("user created sucessfully")
          const responseLogin = await axios.post(backendUrl+ '/api/v1/users/login', {email,password})
          if (responseLogin.data.sucess){
            setToken(responseLogin.data.data.refreshToken)
            localStorage.setItem('token', responseLogin.data.data.refreshToken)
          } else{
            toast.error(responseLogin.data.message)
          }
        }
        else{
          toast.error(response.data.message)
        }
      } else{
        const response = await axios.post(backendUrl+ '/api/v1/users/login', {email,password})
        if (response.data.sucess){
          setToken(response.data.data.refreshToken)
          localStorage.setItem('token', response.data.data.refreshToken)
        } else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-centerw-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
      <input onChange={(e) => setEmail(e.target.value)}  type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input onChange={(e) => setPassword(e.target.value)}  type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget Password</p>
        {
          currentState === 'Login' 
          ? <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p>
          : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
