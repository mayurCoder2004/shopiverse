import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce delay-1000">🛒</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-bounce delay-2000">💳</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 animate-bounce delay-500">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-3xl opacity-20 animate-bounce delay-1500">💎</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-10 px-4">
        {/* Header with gradient styling */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse">
              🛒 Your Shopping Cart
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight tracking-tight">
            Your Cart
          </h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4 animate-bounce">🛍️</div>
              <p className="text-xl text-gray-600 font-light mb-6">Your cart is empty</p>
              <Link to="/products">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Shopping</span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">🚀</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.id || item._id}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        <span className="text-purple-600 font-semibold">₹{item.price}</span> x{" "}
                        <span className="text-blue-600 font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="group/btn relative px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 font-semibold rounded-full border border-red-200 hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center space-x-2">
                        <span>Remove</span>
                        <span className="text-sm group-hover/btn:rotate-12 transition-transform duration-300">🗑️</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Total Section with enhanced styling */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200 p-8 mt-8">
              <div className="text-center mb-6">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-semibold rounded-full border border-green-200 shadow-sm">
                    💰 Order Summary
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  Total: ₹{totalPrice}
                </h3>
                <Link to={"/checkout"}>
                  <button className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center space-x-3">
                      <span>Proceed to Checkout</span>
                      <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">🎯</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
              </div>

              {/* Additional stats matching hero section style */}
              <div className="flex flex-wrap justify-center gap-8 text-center pt-6 border-t border-purple-100">
                <div className="group">
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    Free
                  </div>
                  <div className="text-xs text-gray-500 font-medium">Shipping</div>
                </div>
                <div className="group">
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    24/7
                  </div>
                  <div className="text-xs text-gray-500 font-medium">Support</div>
                </div>
                <div className="group">
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    Secure
                  </div>
                  <div className="text-xs text-gray-500 font-medium">Payment</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </div>
  );
};

export default Cart;