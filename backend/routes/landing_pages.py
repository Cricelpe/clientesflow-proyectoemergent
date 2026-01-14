from fastapi import APIRouter, HTTPException, status, Depends, Header
from typing import List, Optional
from models.landing_page import LandingPageCreate, LandingPageUpdate, LandingPage
from config.supabase import get_supabase_client
from datetime import datetime

router = APIRouter(prefix="/api/landing-pages", tags=["landing-pages"])

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

@router.post("/", response_model=LandingPage, status_code=status.HTTP_201_CREATED)
async def create_landing_page(
    landing_page: LandingPageCreate,
    user_id: str = Depends(get_current_user_id)
):
    """
    Crea una nueva landing page
    """
    try:
        supabase = get_supabase_client()
        
        data = {
            "user_id": user_id,
            "title": landing_page.title,
            "content": landing_page.content,
            "domain": landing_page.domain,
            "is_published": landing_page.is_published,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        response = supabase.table("landing_pages").insert(data).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se pudo crear la landing page"
            )
        
        return response.data[0]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear landing page: {str(e)}"
        )

@router.get("/", response_model=List[LandingPage])
async def get_landing_pages(user_id: str = Depends(get_current_user_id)):
    """
    Obtiene todas las landing pages del usuario
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table("landing_pages").select("*").eq("user_id", user_id).execute()
        
        return response.data
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener landing pages: {str(e)}"
        )

@router.get("/{landing_page_id}", response_model=LandingPage)
async def get_landing_page(
    landing_page_id: str,
    user_id: str = Depends(get_current_user_id)
):
    """
    Obtiene una landing page específica
    """
    try:
        supabase = get_supabase_client()
        
        response = supabase.table("landing_pages").select("*").eq("id", landing_page_id).eq("user_id", user_id).execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Landing page no encontrada"
            )
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener landing page: {str(e)}"
        )

@router.put("/{landing_page_id}", response_model=LandingPage)
async def update_landing_page(
    landing_page_id: str,
    landing_page_update: LandingPageUpdate,
    user_id: str = Depends(get_current_user_id)
):
    """
    Actualiza una landing page
    """
    try:
        supabase = get_supabase_client()
        
        # Verificar que la landing page pertenece al usuario
        existing = supabase.table("landing_pages").select("*").eq("id", landing_page_id).eq("user_id", user_id).execute()
        
        if not existing.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Landing page no encontrada"
            )
        
        # Actualizar
        update_data = landing_page_update.model_dump(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow().isoformat()
        
        response = supabase.table("landing_pages").update(update_data).eq("id", landing_page_id).execute()
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar landing page: {str(e)}"
        )

@router.delete("/{landing_page_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_landing_page(
    landing_page_id: str,
    user_id: str = Depends(get_current_user_id)
):
    """
    Elimina una landing page
    """
    try:
        supabase = get_supabase_client()
        
        # Verificar que la landing page pertenece al usuario
        existing = supabase.table("landing_pages").select("*").eq("id", landing_page_id).eq("user_id", user_id).execute()
        
        if not existing.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Landing page no encontrada"
            )
        
        supabase.table("landing_pages").delete().eq("id", landing_page_id).execute()
        
        return None
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al eliminar landing page: {str(e)}"
        )
