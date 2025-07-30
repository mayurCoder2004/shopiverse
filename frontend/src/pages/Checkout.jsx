// pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingInfo", JSON.stringify(shipping));
    navigate("/payment");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
      {["fullName", "address", "city", "postalCode", "country"].map((field) => (
        <input
          key={field}
          type="text"
          required
          placeholder={field}
          value={shipping[field]}
          onChange={(e) => setShipping({ ...shipping, [field]: e.target.value })}
          className="w-full p-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Continue to Payment
      </button>
    </form>
  );
};

export default Checkout;
