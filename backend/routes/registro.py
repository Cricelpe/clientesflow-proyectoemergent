from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from config.database import get_db, Lead as LeadModel
from models.lead_registro import LeadRegistro, LeadRegistroResponse
from datetime import datetime
import logging

router = APIRouter(prefix="/api", tags=["registro"])
logger = logging.getLogger(__name__)

@router.post("/registro", response_model=LeadRegistroResponse, status_code=status.HTTP_201_CREATED)
async def registrar_lead(lead: LeadRegistro, db: Session = Depends(get_db)):
    """
    Endpoint público para registrar leads desde la landing page.
    Ahora usa SQLite local.
    """
    try:
        # Crear lead en SQLite
        db_lead = LeadModel(
            nombre=lead.nombre,
            email=lead.email,
            telefono=lead.telefono,
            mensaje=lead.mensaje,
            created_at=datetime.utcnow()
        )
        
        db.add(db_lead)
        db.commit()
        db.refresh(db_lead)
        
        logger.info(f"Lead creado exitosamente: {db_lead.id} - Email: {lead.email}")
        
        return LeadRegistroResponse(
            success=True,
            message="¡Registro exitoso! Te contactaremos pronto.",
            lead_id=str(db_lead.id)
        )
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error al registrar lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al procesar el registro: {str(e)}"
        )

@router.get("/leads")
async def get_all_leads(db: Session = Depends(get_db)):
    """
    Obtiene todos los leads registrados (para el panel admin)
    """
    try:
        leads = db.query(LeadModel).order_by(LeadModel.created_at.desc()).all()
        
        return {
            "success": True,
            "count": len(leads),
            "leads": [
                {
                    "id": lead.id,
                    "nombre": lead.nombre,
                    "email": lead.email,
                    "telefono": lead.telefono,
                    "mensaje": lead.mensaje,
                    "created_at": lead.created_at.isoformat() if lead.created_at else None
                }
                for lead in leads
            ]
        }
        
    except Exception as e:
        logger.error(f"Error obteniendo leads: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener leads: {str(e)}"
        )
