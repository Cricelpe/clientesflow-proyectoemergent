import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PainSection from './components/PainSection';
import ValueBento from './components/ValueBento';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PainSection />
      <ValueBento />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <Toaster />
    </div>
  );
}
