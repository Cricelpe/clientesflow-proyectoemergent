import React from 'react';
import { Rocket } from 'lucide-react';

export default function Footer() {
  const links = {
    producto: [
      { name: 'Constructor', href: '#' },
      { name: 'Precios', href: '#' },
      { name: 'Casos de Uso', href: '#' },
      { name: 'Integraciones', href: '#' }
    ],
    recursos: [
      { name: 'Blog', href: '#' },
      { name: 'Guías', href: '#' },
      { name: 'Webinars', href: '#' },
      { name: 'Plantillas', href: '#' }
    ],
    soporte: [
      { name: 'Centro de Ayuda', href: '#' },
      { name: 'Contacto', href: '#' },
      { name: 'WhatsApp', href: '#' },
      { name: 'Estado del Sistema', href: '#' }
    ],
    legal: [
      { name: 'Términos de Servicio', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Cookies', href: '#' }
    ]
  };
  
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Rocket className="w-6 h-6 text-background" />
              </div>
              <span className="text-xl font-bold gradient-text">Clientesflow</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La plataforma todo en uno para generar landings con IA & gestionar tus ventas por WhatsApp de forma profesional.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Producto</h3>
            <ul className="space-y-3">
              {links.producto.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-3">
              {links.recursos.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Soporte</h3>
            <ul className="space-y-3">
              {links.soporte.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Clientesflow. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
