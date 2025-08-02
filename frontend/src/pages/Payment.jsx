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
      alert("❌ Payment failed. Please try again.");
    } else if (result.paymentIntent.status === "succeeded") {
      alert("✅ Payment successful!");

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
        alert("Something went wrong saving the order. Contact support.");
      }
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 border rounded shadow"
    >
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {processing ? "Processing..." : `Pay ₹${(amount / 100).toFixed(2)}`}
      </button>
    </form>
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
        alert("Cart is empty. Please add items.");
        navigate("/cart");
      } else if (isShippingEmpty) {
        alert("Please complete shipping details first.");
        navigate("/checkout");
      } else {
        setShippingDetails(shippingInfo);
        setIsReady(true);
      }
    };

    setTimeout(checkData, 100);
  }, [cartItems, navigate]);

  const totalPrice = getTotalPrice();
  const totalAmount = Math.round(totalPrice * 100);

  if (!isReady) return null;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        amount={totalAmount}
        cartItems={cartItems}
        shippingDetails={shippingDetails}
      />
    </Elements>
  );
};

export default Payment;
