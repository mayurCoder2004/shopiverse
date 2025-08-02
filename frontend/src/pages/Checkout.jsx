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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

      {["address", "city", "postalCode", "country"].map((field) => (
        <input
          key={field}
          type="text"
          required
          placeholder={field}
          value={shippingAddress[field]}
          onChange={(e) =>
            setShippingAddress({ ...shippingAddress, [field]: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default Checkout;