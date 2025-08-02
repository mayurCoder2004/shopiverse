import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './pages/EditProfile';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrders';

const App = () => {
  return (
    <>
    <Navbar />
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
      <Route path="/my-orders" element={<MyOrders />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App