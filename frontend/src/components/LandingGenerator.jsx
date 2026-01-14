import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { toast } from 'sonner';
import { Wand2, Loader2, Eye, Save } from 'lucide-react';
import GeneratedLandingPreview from './GeneratedLandingPreview';

export default function LandingGenerator() {
  const [businessDescription, setBusinessDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [landingId, setLandingId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!businessDescription || businessDescription.trim().length < 20) {
      toast.error('Por favor describe tu negocio con al menos 20 caracteres');
      return;
    }

    setIsGenerating(true);
    setShowPreview(false);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate-landing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_description: businessDescription
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setGeneratedContent(data.content);
        setLandingId(data.landing_id);
        setShowPreview(true);
        toast.success('Landing generada exitosamente!');
      } else {
        toast.error(data.detail || 'Error al generar la landing');
      }
    } catch (error) {
      toast.error('Error de conexión. Intenta nuevamente.');
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exampleDescriptions = [
    "Agencia de marketing digital especializada en redes sociales para pequeñas empresas. Ayudamos a restaurantes y tiendas locales a conseguir más clientes mediante campañas de Instagram y Facebook.",
    "Plataforma SaaS de gestión de inventario para e-commerce. Sincronizamos automáticamente el stock entre Shopify, Amazon y Mercado Libre en tiempo real.",
    "Clínica dental especializada en ortodoncia invisible. Ofrecemos tratamientos con alineadores transparentes con resultados garantizados en 12 meses."
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">
            Generador Inteligente de Landings
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Describe tu negocio y la IA creará una landing page profesional con copywriting de alta conversión
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Describe tu negocio</CardTitle>
                <CardDescription>
                  Cuéntanos qué haces, para quién y qué problema resuelves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ejemplo: Somos una agencia de marketing digital que ayuda a pequeñas empresas a conseguir clientes mediante campañas de Facebook e Instagram. Nuestro método propietario garantiza resultados en 30 días o devolvemos tu dinero..."
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  rows={12}
                  className="resize-none bg-background border-border text-foreground"
                />
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{businessDescription.length} caracteres</span>
                  <span className={businessDescription.length >= 20 ? 'text-secondary' : 'text-muted-foreground'}>
                    Mínimo 20 caracteres
                  </span>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || businessDescription.length < 20}
                  className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-background font-semibold py-6 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generando con IA...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generar Landing Page
                    </>
                  )}
                </Button>

                {generatedContent && landingId && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowPreview(!showPreview)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showPreview ? 'Ocultar' : 'Ver'} Preview
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Examples */}
            <Card className="mt-4 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Ejemplos de descripciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {exampleDescriptions.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setBusinessDescription(example)}
                    className="w-full text-left p-3 rounded-lg bg-background hover:bg-muted/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {example.substring(0, 80)}...
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div>
            <Card className="bg-card border-border sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl">Preview</CardTitle>
                <CardDescription>
                  Vista previa de tu landing generada
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showPreview && generatedContent ? (
                  <div className="border border-border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto">
                    <div className="scale-50 origin-top-left w-[200%]">
                      <GeneratedLandingPreview content={generatedContent} />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 bg-background rounded-lg border border-dashed border-border">
                    <Wand2 className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      {isGenerating
                        ? 'Generando tu landing con IA...'
                        : 'La preview aparecerá aquí'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
