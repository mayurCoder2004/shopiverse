// /pages/OrderConfirmation.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { id } = useParams(); // orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!order)
    return (
      <div className="text-center mt-10 text-red-600">
        Order not found or something went wrong.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        ✅ Order Confirmed!
      </h2>
      <p className="mb-2">
        <strong>Order ID:</strong> {order._id}
      </p>
      <p className="mb-2">
        <strong>Payment ID:</strong> {order.paymentId}
      </p>
      <p className="mb-4">
        <strong>Total:</strong> ₹{(order.amount / 100).toFixed(2)}
      </p>

      <h3 className="font-semibold text-lg mt-4 mb-2">Shipping Details:</h3>
      <ul className="mb-4">
        <li>
          <strong>Name:</strong> {order.shippingDetails.fullName}
        </li>
        <li>
          <strong>Address:</strong> {order.shippingDetails.address},{" "}
          {order.shippingDetails.city}
        </li>
      </ul>

      <h3 className="font-semibold text-lg mb-2">Items:</h3>
      <ul className="list-disc list-inside">
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} x {item.quantity} - ₹{item.price}
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <Link
          to="/my-orders"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;