import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const Order = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchUserOrders = async () => {
    if (!token) return
    try {
      const response = await axios.post(
        backendUrl + '/list',
        {},
        { headers: { token } }
      )
      if (response.data.success) {
        console.log("✅ Orders fetched successfully:", response.data.orders)
        setOrders(response.data.orders)
      } else {
        console.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // ✅ function to update order status
 const updateStaus = async (orderId, newStatus) => {
  try {
    const response = await axios.post(
      backendUrl + "/status",
      { orderId, status: newStatus },
      { headers: { token } }
    );

    if (response.data.success) {
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};


  useEffect(() => {
    fetchUserOrders()
  }, [token])

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Order Page
      </h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="border rounded-lg p-4 mb-6 bg-white shadow"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={assets.parcel_icon} alt="parcel" className="w-8" />
                <span className="font-semibold text-lg text-gray-700">
                  Order #{index + 1}
                </span>
              </div>
              {/* Status Select */}
              <select
                value={order.status || "Order Placed"}
                onChange={(e) => updateStaus(order._id, e.target.value)}
                className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Items */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
              {order.items.map((item, i) => (
                <p key={i} className="text-gray-700">
                  {item.name} x {item.quantity}{" "}
                  <span className="text-sm text-gray-500">({item.size})</span>
                </p>
              ))}
            </div>

            {/* Order Details */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Order Details:</h4>
              <p className="text-gray-700">
                <span className="font-medium">Payment Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Payment Status:</span>{" "}
                {order.payment ? "Paid" : "Unpaid"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Quantity:</span>{" "}
                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Amount:</span> ${order.amount}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleString()}
              </p>
            </div>

            {/* Address */}
            {order.address && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Shipping Address:</h4>
                <p>{order.address.firstname} {order.address.lastname}</p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state} {order.address.zipcode}
                </p>
                <p>{order.address.country}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
