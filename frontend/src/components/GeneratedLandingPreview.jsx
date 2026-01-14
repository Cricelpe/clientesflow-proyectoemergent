import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function GeneratedLandingPreview({ content }) {
  if (!content) {
    return (
      <div className="flex items-center justify-center h-96 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">La preview aparecerá aquí después de generar</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-12 py-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Social Proof Badge */}
          {content.social_proof && (
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card border border-border">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="text-sm text-muted-foreground">{content.social_proof}</span>
            </div>
          )}
          
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            {content.headline.split(' ').map((word, i) => {
              // Resaltar palabras clave con gradiente
              const keywords = ['recibe', 'leads', 'genera', 'aumenta', 'multiplica', 'transforma'];
              const isKeyword = keywords.some(kw => word.toLowerCase().includes(kw));
              
              return isKeyword ? (
                <span key={i} className="gradient-text">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              );
            })}
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            {content.subheadline}
          </p>
          
          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <button className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105">
              {content.cta_text}
            </button>
            {content.cta_subtext && (
              <p className="text-sm text-muted-foreground">
                {content.cta_subtext}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      {content.pain_points && content.pain_points.length > 0 && (
        <section className="py-20 px-12 bg-card/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold gradient-text mb-12 text-center">
              ¿Te suena familiar?
            </h2>
            
            <div className="space-y-6">
              {content.pain_points.map((pain, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-2">{pain.question}</p>
                    <p className="text-muted-foreground leading-relaxed">{pain.agitation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {content.benefits && content.benefits.length > 0 && (
        <section className="py-20 px-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold gradient-text mb-6 text-center">
              La solución que necesitas
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Todo lo que necesitas para transformar tu negocio
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="card-glow p-8 rounded-2xl flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">{
                      benefit.icon === 'wand' ? '✨' :
                      benefit.icon === 'target' ? '🎯' :
                      benefit.icon === 'zap' ? '⚡' : '🚀'
                    }</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form Section */}
      <section className="py-20 px-12 bg-card/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Déjanos tus datos y te contactaremos en menos de 24 horas
          </p>
          
          <div className="bg-background p-8 rounded-2xl border border-border space-y-4">
            <input 
              type="text" 
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
            />
            <input 
              type="email" 
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
            />
            <input 
              type="tel" 
              placeholder="Teléfono"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground"
            />
            <button className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-semibold px-8 py-4 rounded-lg text-lg transition-all">
              {content.cta_text || 'Comenzar Ahora'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
