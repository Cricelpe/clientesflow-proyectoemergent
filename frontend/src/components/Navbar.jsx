import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Rocket,
  Wand2,
  Target,
  BarChart3,
  BookOpen,
  Video,
  FileText,
  Users
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const funcionalidades = [
    {
      icon: Wand2,
      title: 'Generador de Landings con IA',
      description: 'Crea páginas profesionales en segundos'
    },
    {
      icon: Target,
      title: 'Calificación de Leads',
      description: 'Identifica clientes listos para comprar'
    },
    {
      icon: BarChart3,
      title: 'Dashboard de Métricas',
      description: 'Visualiza conversiones en tiempo real'
    },
    {
      icon: Users,
      title: 'Integración WhatsApp',
      description: 'Centraliza conversaciones de ventas'
    }
  ];

  const recursos = [
    {
      icon: BookOpen,
      title: 'Guías y Tutoriales',
      description: 'Aprende a maximizar resultados'
    },
    {
      icon: Video,
      title: 'Video Demos',
      description: 'Ve Clientesflow en acción'
    },
    {
      icon: FileText,
      title: 'Blog',
      description: 'Tips para aumentar ventas'
    }
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'w-[95%] max-w-7xl' 
          : 'w-[95%] max-w-7xl'
      }`}
    >
      <div
        className={`
          bg-black/80 backdrop-blur-xl border border-border/50
          rounded-full px-6 py-4
          transition-all duration-300
          ${isScrolled ? 'shadow-2xl shadow-primary/10' : 'shadow-lg'}
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform group-hover:scale-110">
              <Rocket className="w-6 h-6 text-background" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Clientesflow
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Funcionalidades Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground font-medium hover:text-primary transition-colors">
                Funcionalidades
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-80 bg-black/95 backdrop-blur-xl border-border/50 p-2"
                align="start"
              >
                {funcionalidades.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg cursor-pointer hover:bg-card focus:bg-card"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Precios */}
            <a
              href="#precios"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Precios
            </a>

            {/* Recursos Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground font-medium hover:text-primary transition-colors">
                Recursos
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-64 bg-black/95 backdrop-blur-xl border-border/50 p-2"
                align="start"
              >
                {recursos.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg cursor-pointer hover:bg-card focus:bg-card"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#login"
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              Iniciar sesión
            </a>
            <Button 
              className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-semibold rounded-full px-6 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
            >
              Unirme ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-full bg-black border-l border-border/50 backdrop-blur-xl"
            >
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-background" />
                  </div>
                  <span className="text-xl font-bold gradient-text">Clientesflow</span>
                </div>

                {/* Funcionalidades */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    FUNCIONALIDADES
                  </h3>
                  <div className="space-y-2">
                    {funcionalidades.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={index}
                          href="#"
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-card transition-colors"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Precios */}
                <a
                  href="#precios"
                  className="text-foreground font-semibold text-lg hover:text-primary transition-colors"
                >
                  Precios
                </a>

                {/* Recursos */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    RECURSOS
                  </h3>
                  <div className="space-y-2">
                    {recursos.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={index}
                          href="#"
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-card transition-colors"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                  <a
                    href="#login"
                    className="text-center text-foreground font-semibold text-lg hover:text-primary transition-colors"
                  >
                    Iniciar sesión
                  </a>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-semibold rounded-full py-6 text-lg transition-all hover:shadow-lg hover:shadow-primary/30"
                  >
                    Unirme ahora
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
