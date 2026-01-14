-- EJECUTAR ESTOS COMANDOS EN EL SQL EDITOR DE SUPABASE
-- https://app.supabase.com/project/YOUR_PROJECT/sql/new

-- Tabla de landing pages
CREATE TABLE IF NOT EXISTS landing_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content JSONB DEFAULT '{}'::jsonb,
    domain VARCHAR(255),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para landing_pages
CREATE INDEX IF NOT EXISTS idx_landing_pages_user_id ON landing_pages(user_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_domain ON landing_pages(domain);

-- Tabla de leads
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para leads
CREATE INDEX IF NOT EXISTS idx_leads_landing_page_id ON leads(landing_page_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Row Level Security (RLS) para landing_pages
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias landing pages
CREATE POLICY "Users can view their own landing pages"
    ON landing_pages FOR SELECT
    USING (auth.uid() = user_id);

-- Política: Los usuarios pueden insertar sus propias landing pages
CREATE POLICY "Users can insert their own landing pages"
    ON landing_pages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propias landing pages
CREATE POLICY "Users can update their own landing pages"
    ON landing_pages FOR UPDATE
    USING (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propias landing pages
CREATE POLICY "Users can delete their own landing pages"
    ON landing_pages FOR DELETE
    USING (auth.uid() = user_id);

-- Row Level Security (RLS) para leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver leads de sus landing pages
CREATE POLICY "Users can view leads from their landing pages"
    ON leads FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM landing_pages
            WHERE landing_pages.id = leads.landing_page_id
            AND landing_pages.user_id = auth.uid()
        )
    );

-- Política: Cualquiera puede insertar leads (para formularios públicos)
CREATE POLICY "Anyone can insert leads"
    ON leads FOR INSERT
    WITH CHECK (true);

-- Política: Los usuarios pueden actualizar leads de sus landing pages
CREATE POLICY "Users can update leads from their landing pages"
    ON leads FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM landing_pages
            WHERE landing_pages.id = leads.landing_page_id
            AND landing_pages.user_id = auth.uid()
        )
    );

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_landing_pages_updated_at
    BEFORE UPDATE ON landing_pages
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
