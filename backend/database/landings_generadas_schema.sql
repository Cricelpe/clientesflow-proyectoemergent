-- EJECUTAR EN SUPABASE SQL EDITOR
-- Tabla para guardar las landings generadas por IA

CREATE TABLE IF NOT EXISTS landings_generadas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_description TEXT NOT NULL,
    content JSONB NOT NULL,
    template_used VARCHAR(50) DEFAULT 'v1',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_landings_created_at ON landings_generadas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_landings_template ON landings_generadas(template_used);

-- Trigger para updated_at
CREATE TRIGGER update_landings_generadas_updated_at
    BEFORE UPDATE ON landings_generadas
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- RLS (Row Level Security) - Deshabilitado para este caso ya que es admin
ALTER TABLE landings_generadas ENABLE ROW LEVEL SECURITY;

-- Política: Permitir todo al service_role
CREATE POLICY "Service role can manage all landings"
    ON landings_generadas
    FOR ALL
    USING (true)
    WITH CHECK (true);
