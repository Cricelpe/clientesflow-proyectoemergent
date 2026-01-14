from fastapi import APIRouter, HTTPException, status, Depends, Header
from typing import List
from models.lead import LeadCreate, LeadUpdate, Lead
from config.supabase import get_supabase_client
from datetime import datetime

router = APIRouter(prefix="/api/leads", tags=["leads"])

async def get_current_user_id(authorization: str = Header(...)):
    """
    Extrae y valida el token de autorización
    """
    try:
        if not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token de autorización inválido"
            )
        
        token = authorization.replace("Bearer ", "")
        supabase = get_supabase_client()
        user = supabase.auth.get_user(token)
        
        if not user.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario no autenticado"
            )
        
        return user.user.id
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autorizado"
        )

@router.post("/", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(lead: LeadCreate):
    """
    Crea un nuevo lead (no requiere autenticación - para forms públicos)
    """
    try:
        supabase = get_supabase_client()
        
        data = {
            "landing_page_id": lead.landing_page_id,
            "email": lead.email,
            "name": lead.name,
            "phone": lead.phone,
            "status": lead.status,
            "metadata": lead.metadata,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("leads").insert(data).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se pudo crear el lead"
            )
        
        return response.data[0]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear lead: {str(e)}"
        )

@router.get("/landing-page/{landing_page_id}", response_model=List[Lead])
async def get_leads_by_landing_page(
    landing_page_id: str,
    user_id: str = Depends(get_current_user_id)
):
    """
    Obtiene todos los leads de una landing page
    """
    try:
        supabase = get_supabase_client()
        
        # Verificar que la landing page pertenece al usuario
        landing_page = supabase.table("landing_pages").select("*").eq("id", landing_page_id).eq("user_id", user_id).execute()
        
        if not landing_page.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Landing page no encontrada"
            )
        
        # Obtener leads
        response = supabase.table("leads").select("*").eq("landing_page_id", landing_page_id).execute()
        
        return response.data
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener leads: {str(e)}"
        )

@router.get("/{lead_id}", response_model=Lead)
async def get_lead(
    lead_id: str,
    user_id: str = Depends(get_current_user_id)
):
    """
    Obtiene un lead específico
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table("leads").select("*, landing_pages!inner(user_id)").eq("id", lead_id).execute()
        
        if not response.data or response.data[0]['landing_pages']['user_id'] != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead no encontrado"
            )
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener lead: {str(e)}"
        )

@router.put("/{lead_id}", response_model=Lead)
async def update_lead(
    lead_id: str,
    lead_update: LeadUpdate,
    user_id: str = Depends(get_current_user_id)
):
    """
    Actualiza un lead
    """
    try:
        supabase = get_supabase_client()
        
        # Verificar permisos
        existing = supabase.table("leads").select("*, landing_pages!inner(user_id)").eq("id", lead_id).execute()
        
        if not existing.data or existing.data[0]['landing_pages']['user_id'] != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lead no encontrado"
            )
        
        # Actualizar
        update_data = lead_update.model_dump(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase.table("leads").update(update_data).eq("id", lead_id).execute()
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar lead: {str(e)}"
        )
