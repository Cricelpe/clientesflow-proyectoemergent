from fastapi import APIRouter, HTTPException, status
from models.lead_registro import LeadRegistro, LeadRegistroResponse
from config.supabase import get_supabase_client
from datetime import datetime
import logging

router = APIRouter(prefix="/api", tags=["registro"])
logger = logging.getLogger(__name__)

@router.post("/registro", response_model=LeadRegistroResponse, status_code=status.HTTP_201_CREATED)
async def registrar_lead(lead: LeadRegistro):
    """
    Endpoint público para registrar leads desde la landing page.
    
    Campos requeridos:
    - nombre: Nombre completo del lead
    - email: Email válido
    - telefono: Número de teléfono
    - mensaje: Mensaje opcional del lead
    
    Este endpoint usa Service Role Key para bypasear RLS.
    """
    try:
        supabase = get_supabase_client()
        
        # Preparar datos para inserción
        lead_data = {
            "nombre": lead.nombre,
            "email": lead.email,
            "telefono": lead.telefono,
            "mensaje": lead.mensaje,
            "created_at": datetime.utcnow().isoformat()
        }
        
        # Insertar en la tabla leads
        response = supabase.table("leads").insert(lead_data).execute()
        
        if not response.data:
            logger.error("No se pudo crear el lead en Supabase")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error al guardar los datos. Intenta nuevamente."
            )
        
        lead_id = response.data[0].get("id")
        logger.info(f"Lead creado exitosamente: {lead_id} - Email: {lead.email}")
        
        return LeadRegistroResponse(
            success=True,
            message="¡Registro exitoso! Te contactaremos pronto.",
            lead_id=lead_id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error al registrar lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al procesar el registro: {str(e)}"
        )
