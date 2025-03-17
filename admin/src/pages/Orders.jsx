import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/shop/getOrders",
        {},
        { headers: { token } }
      );
      console.log(response)
      if (response.data.sucess) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.response);
      }
    } catch (error) {
      toast.error(error.message);
    }
    console.log(orders)
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/v1/order/status', {orderId, status: event.target.value}, {headers: {token}})
      if (response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div 
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
            gap-3 items-start border-2 border-gray-200 rounded-lg shadow-sm 
            p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700
            hover:border-gray-300 transition-colors" 
            key={index}
          >
            <div className="flex items-center justify-center">
              <img className="w-12" src={assets.parcel_icon} alt="Parcel" />
            </div>
            
            <div className="space-y-2">
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <p className="py-0.5" key={index}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {index !== order.items.length - 1 && " ,"}
                  </p>
                ))}
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <p className="font-medium mb-2">
                  {order.address.firstname + " " + order.address.lastname}
                </p>
                <div className="space-y-1 text-gray-600">
                  <p>{order.address.street}</p>
                  <p>
                    {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-gray-50 rounded-md">
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-lg font-medium text-gray-800">{currency}{order.amount}</p>
            </div>

            <select 
              onChange={(event) => statusHandler(event, order._id)} 
              value={order.status} 
              className="p-2 font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
