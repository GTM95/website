import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import UpdatePassword from './pages/UpdatePassword';
import Booking from './pages/Booking';
import Terms from './pages/Terms';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

import Calculator from './components/Calculator';
import Testimonials from './components/Testimonials';
import Studio from './components/Studio';
import FAQ from './components/FAQ';
import FormatGuide from './components/FormatGuide';

import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

const Home = () => (
  <>
    <Hero />
    <Services />
    <FormatGuide />
    <Process />
    <Pricing />
    <Calculator />
    <Testimonials />
    <Studio />
    <FAQ />
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kunskapsbank" element={<Blog />} />
          <Route path="/kunskapsbank/:id" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/boka" element={<Booking />} />
          <Route path="/villkor" element={<Terms />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
