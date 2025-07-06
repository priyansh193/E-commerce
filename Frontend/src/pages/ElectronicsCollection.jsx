import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets.js'
import Title from '../components/Title.jsx'
import ProductItem from '../components/ProductItem.jsx'
import Pagination from '../components/Pagination.jsx'

function ElectronicsCollection() {
  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const productsPerPage = 4 // Changed to match grid layout better

  useEffect(() => {
      applyFilter();
    }, [subCategory, search]);
  
    useEffect(() => {
      sortProduct();
    }, [sortType]);
  
    const toggleSubCategory = (e) => {
      if (subCategory.includes(e.target.value)) {
        setSubCategory(prev => prev.filter(item => item !== e.target.value));
      } else {
        setSubCategory(prev => [...prev, e.target.value]);
      }
    };
  
    const applyFilter = () => {
      setIsLoading(true)
      try {
        let productsCopy = products.filter((item) => item.category === 'Electronics')
        
        if (showSearch && search) {
          productsCopy = productsCopy.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        }
  
        if (subCategory.length > 0) {
          productsCopy = productsCopy.filter(item => 
            subCategory.includes(item.subCategory)
          )
        }
  
        setFilterProducts(productsCopy)
      } catch (error) {
        console.error('Filtering error:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    const sortProduct = () => {
      let fpCopy = [...filterProducts];
  
      switch (sortType) {
        case 'low-high':
          setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
          break;
  
        case 'high-low':
          setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
          break;
  
        default:
          applyFilter();
          break;
      }
    };

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filterProducts.length / productsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [subCategory, search, sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Categroy filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden '} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Mobiles'} onChange={toggleSubCategory} /> Mobiles
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Televisions'} onChange={toggleSubCategory} /> Televisions
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Appilances'} onChange={toggleSubCategory} /> Appliances
            </p>

          </div>
        </div>
        {/* Subcatrgory filter */}
        
      </div>

      {/*  Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'Electronics'} text2={'COLLECTION'}/>
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavant">Sort by : Relavant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {isLoading ? (
            <div>Loading...</div>
          ) : currentProducts.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found
            </div>
          ) : (
            currentProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

      </div>
      
    </div>
  )
}

export default ElectronicsCollection