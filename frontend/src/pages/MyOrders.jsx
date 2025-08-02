import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/orders/my-orders/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Make sure data is an array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Expected array but got:", data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
            <p><strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="list-disc ml-5">
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.product?.title || 'Unknown Product'} — x{item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;