import React from 'react';
import { AlertCircle, MessageSquareX, Users, TrendingDown } from 'lucide-react';

export default function PainSection() {
  const painPoints = [
    {
      icon: MessageSquareX,
      text: '¿Sientes que tus ventas se pierden en un mar de chats?'
    },
    {
      icon: Users,
      text: '¿Estás harto de explicar lo mismo a curiosos que no compran?'
    },
    {
      icon: TrendingDown,
      text: '¿Te frustra no saber cuánto dinero dejas sobre la mesa por falta de seguimiento?'
    }
  ];
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Opening */}
        <div className="mb-12">
          <p className="text-2xl text-foreground font-medium mb-8">Estimado emprendedor,</p>
        </div>
        
        {/* Pain points with checkmarks */}
        <div className="space-y-6 mb-12">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg text-foreground flex-1 pt-2">{point.text}</p>
              </div>
            );
          })}
        </div>
        
        {/* Body paragraph */}
        <div className="card-glow p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                El desorden te está costando dinero real
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Los clientes se van con la competencia si no respondes al instante, tu equipo no sabe a quién priorizar y cada día pierdes oportunidades de venta que nunca recuperarás.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
