import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save shipping info to localStorage
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

    // Navigate to payment
    navigate("/payment");
  };

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
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce delay-1000">📦</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-bounce delay-2000">🏠</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 animate-bounce delay-500">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-3xl opacity-20 animate-bounce delay-1500">📍</div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-10 px-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 w-full max-w-xl">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse">
                📦 Shipping Details
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Shipping Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["address", "city", "postalCode", "country"].map((field, index) => (
              <div key={field} className="relative group" style={{ animationDelay: `${index * 100}ms` }}>
                <input
                  type="text"
                  required
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  value={shippingAddress[field]}
                  onChange={(e) =>
                    setShippingAddress({ ...shippingAddress, [field]: e.target.value })
                  }
                  className="w-full p-4 border-2 border-purple-200 rounded-2xl bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:bg-white/70 transition-all duration-300 text-gray-700 placeholder-gray-500 hover:shadow-lg focus:shadow-xl focus:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}

            <button
              type="submit"
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Continue to Payment</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">🚀</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-center pt-6 mt-6 border-t border-purple-100">
            <div className="group">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                Secure
              </div>
              <div className="text-xs text-gray-500 font-medium">Checkout</div>
            </div>
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
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </div>
  );
};

export default Checkout;