import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Gracias a la IA de Clientesflow, mi negocio dental ahora recibe 20 leads calificados al día. El botón de WhatsApp es magia pura.",
    by: "Dr. Arrieta, Clínica Odontológica",
    imgSrc: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 1,
    testimonial: "Ya no pierdo tiempo con curiosos. El sistema filtra a los clientes y me llegan listos para comprar.",
    by: "Martha, Real Estate",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 2,
    testimonial: "Tener hosting, dominio y landing en un solo pago me ahorró semanas de trabajo técnico.",
    by: "Javier, Consultor de Ventas",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 3,
    testimonial: "En dos meses pasé de 5 ventas mensuales a 30. El CRM me ayuda a no perder ningún cliente potencial.",
    by: "Carolina, Diseñadora de Interiores",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 4,
    testimonial: "La calificación automática de leads me ahorra 10 horas semanales. Ahora solo hablo con quien realmente quiere comprar.",
    by: "Roberto, Coach Empresarial",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 5,
    testimonial: "Mis clientes dicen que mi landing es la más profesional que han visto. Y yo no sé nada de diseño web.",
    by: "Elena, Nutricionista",
    imgSrc: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 6,
    testimonial: "La integración con WhatsApp Business fue instantánea. En 5 minutos ya estaba recibiendo leads en mi CRM.",
    by: "Miguel, Agencia de Marketing",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 7,
    testimonial: "El dashboard me muestra exactamente qué anuncios funcionan y cuáles no. Invertir en publicidad ahora tiene sentido.",
    by: "Andrea, E-commerce de Moda",
    imgSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 8,
    testimonial: "Recuperé la inversión en el primer mes. Los leads que entran por mi landing convierten 3 veces más.",
    by: "Fernando, Asesor Financiero",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 9,
    testimonial: "Ya no necesito contratar un programador cada vez que quiero cambiar algo en mi landing. Lo hago yo en minutos.",
    by: "Patricia, Escuela de Idiomas",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-gradient-to-br from-primary via-accent to-secondary text-background border-primary shadow-2xl shadow-primary/30" 
          : "z-0 bg-[#121212] text-foreground border-[#2a2a2a] hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          backgroundColor: isCenter ? 'rgba(0,0,0,0.2)' : 'hsl(var(--border))'
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-14 rounded-full object-cover border-2"
        style={{
          borderColor: isCenter ? 'rgba(0,0,0,0.2)' : 'hsl(var(--border))',
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium mb-4",
        isCenter ? "text-background" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-background/90" : "text-muted-foreground"
      )}>
        {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-background"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all",
            "bg-card border-2 border-border hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-background hover:border-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-label="Testimonio anterior"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all",
            "bg-card border-2 border-border hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-background hover:border-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          )}
          aria-label="Siguiente testimonio"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
