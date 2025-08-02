import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";

const OrderConfirmation = () => {
  const { id } = useParams(); // orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
        clearCart(); // ✅ clear cart after order is successfully fetched
      })
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setLoading(false);
      });
  }, [id, clearCart]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!order || !order.shippingAddress || !order.orderItems) {
    return (
      <div className="text-center mt-10 text-red-600">
        Order data is incomplete or corrupted.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        ✅ Order Confirmed!
      </h2>

      <p className="mb-2">
        <strong>Order ID:</strong> {order._id}
      </p>

      <p className="mb-2">
        <strong>Customer:</strong> {order.user?.name} ({order.user?.email})
      </p>

      <p className="mb-2">
        <strong>Payment Method:</strong> {order.paymentMethod}
      </p>

      <p className="mb-2">
        <strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}
      </p>

      <p className="mb-2">
        <strong>Paid:</strong>{" "}
        {order.isPaid ? (
          <span className="text-green-600 font-semibold">Yes</span>
        ) : (
          <span className="text-red-600 font-semibold">No</span>
        )}
      </p>

      <p className="mb-4">
        <strong>Delivered:</strong>{" "}
        {order.isDelivered ? (
          <span className="text-green-600 font-semibold">Yes</span>
        ) : (
          <span className="text-red-600 font-semibold">No</span>
        )}
      </p>

      <h3 className="font-semibold text-lg mt-4 mb-2">Shipping Details:</h3>
      <ul className="mb-4">
        <li>
          <strong>Address:</strong> {order.shippingAddress.address},{" "}
          {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
          {order.shippingAddress.country}
        </li>
      </ul>

      <h3 className="font-semibold text-lg mb-2">Items:</h3>
      <ul className="list-disc list-inside">
        {order.orderItems.map((item, index) => (
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
