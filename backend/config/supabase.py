import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Configuración de Supabase
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise ValueError(
        "Las variables SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY deben estar configuradas en el archivo .env"
    )

# Cliente de Supabase con Service Role Key (bypasea RLS)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def get_supabase_client() -> Client:
    """Retorna el cliente de Supabase configurado con Service Role Key"""
    return supabase
