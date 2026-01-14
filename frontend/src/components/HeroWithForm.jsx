import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import LeadRegistrationForm from './LeadRegistrationForm';

export default function HeroWithForm() {
  const handleRegistrationSuccess = (data) => {
    console.log('Lead registrado exitosamente:', data);
    // Aquí puedes añadir lógica adicional como tracking, redirección, etc.
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card border border-border">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">SaaS de generación de landings con IA</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
          Toma el control total de tus ventas{' '}
          <span className="gradient-text">y recibe leads calificados</span>{' '}
          en 24 horas usando nuestro Generador de Landings con IA
        </h1>
        
        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
          ¿Cansado de perder ventas en chats desordenados? Clientesflow es la única solución que combina landing pages de alta conversión con un CRM inteligente para garantizarte conversaciones claras, contactos priorizados y cierres más rápidos
        </p>
        
        {/* Registration Form */}
        <div className="flex justify-center mb-12">
          <LeadRegistrationForm onSuccess={handleRegistrationSuccess} />
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span>Sin tarjeta de crédito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span>Setup en 24 horas</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span>Soporte en español</span>
          </div>
        </div>
      </div>
    </section>
  );
}
