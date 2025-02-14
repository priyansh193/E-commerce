import React, { useContext, useEffect, useState } from 'react'
import  {ShopContext}  from '../context/ShopContext'
import ProductItem from './ProductItem.jsx'

function ElectronicCollection() {
    const {products, navigate} = useContext(ShopContext)
    const [filterProduct, setFilterProduct] = useState([])


    useEffect(() => {
        const filter = products.filter((item) => item.category === 'Electronics')
        setFilterProduct(filter.slice(0,5))
        console.log(filterProduct)
    },[products])
    

    return (
        <div className='my-10'>
            <h2 className='text-2xl font-bold mb-4 cursor-pointer'>Electronics</h2>
    
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    filterProduct.map((item,index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))
                }
            </div>
          
        </div>
      )
}

export default ElectronicCollection