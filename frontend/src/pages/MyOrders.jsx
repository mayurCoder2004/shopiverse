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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-600 font-light">Loading orders...</p>
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
        <div className="absolute top-1/4 left-1/4 text-6xl opacity-20 animate-bounce delay-1000">📦</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-20 animate-bounce delay-2000">🚚</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 animate-bounce delay-500">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-5xl opacity-20 animate-bounce delay-1500">🎁</div>
      </div>

      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse">
              📋 Order History
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
            My Orders
          </h2>
          
          <p className="text-lg text-gray-600 font-light">
            Track your purchases and delivery status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-6xl opacity-50">🛍️</span>
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                No orders yet
              </h3>
              <p className="text-gray-600 font-light">
                Start shopping to see your orders here
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div 
                key={order._id} 
                className="group relative bg-white/70 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 border-b border-purple-100 pb-4">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-2xl font-bold text-gray-800">
                        ₹{order.totalPrice}
                      </p>
                    </div>
                    
                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isPaid 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {order.isPaid ? '💳 Paid' : '⏳ Pending Payment'}
                      </span>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isDelivered 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {order.isDelivered ? '✅ Delivered' : '🚚 In Transit'}
                      </span>
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 font-medium">💳 Payment Method:</span>
                        <span className="text-gray-700 font-medium capitalize">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl p-4 border border-purple-100">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">📦</span>
                      Order Items ({order.orderItems.length})
                    </h4>
                    <div className="space-y-2">
                      {order.orderItems.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="flex items-center justify-between py-2 px-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                            <span className="text-gray-700 font-medium">
                              {item.product?.title || 'Unknown Product'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Qty:</span>
                            <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </div>
  );
};

export default MyOrders;