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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full mx-auto mb-6"></div>
          <p className="text-2xl text-purple-600 font-semibold">Loading your order...</p>
        </div>
      </div>
    </div>
  );

  if (!order || !order.shippingAddress || !order.orderItems) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-red-200 p-12 max-w-md mx-auto text-center">
            <div className="text-6xl mb-4 animate-bounce">❌</div>
            <p className="text-xl text-red-600 font-semibold">Order data is incomplete or corrupted.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce delay-1000">🎉</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-bounce delay-2000">📦</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 animate-bounce delay-500">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-3xl opacity-20 animate-bounce delay-1500">🚚</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-10 px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="text-8xl animate-bounce mb-4">🎉</div>
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-lg font-semibold rounded-full border border-green-200 shadow-sm animate-pulse">
              ✅ Order Confirmed Successfully!
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
            Thank You for Your Order!
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Your order has been successfully placed and will be processed shortly. We'll send you updates via email.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Order Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-gray-600 font-medium">Order ID:</span>
                    <span className="font-semibold text-purple-600">{order._id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-gray-600 font-medium">Customer:</span>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{order.user?.name}</div>
                      <div className="text-sm text-gray-500">{order.user?.email}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-purple-100">
                    <span className="text-gray-600 font-medium">Payment Method:</span>
                    <span className="font-semibold text-gray-800">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Total Amount:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">₹{order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Status */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">Order Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                    <div className="text-2xl">💳</div>
                    <div>
                      <div className="font-semibold text-green-800">Payment Status</div>
                      <div className="text-sm">
                        {order.isPaid ? (
                          <span className="text-green-600 font-semibold flex items-center space-x-1">
                            <span>✅</span><span>Paid Successfully</span>
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold flex items-center space-x-1">
                            <span>❌</span><span>Payment Pending</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                    <div className="text-2xl">🚚</div>
                    <div>
                      <div className="font-semibold text-blue-800">Delivery Status</div>
                      <div className="text-sm">
                        {order.isDelivered ? (
                          <span className="text-green-600 font-semibold flex items-center space-x-1">
                            <span>✅</span><span>Delivered</span>
                          </span>
                        ) : (
                          <span className="text-orange-600 font-semibold flex items-center space-x-1">
                            <span>⏳</span><span>Processing</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-3xl">🏠</div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Shipping Address</h3>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold">{order.shippingAddress.address}</span><br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="text-3xl">📦</div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Order Items</h3>
          </div>
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{item.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link to="/my-orders">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden mr-4">
              <span className="relative z-10 flex items-center space-x-3">
                <span>View My Orders</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">📋</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          
          <Link to="/products">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-3">
                <span>Continue Shopping</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">🛍️</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-center pt-8 mt-8 border-t border-purple-100">
            <div className="group">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-xs text-gray-500 font-medium">Support</div>
            </div>
            <div className="group">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                Free
              </div>
              <div className="text-xs text-gray-500 font-medium">Returns</div>
            </div>
            <div className="group">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                Secure
              </div>
              <div className="text-xs text-gray-500 font-medium">Delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </div>
  );
};

export default OrderConfirmation;