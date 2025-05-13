import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/_Home/Home";
import Products from "../pages/Products/Products";
import Categories from "../pages/Categories/Categories";
import About from "../pages/About/About";
import Favorite from "../pages/Favorite/Favorite";
import Contact from "../pages/Contact/Contact";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Profile from "../pages/Profile/Profile";

import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import CreateProduct from "../pages/NewProduct/CreateProduct";
import NotFound from "../pages/NotFound/NotFound";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

import AdminProducts from "../pages/admin/listProducts/AdminProducts";
import EditProduct from "../pages/admin/editProduct/EditProduct";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  if (user?.role !== "admin") {
    window.location.href = "/";
    return null;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* Protected Routes */}
      <Route
        path="/favorite"
        element={
          <ProtectedRoute>
            <Favorite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/addProduct"
        role="admin"
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/listProducts"
        role="admin"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <ProtectedRoute role="admin">
            <EditProduct />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
