# 📋 Endpoint /registro - Documentación

## 🎯 Descripción
Endpoint público para capturar leads desde la landing page de Clientesflow.

## 🔗 URL
```
POST /api/registro
```

## 📥 Request Body

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+34612345678",
  "mensaje": "Estoy interesado en la plataforma"
}
```

### Campos:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string | ✅ Sí | Nombre completo del lead |
| `email` | string (email) | ✅ Sí | Email válido |
| `telefono` | string | ✅ Sí | Número de teléfono |
| `mensaje` | string | ❌ No | Mensaje o comentario adicional |

## 📤 Response

### Success (201 Created)
```json
{
  "success": true,
  "message": "¡Registro exitoso! Te contactaremos pronto.",
  "lead_id": "e90cbe1d-f10b-4e51-abeb-13ab3139ae34"
}
```

### Error (400 Bad Request)
```json
{
  "detail": "Invalid email format"
}
```

### Error (500 Internal Server Error)
```json
{
  "detail": "Error al procesar el registro: [detalles del error]"
}
```

## 🔧 Ejemplo de Uso

### cURL
```bash
curl -X POST https://tu-dominio.com/api/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@empresa.com",
    "telefono": "+34666777888",
    "mensaje": "Quiero información sobre el plan Professional"
  }'
```

### JavaScript (Fetch)
```javascript
const registrarLead = async (data) => {
  try {
    const response = await fetch('/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('Lead registrado:', result.lead_id);
    } else {
      console.error('Error:', result.detail);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};

// Uso
registrarLead({
  nombre: 'Carlos López',
  email: 'carlos@empresa.com',
  telefono: '+34655443322',
  mensaje: 'Necesito más información'
});
```

### React Component (Ya implementado)
```jsx
import LeadRegistrationForm from './components/LeadRegistrationForm';

function App() {
  return (
    <LeadRegistrationForm 
      onSuccess={(data) => {
        console.log('Lead creado:', data.lead_id);
      }}
    />
  );
}
```

## 🗄️ Base de Datos

Los datos se guardan en la tabla `leads` de Supabase con la siguiente estructura:

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  mensaje TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🔐 Seguridad

- ✅ **Service Role Key**: El endpoint usa la Service Role Key para bypasear RLS
- ✅ **Público**: No requiere autenticación (diseñado para formularios públicos)
- ✅ **Validación**: Email es validado por Pydantic
- ✅ **CORS**: Configurado para aceptar requests del frontend

## 📊 Monitoreo

Para ver los leads registrados:

1. **Supabase Dashboard:**
   - Ve a Table Editor → leads
   - Filtra por `created_at` para ver los más recientes

2. **Logs del Backend:**
   ```bash
   sudo supervisorctl tail -f backend
   ```

3. **Query SQL:**
   ```sql
   SELECT * FROM leads 
   ORDER BY created_at DESC 
   LIMIT 10;
   ```

## 🧪 Testing

### Test básico
```bash
# En local
curl -X POST http://localhost:8001/api/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "telefono": "+34600000000",
    "mensaje": "Test message"
  }'
```

### Test con datos inválidos
```bash
# Email inválido
curl -X POST http://localhost:8001/api/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "email": "invalid-email",
    "telefono": "+34600000000"
  }'
# Debería retornar error 422
```

## 🚀 Integración en el Frontend

El formulario ya está implementado en:
- **Componente:** `/app/frontend/src/components/LeadRegistrationForm.jsx`
- **Hero alternativo:** `/app/frontend/src/components/HeroWithForm.jsx`

Para usarlo en App.js:
```jsx
import HeroWithForm from './components/HeroWithForm';

// Reemplaza <Hero /> por <HeroWithForm />
```

## ⚠️ Notas Importantes

1. **Service Role Key** debe mantenerse secreta (solo en .env del backend)
2. El endpoint es público, considera implementar rate limiting en producción
3. Los emails no son validados contra duplicados (pueden registrarse múltiples veces)
4. Para producción, considera añadir:
   - Captcha (reCAPTCHA, hCaptcha)
   - Rate limiting
   - Validación de teléfono con libphonenumber
   - Webhook para notificaciones (email, Slack, etc.)

## 📚 Documentación Adicional

- FastAPI Docs interactivos: http://localhost:8001/docs
- Supabase Dashboard: https://supabase.clientesflow.com
- Pydantic Validators: https://docs.pydantic.dev/
