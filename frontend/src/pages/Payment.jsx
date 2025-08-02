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

      const order = {
        items: cartItems,
        shippingDetails,
        amount,
        paymentId: result.paymentIntent.id,
        createdAt: new Date().toISOString(),
      };

      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, order])
      );

      localStorage.removeItem("cart"); // clear cart
      localStorage.removeItem("shippingInfo"); // optional: clear shipping info

      navigate("/order-confirmation");
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
        shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
      } catch (error) {
        console.error("Failed to parse shipping info:", error);
      }

      const isCartEmpty = cartItems.length === 0;
      const isShippingEmpty =
        !shippingInfo ||
        !shippingInfo.fullName?.trim() ||
        !shippingInfo.address?.trim() ||
        !shippingInfo.city?.trim();

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