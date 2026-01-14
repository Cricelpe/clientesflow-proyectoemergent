import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Users, Mail, Phone, MessageSquare, Calendar, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function LeadsPanel() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, today: 0, week: 0 });

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`);
      const data = await response.json();

      if (response.ok && data.success) {
        setLeads(data.leads);
        
        // Calcular estadísticas
        const today = new Date().toDateString();
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        
        const todayCount = data.leads.filter(lead => 
          new Date(lead.created_at).toDateString() === today
        ).length;
        
        const weekCount = data.leads.filter(lead => 
          new Date(lead.created_at) >= weekAgo
        ).length;
        
        setStats({
          total: data.count,
          today: todayCount,
          week: weekCount
        });
        
        toast.success(`${data.count} leads cargados`);
      } else {
        toast.error('Error al cargar leads');
      }
    } catch (error) {
      toast.error('Error de conexión');
      console.error('Error fetching leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Panel de Leads
            </h1>
            <p className="text-muted-foreground">
              Gestiona todos los contactos capturados desde tus landings
            </p>
          </div>
          <Button
            onClick={fetchLeads}
            disabled={isLoading}
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Leads</p>
                  <p className="text-3xl font-bold gradient-text">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hoy</p>
                  <p className="text-3xl font-bold text-secondary">{stats.today}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Última Semana</p>
                  <p className="text-3xl font-bold text-accent">{stats.week}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Últimos Leads</CardTitle>
            <CardDescription>
              Contactos registrados ordenados por fecha
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Cargando leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No hay leads registrados aún</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all bg-background"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{lead.nombre}</p>
                          <p className="text-xs text-muted-foreground">ID: {lead.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm text-foreground">{lead.email}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm text-foreground">{lead.telefono}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{formatDate(lead.created_at)}</p>
                      </div>
                    </div>

                    {lead.mensaje && (
                      <div className="mt-3 pt-3 border-t border-border flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{lead.mensaje}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
