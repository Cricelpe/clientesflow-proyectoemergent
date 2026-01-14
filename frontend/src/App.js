import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroWithForm from './components/HeroWithForm';
import PainSection from './components/PainSection';
import ValueBento from './components/ValueBento';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LandingGenerator from './components/LandingGenerator';
import { Toaster } from './components/ui/sonner';
import './App.css';

// Página principal (Landing de Clientesflow)
function HomePage() {
  return (
    <>
      <HeroWithForm />
      <PainSection />
      <ValueBento />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/generator" element={<LandingGenerator />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}
