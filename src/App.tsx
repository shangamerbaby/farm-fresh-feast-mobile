
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import { seedProducts } from "./utils/seedProducts";

const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {
    // Seed products when the app starts
    seedProducts();
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route 
                      path="/app" 
                      element={
                        <ProtectedRoute>
                          <Layout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Index />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="product/:id" element={<ProductDetails />} />
                      <Route path="cart" element={<Cart />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="account" element={<Account />} />
                      <Route path="admin" element={
                        <ProtectedRoute requireAdmin={true}>
                          <Admin />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                    {/* Redirect root path to login */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
