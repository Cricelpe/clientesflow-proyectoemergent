import React from 'react';
import { Wand2, Target, BarChart3, Users, Clock, Shield, Zap, Globe } from 'lucide-react';

export default function ValueBento() {
  const values = [
    {
      icon: Wand2,
      title: 'Crea tu landing page profesional y anuncios efectivos en segundos para ganar autoridad inmediata',
      description: 'IA genera textos persuasivos y diseños optimizados que convierten visitantes en compradores'
    },
    {
      icon: Target,
      title: 'Califica leads automáticamente y enfoca tu energía solo en quienes están listos para comprar hoy',
      description: 'El sistema detecta intención de compra y prioriza contactos con mayor probabilidad de cierre'
    },
    {
      icon: BarChart3,
      title: 'Mide exactamente cuántos leads recibes y cuánto dinero generas sin hojas de cálculo complicadas',
      description: 'Dashboard simple muestra conversiones, ingresos y ROI en tiempo real para tomar decisiones rápidas'
    },
    {
      icon: Users,
      title: 'Conecta WhatsApp directamente y centraliza todas las conversaciones en un solo lugar organizado',
      description: 'Cada mensaje queda registrado, nada se pierde y tu equipo puede colaborar sin confusión'
    },
    {
      icon: Clock,
      title: 'Responde más rápido con plantillas inteligentes y cierra ventas mientras tu competencia sigue durmiendo',
      description: 'Mensajes predefinidos ahorran tiempo y mantienen consistencia en tu comunicación profesional'
    },
    {
      icon: Shield,
      title: 'Protege tus datos de clientes con seguridad bancaria y cumple normativas sin contratar expertos legales',
      description: 'Encriptación automática y respaldos garantizan que tu información nunca se pierda ni se filtre'
    },
    {
      icon: Zap,
      title: 'Automatiza seguimiento de leads fríos y recupera ventas perdidas sin esfuerzo manual constante',
      description: 'Secuencias automáticas reactivan interesados y convierten dudas en compras confirmadas'
    },
    {
      icon: Globe,
      title: 'Lanza campañas multicanal coordinadas y multiplica tu alcance sin perder control de tu estrategia comercial',
      description: 'Gestiona anuncios, landings y seguimiento desde una única plataforma integrada'
    }
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Todo lo que necesitas para dominar tus ventas
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            8 herramientas poderosas integradas en una sola plataforma
          </p>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            const isLarge = index === 0 || index === 3;
            
            return (
              <div
                key={index}
                className={`card-glow p-6 rounded-2xl flex flex-col ${
                  isLarge ? 'lg:col-span-2 lg:row-span-1' : ''
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-base font-semibold text-foreground mb-3 leading-snug">
                  {value.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
