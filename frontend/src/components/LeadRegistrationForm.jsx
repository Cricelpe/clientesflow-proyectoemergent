import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

export default function LeadRegistrationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message);
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: ''
        });

        // Callback opcional para el padre
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        toast.error(data.detail || 'Error al enviar el formulario');
      }
    } catch (error) {
      toast.error('Error de conexión. Intenta nuevamente.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=\"space-y-4 w-full max-w-md\">
      {/* Nombre */}
      <div className=\"relative\">
        <User className=\"absolute left-3 top-3 h-5 w-5 text-muted-foreground\" />
        <Input
          type=\"text\"
          name=\"nombre\"
          placeholder=\"Tu nombre completo\"
          value={formData.nombre}
          onChange={handleChange}
          required
          className=\"pl-10 bg-card border-border text-foreground\"
        />
      </div>

      {/* Email */}
      <div className=\"relative\">
        <Mail className=\"absolute left-3 top-3 h-5 w-5 text-muted-foreground\" />
        <Input
          type=\"email\"
          name=\"email\"
          placeholder=\"tu@email.com\"
          value={formData.email}
          onChange={handleChange}
          required
          className=\"pl-10 bg-card border-border text-foreground\"
        />
      </div>

      {/* Teléfono */}
      <div className=\"relative\">
        <Phone className=\"absolute left-3 top-3 h-5 w-5 text-muted-foreground\" />
        <Input
          type=\"tel\"
          name=\"telefono\"
          placeholder=\"+34 612 345 678\"
          value={formData.telefono}
          onChange={handleChange}
          required
          className=\"pl-10 bg-card border-border text-foreground\"
        />
      </div>

      {/* Mensaje */}
      <div className=\"relative\">
        <MessageSquare className=\"absolute left-3 top-3 h-5 w-5 text-muted-foreground\" />
        <Textarea
          name=\"mensaje\"
          placeholder=\"Cuéntanos sobre tu negocio (opcional)\"
          value={formData.mensaje}
          onChange={handleChange}
          rows={3}
          className=\"pl-10 pt-3 bg-card border-border text-foreground resize-none\"
        />
      </div>

      {/* Submit Button */}
      <Button
        type=\"submit\"
        disabled={isLoading}
        className=\"w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-semibold py-6 text-lg transition-all hover:scale-105\"
      >
        {isLoading ? (
          <span>Enviando...</span>
        ) : (
          <>
            <Send className=\"w-5 h-5 mr-2\" />
            Quiero mi Landing Gratis
          </>
        )}
      </Button>

      <p className=\"text-xs text-center text-muted-foreground\">
        Al registrarte aceptas recibir información sobre Clientesflow
      </p>
    </form>
  );
}
