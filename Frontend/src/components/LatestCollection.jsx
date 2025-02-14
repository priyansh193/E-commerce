import React, { useContext, useEffect, useState } from 'react'
import  {ShopContext}  from '../context/ShopContext'
import ProductItem from './ProductItem.jsx'

function LatestCollection() {
    const {products, navigate} = useContext(ShopContext)
    const [filterProduct, setFilterProduct] = useState([])


    useEffect(() => {
        const filter = products.filter((item) => item.category === 'Fashion')
        setFilterProduct(filter.slice(0,5))
        console.log(filterProduct)
    },[products])
    

    return (
        <div className='my-10'>
            <div >
                <span className="font-semibold">Fashion</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                <path
                fillRule="evenodd"
                d="M4 12h12m0 0l-4-4m4 4l-4 4"
                clipRule="evenodd"
                />
                </svg>
            </div>

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

export default LatestCollection
