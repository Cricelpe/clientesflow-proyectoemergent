import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export default function FAQ() {
  const faqs = [
    {
      question: '¿Necesito conocimientos técnicos para usar Clientesflow?',
      answer: 'No, está diseñado para emprendedores sin experiencia técnica. La IA crea tu landing automáticamente y nuestro equipo te guía en el setup inicial por WhatsApp.'
    },
    {
      question: '¿Cuánto tiempo toma ver los primeros resultados?',
      answer: 'Tu landing estará lista en 24 horas. Los primeros leads pueden llegar el mismo día que actives tus campañas publicitarias, dependiendo de tu inversión y estrategia.'
    },
    {
      question: '¿Puedo integrar mi número actual de WhatsApp Business?',
      answer: 'Sí, conectamos tu WhatsApp Business existente sin cambiar tu número. La integración toma menos de 5 minutos y mantiene todo tu historial de conversaciones.'
    },
    {
      question: '¿Qué incluye el hosting, SSL y dominio gratis?',
      answer: 'Tu landing queda alojada en servidores seguros con certificado SSL profesional. Puedes usar un dominio personalizado sin costo adicional el primer año.'
    },
    {
      question: '¿Cómo funciona la calificación automática de leads?',
      answer: 'El sistema analiza comportamiento en la landing, respuestas en WhatsApp y datos demográficos para asignar puntajes. Recibes alertas de leads calientes listos para cerrar.'
    },
    {
      question: '¿Puedo cancelar mi suscripción en cualquier momento?',
      answer: 'Sí, cancelas cuando quieras sin penalización. Tus datos quedan exportables durante 30 días después de cancelar, cumpliendo con protección de información personal.'
    },
    {
      question: '¿Ofrecen soporte en español para problemas técnicos?',
      answer: 'Soporte en español disponible por chat, email y WhatsApp de lunes a viernes de 9 AM a 6 PM. Respuestas promedio en menos de 2 horas.'
    },
    {
      question: '¿Mis datos de clientes están seguros y protegidos?',
      answer: 'Usamos encriptación de grado bancario, servidores certificados y respaldos diarios automáticos. Cumplimos con regulaciones de privacidad internacionales.'
    }
  ];
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Todo lo que necesitas saber sobre Clientesflow
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="card-glow px-6 rounded-xl border-border data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="gradient-text font-semibold text-lg pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
