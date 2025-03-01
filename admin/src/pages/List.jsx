import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

function List({token}) {

  const [list,setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/v1/shop/getProducts",{} , {headers: {token}})
      console.log(response)
      if (response.data.sucess){
        setList(response.data.data)
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(backendUrl + '/api/v1/products/delete', {productId} , {headers: {token}})
      console.log(response)
      if (response.data.sucess) {
        toast.success(response.data.data)
        await fetchList()
      } else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}

        <div className='hiden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 test-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* product List */}

        {
          list.map((item,index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text:sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
