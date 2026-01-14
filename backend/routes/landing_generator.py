from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from config.database import get_db, LandingGenerada as LandingModel
from models.landing_generated import (
    GenerateLandingRequest,
    GenerateLandingResponse,
    LandingContent
)
from services.landing_generator import generate_landing_content
from datetime import datetime
import logging
import json

router = APIRouter(prefix="/api", tags=["landing-generator"])
logger = logging.getLogger(__name__)

@router.post("/generate-landing", response_model=GenerateLandingResponse)
async def generate_landing(request: GenerateLandingRequest, db: Session = Depends(get_db)):
    """
    Genera una landing page completa usando IA y la guarda en SQLite.
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
        
        # Guardar en SQLite
        db_landing = LandingModel(
            business_description=request.business_description,
            content=json.dumps(landing_data),  # Guardar como JSON string
            template_used=landing_data.get("template_recommendation", "v1"),
            created_at=datetime.utcnow()
        )
        
        db.add(db_landing)
        db.commit()
        db.refresh(db_landing)
        
        logger.info(f"Landing guardada exitosamente: {db_landing.id}")
        
        return GenerateLandingResponse(
            success=True,
            landing_id=str(db_landing.id),
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
        db.rollback()
        logger.error(f"Error generando landing: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al generar la landing: {str(e)}"
        )

@router.get("/generated-landings")
async def get_generated_landings(db: Session = Depends(get_db)):
    """
    Obtiene todas las landings generadas
    """
    try:
        landings = db.query(LandingModel).order_by(LandingModel.created_at.desc()).all()
        
        return {
            "success": True,
            "count": len(landings),
            "landings": [
                {
                    "id": landing.id,
                    "business_description": landing.business_description,
                    "content": json.loads(landing.content),
                    "template_used": landing.template_used,
                    "created_at": landing.created_at.isoformat() if landing.created_at else None
                }
                for landing in landings
            ]
        }
        
    except Exception as e:
        logger.error(f"Error obteniendo landings: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener landings: {str(e)}"
        )

@router.get("/generated-landings/{landing_id}")
async def get_generated_landing(landing_id: int, db: Session = Depends(get_db)):
    """
    Obtiene una landing generada específica
    """
    try:
        landing = db.query(LandingModel).filter(LandingModel.id == landing_id).first()
        
        if not landing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Landing no encontrada"
            )
        
        return {
            "success": True,
            "landing": {
                "id": landing.id,
                "business_description": landing.business_description,
                "content": json.loads(landing.content),
                "template_used": landing.template_used,
                "created_at": landing.created_at.isoformat() if landing.created_at else None
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error obteniendo landing: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener landing: {str(e)}"
        )
