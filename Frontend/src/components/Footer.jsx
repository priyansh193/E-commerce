import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-20 rounded-md' alt="Company Logo" />
            <p className='max-w-md text-gray-600'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim exercitationem, distinctio dolorem ratione reprehenderit accusamus?
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'> 
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/delivery">Delivery</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><a href="tel:+12124567890">+1-212-456-7890</a></li>
                <li><a href="mailto:contact@us.com">contact@us.com</a></li>
            </ul>
        </div>
      </div>

      <div>
        <hr className="border-gray-300"/>
        <p className='py-5 text-sm text-center text-gray-600'>
          &copy; 2025 Ecomm.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer

