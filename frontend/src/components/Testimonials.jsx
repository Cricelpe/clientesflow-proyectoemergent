import React from 'react';
import { StaggerTestimonials } from './ui/stagger-testimonials';

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Dueños de negocios que ya recuperaron el control de su WhatsApp
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Testimonios reales de emprendedores que multiplicaron sus ventas con Clientesflow
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <StaggerTestimonials />
      </div>
    </section>
  );
}
