import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem.jsx'

function LatestCollection() {
    const { products, navigate } = useContext(ShopContext)
    const [filterProduct, setFilterProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (products.length > 0) {
            const filter = products
                .filter((item) => item.category === 'Fashion')
                .slice(0, 5)
            setFilterProduct(filter)
            setIsLoading(false)
        }
    }, [products])

    if (isLoading) {
        return (
            <div className='my-10'>
                <h2 className='text-2xl font-bold mb-4'>Fashion</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className='animate-pulse'>
                            <div className='bg-gray-200 h-40 w-full rounded-lg mb-2'></div>
                            <div className='bg-gray-200 h-4 w-3/4 rounded mb-2'></div>
                            <div className='bg-gray-200 h-4 w-1/2 rounded'></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='my-10'>
            <h2 onClick={() => navigate('/fashion')} className='text-2xl font-bold mb-4 cursor-pointer'>
                Fashion
            </h2>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {filterProduct.map((item, index) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestCollection