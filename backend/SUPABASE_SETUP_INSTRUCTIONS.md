# ===============================================
# INSTRUCCIONES PARA CONFIGURAR SUPABASE
# ===============================================

## 📍 UBICACIÓN DEL ARCHIVO .ENV
El archivo donde debes colocar tus credenciales es:
/app/backend/.env

## 🔑 CREDENCIALES QUE NECESITAS AÑADIR

Añade estas líneas al archivo /app/backend/.env:

```env
# === Supabase Configuration ===
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-anonima-aqui
```

## 📝 CÓMO OBTENER TUS CREDENCIALES DE SUPABASE

1. Ve a tu proyecto en Supabase: https://app.supabase.com
2. En el panel izquierdo, haz clic en "Project Settings" (ícono de engranaje)
3. Haz clic en "API" en el menú
4. Encontrarás:
   - **Project URL** → Esta es tu SUPABASE_URL
   - **anon public key** → Esta es tu SUPABASE_ANON_KEY

## 🗄️ CONFIGURACIÓN DE LA BASE DE DATOS

### Paso 1: Ejecutar el Schema SQL
1. Ve a tu proyecto de Supabase
2. En el panel izquierdo, haz clic en "SQL Editor"
3. Crea una nueva query
4. Copia y pega el contenido completo del archivo:
   `/app/backend/database/supabase_schema.sql`
5. Haz clic en "Run" para ejecutar el script
6. Esto creará las tablas:
   - landing_pages
   - leads
   - Y sus políticas RLS (Row Level Security)

### Paso 2: Verificar las Tablas
1. Ve a "Table Editor" en el panel izquierdo
2. Deberías ver las tablas:
   - landing_pages
   - leads

## 🚀 CÓMO INICIAR EL SERVIDOR

Después de configurar el .env:

```bash
# Reiniciar el backend
sudo supervisorctl restart backend

# Verificar que esté corriendo
sudo supervisorctl status backend

# Ver logs si hay problemas
sudo supervisorctl tail -f backend
```

## 🧪 PROBAR LA INTEGRACIÓN

### Registrar un usuario:
```bash
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Usuario Test"
  }'
```

### Iniciar sesión:
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📊 ENDPOINTS DISPONIBLES

### Autenticación:
- POST `/api/auth/register` - Registrar nuevo usuario
- POST `/api/auth/login` - Iniciar sesión
- POST `/api/auth/logout` - Cerrar sesión
- GET `/api/auth/me` - Obtener usuario actual

### Landing Pages:
- POST `/api/landing-pages` - Crear landing page
- GET `/api/landing-pages` - Obtener todas las landing pages del usuario
- GET `/api/landing-pages/{id}` - Obtener una landing page específica
- PUT `/api/landing-pages/{id}` - Actualizar landing page
- DELETE `/api/landing-pages/{id}` - Eliminar landing page

### Leads:
- POST `/api/leads` - Crear lead (público, no requiere auth)
- GET `/api/leads/landing-page/{id}` - Obtener leads de una landing page
- GET `/api/leads/{id}` - Obtener un lead específico
- PUT `/api/leads/{id}` - Actualizar lead

## ⚠️ IMPORTANTE

1. **NO** compartas tus credenciales de Supabase públicamente
2. La SUPABASE_ANON_KEY es segura para usar en el frontend
3. Para operaciones sensibles, usa la service_role_key solo en el backend
4. Las políticas RLS protegen tus datos automáticamente

## 🔍 TROUBLESHOOTING

### Error: "Las variables SUPABASE_URL y SUPABASE_ANON_KEY deben estar configuradas"
- Verifica que has añadido las variables al archivo .env
- Reinicia el servidor backend

### Error: "relation 'landing_pages' does not exist"
- Ejecuta el archivo supabase_schema.sql en el SQL Editor de Supabase

### Error de autenticación:
- Verifica que tu SUPABASE_ANON_KEY sea correcta
- Verifica que la URL no tenga espacios al inicio o final

## 📚 DOCUMENTACIÓN ADICIONAL

- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Database: https://supabase.com/docs/guides/database
- FastAPI Docs: http://localhost:8001/docs (después de iniciar el servidor)
