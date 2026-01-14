from fastapi import APIRouter, HTTPException, status
from models.landing_generated import (
    GenerateLandingRequest,
    GenerateLandingResponse,
    LandingContent,
    GeneratedLanding
)
from services.landing_generator import generate_landing_content
from config.supabase import get_supabase_client
from datetime import datetime
import logging
from typing import List

router = APIRouter(prefix="/api", tags=["landing-generator"])
logger = logging.getLogger(__name__)

@router.post("/generate-landing", response_model=GenerateLandingResponse)
async def generate_landing(request: GenerateLandingRequest):
    """
    Genera una landing page completa usando IA basándose en la descripción del negocio.
    
    El sistema analiza la descripción y crea:
    - Headline con Dream Outcome + Functional Benefit + Timeframe
    - Subheadline con Unique Mechanism
    - 3 Pain Points con framework PAS
    - 3 Benefits principales
    - 5 FAQs
    - Recomendación de plantilla
    """
    try:
        # Validar que la descripción no esté vacía
        if not request.business_description or len(request.business_description.strip()) < 20:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="La descripción del negocio debe tener al menos 20 caracteres"
            )
        
        # Generar contenido con IA
        logger.info(f"Generando landing para: {request.business_description[:50]}...")
        landing_data = generate_landing_content(request.business_description)
        
        # Guardar en Supabase
        supabase = get_supabase_client()
        
        db_data = {
            "business_description": request.business_description,
            "content": landing_data,
            "template_used": landing_data.get("template_recommendation", "v1"),
            "created_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("landings_generadas").insert(db_data).execute()
        
        if not response.data:
            logger.error("No se pudo guardar la landing en Supabase")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error al guardar la landing generada"
            )
        
        landing_id = response.data[0].get("id")
        logger.info(f"Landing guardada exitosamente: {landing_id}")
        
        return GenerateLandingResponse(
            success=True,
            landing_id=landing_id,
            content=LandingContent(**landing_data),
            message="Landing generada exitosamente"
        )
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Error de validación: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error generando landing: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al generar la landing: {str(e)}"
        )

@router.get("/generated-landings", response_model=List[GeneratedLanding])
async def get_generated_landings():
    """
    Obtiene todas las landings generadas
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table("landings_generadas").select("*").order("created_at", desc=True).execute()
        
        return response.data
        
    except Exception as e:
        logger.error(f"Error obteniendo landings: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener landings: {str(e)}"
        )

@router.get("/generated-landings/{landing_id}", response_model=GeneratedLanding)
async def get_generated_landing(landing_id: str):
    """
    Obtiene una landing generada específica
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table("landings_generadas").select("*").eq("id", landing_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Landing no encontrada"
            )
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error obteniendo landing: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener landing: {str(e)}"
        )
