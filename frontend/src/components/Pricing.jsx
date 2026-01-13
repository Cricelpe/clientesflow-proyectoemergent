import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button, buttonVariants } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useMediaQuery } from '../hooks/use-media-query';
import { cn } from '../lib/utils';

const clientesflowPlans = [
  {
    name: "STARTER",
    subtitle: "Emprendedor",
    price: "29",
    yearlyPrice: "24",
    period: "mes",
    features: [
      "1 Landing con IA",
      "Hosting y SSL incluido",
      "Integración WhatsApp básica",
      "CRM para 50 leads",
      "Soporte por email"
    ],
    description: "Perfecto para emprendedores que inician",
    buttonText: "Comenzar Ahora",
    href: "#",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    subtitle: "Negocio en Crecimiento",
    price: "59",
    yearlyPrice: "47",
    period: "mes",
    features: [
      "Landings Ilimitadas",
      "Dominio Personalizado",
      "CRM con Priorización IA",
      "Soporte 24/7",
      "Integración Meta Ads",
      "Analytics Avanzado",
      "Automatización de seguimiento"
    ],
    description: "Ideal para negocios que escalan ventas",
    buttonText: "Empezar Gratis 7 Días",
    href: "#",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    subtitle: "Corporativo",
    price: "149",
    yearlyPrice: "119",
    period: "mes",
    features: [
      "Todo lo anterior",
      "Multi-agente para WhatsApp",
      "IA de calificación avanzada",
      "Reportes de ROI automáticos",
      "Gestor de cuenta dedicado",
      "Integraciones personalizadas",
      "SLA garantizado"
    ],
    description: "Para empresas con alto volumen de leads",
    buttonText: "Contactar Ventas",
    href: "#",
    isPopular: false,
  },
];

export default function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef(null);

  const handleToggle = (checked) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          '#f97316', // Orange
          '#a3e635', // Lime
          '#22c55e', // Green
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      });
    }
  };

  return (
    <section id="precios" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
            Elige el plan perfecto para tu negocio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Todos los planes incluyen acceso completo a la plataforma, herramientas de generación de leads y soporte dedicado
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={cn(
            "font-semibold transition-colors",
            isMonthly ? "text-foreground" : "text-muted-foreground"
          )}>
            Mensual
          </span>
          <Label>
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
          <span className={cn(
            "font-semibold transition-colors",
            !isMonthly ? "text-foreground" : "text-muted-foreground"
          )}>
            Anual{' '}
            <span className="text-primary">(Ahorra 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientesflowPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      scale: plan.isPopular ? 1.05 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: index * 0.2,
              }}
              className={cn(
                "rounded-2xl p-8 bg-[#121212] text-center flex flex-col relative",
                plan.isPopular 
                  ? "border-2 border-primary shadow-2xl shadow-primary/20" 
                  : "border border-border"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary py-1.5 px-6 rounded-full flex items-center gap-2 shadow-lg">
                  <Star className="text-background h-4 w-4 fill-current" />
                  <span className="text-background font-semibold text-sm">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="flex-1 flex flex-col">
                {/* Plan Name */}
                <p className="text-lg font-bold text-foreground mb-1">
                  {plan.name}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight gradient-text">
                      ${isMonthly ? plan.price : plan.yearlyPrice}
                    </span>
                    <span className="text-lg font-semibold text-muted-foreground">
                      / {plan.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {isMonthly ? 'Facturado mensualmente' : 'Facturado anualmente'}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-left">
                      <Check className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={cn(
                    "w-full text-base font-semibold py-6 transition-all",
                    plan.isPopular
                      ? "bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background shadow-lg shadow-primary/30"
                      : "bg-card border-2 border-border hover:border-primary hover:bg-card/80"
                  )}
                >
                  {plan.buttonText}
                </Button>

                <p className="mt-4 text-xs text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Tienes preguntas? <a href="#" className="text-primary hover:underline font-semibold">Contáctanos</a> o revisa nuestras{' '}
            <a href="#" className="text-primary hover:underline font-semibold">Preguntas Frecuentes</a>
          </p>
        </div>
      </div>
    </section>
  );
}
