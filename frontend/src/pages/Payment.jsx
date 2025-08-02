import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({ amount, cartItems, shippingDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (amount > 0) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/create-payment-intent`, {
          amount,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating PaymentIntent:", err);
        });
    }
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error("Payment Error:", result.error.message);
      toast.error('❌ Payment failed. Please try again.', {
        style: {
          background: 'linear-gradient(135deg, #ef4444, #ec4899)',
          color: 'white',
          borderRadius: '16px',
          padding: '16px',
          fontWeight: '600',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
        duration: 4000,
      });
    } else if (result.paymentIntent.status === "succeeded") {
      toast.success('✅ Payment successful! Redirecting...', {
        style: {
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          borderRadius: '16px',
          padding: '16px',
          fontWeight: '600',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#10b981',
        },
        duration: 3000,
      });

      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/orders`,
          {
            orderItems: cartItems.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            shippingAddress: shippingDetails,
            paymentMethod: "Card",
            totalPrice: amount / 100,
            isPaid: true, // ✅ add this
            paidAt: new Date().toISOString(), // ✅ optional but recommended
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        localStorage.removeItem("cart");
        localStorage.removeItem("shippingInfo");
        navigate(`/order-confirmation/${response.data._id}`);
      } catch (error) {
        console.error(
          "❌ Failed to save order:",
          error.response?.data || error.message
        );
        toast.error('❌ Something went wrong saving the order. Contact support.', {
          style: {
            background: 'linear-gradient(135deg, #ef4444, #ec4899)',
            color: 'white',
            borderRadius: '16px',
            padding: '16px',
            fontWeight: '600',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
          },
          duration: 5000,
        });
      }
    }

    setProcessing(false);
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
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce delay-1000">💳</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-bounce delay-2000">💰</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-20 animate-bounce delay-500">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-3xl opacity-20 animate-bounce delay-1500">🔒</div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-10 px-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100 p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-semibold rounded-full border border-purple-200 shadow-sm animate-pulse">
                💳 Secure Payment
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">Payment Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-purple-200 p-4 hover:shadow-lg focus-within:shadow-xl focus-within:scale-[1.02] transition-all duration-300">
                <CardElement 
                  className="text-gray-700"
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#374151',
                        '::placeholder': {
                          color: '#9CA3AF',
                        },
                      },
                    },
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <button
              type="submit"
              disabled={!stripe || processing}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>{processing ? "Processing..." : `Pay ₹${(amount / 100).toFixed(2)}`}</span>
                {!processing && (
                  <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">💎</span>
                )}
                {processing && (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-center pt-6 mt-6 border-t border-purple-100">
            <div className="group">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                SSL
              </div>
              <div className="text-xs text-gray-500 font-medium">Encrypted</div>
            </div>
            <div className="group">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                Stripe
              </div>
              <div className="text-xs text-gray-500 font-medium">Powered</div>
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

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50 transform rotate-1"></div>
    </div>
  );
};

const Payment = () => {
  const { cartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(null);

  useEffect(() => {
    const checkData = () => {
      let shippingInfo = null;
      try {
        shippingInfo = JSON.parse(localStorage.getItem("shippingAddress")); // ✅ match key
      } catch (error) {
        console.error("Failed to parse shipping info:", error);
      }

      const isCartEmpty = cartItems.length === 0;
      const isShippingEmpty =
        !shippingInfo ||
        !shippingInfo.address?.trim() ||
        !shippingInfo.city?.trim() ||
        !shippingInfo.postalCode?.trim() ||
        !shippingInfo.country?.trim(); // ✅ check correct fields

      if (isCartEmpty) {
        toast.error('⚠️ Cart is empty. Please add items.', {
          style: {
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: 'white',
            borderRadius: '16px',
            padding: '16px',
            fontWeight: '600',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#f59e0b',
          },
          duration: 3000,
        });
        setTimeout(() => navigate("/cart"), 2000);
      } else if (isShippingEmpty) {
        toast.error('⚠️ Please complete shipping details first.', {
          style: {
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: 'white',
            borderRadius: '16px',
            padding: '16px',
            fontWeight: '600',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#f59e0b',
          },
          duration: 3000,
        });
        setTimeout(() => navigate("/checkout"), 2000);
      } else {
        setShippingDetails(shippingInfo);
        setIsReady(true);
      }
    };

    setTimeout(checkData, 100);
  }, [cartItems, navigate]);

  const totalPrice = getTotalPrice();
  const totalAmount = Math.round(totalPrice * 100);

  if (!isReady) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-300 border-t-purple-600 rounded-full mx-auto mb-4"></div>
        <p className="text-purple-600 font-semibold">Loading...</p>
      </div>
    </div>
  );

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#374151',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(147, 51, 234, 0.1)',
          },
        }}
      />
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={totalAmount}
          cartItems={cartItems}
          shippingDetails={shippingDetails}
        />
      </Elements>
    </>
  );
};

export default Payment;