from fastapi import APIRouter, HTTPException, status
from models.user import UserCreate, UserLogin, UserResponse, User
from config.supabase import get_supabase_client
from supabase import AuthApiError

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """
    Registra un nuevo usuario en Supabase
    """
    try:
        supabase = get_supabase_client()
        
        # Registrar usuario con Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password,
            "options": {
                "data": {
                    "full_name": user_data.full_name
                }
            }
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No se pudo crear el usuario"
            )
        
        user = User(
            id=auth_response.user.id,
            email=auth_response.user.email,
            full_name=user_data.full_name,
            created_at=auth_response.user.created_at
        )
        
        return UserResponse(
            user=user,
            access_token=auth_response.session.access_token,
            refresh_token=auth_response.session.refresh_token
        )
        
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al registrar usuario: {str(e)}"
        )

@router.post("/login", response_model=UserResponse)
async def login(credentials: UserLogin):
    """
    Inicia sesión con email y contraseña
    """
    try:
        supabase = get_supabase_client()
        
        # Autenticar con Supabase
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })
        
        if not auth_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Credenciales inválidas"
            )
        
        user = User(
            id=auth_response.user.id,
            email=auth_response.user.email,
            full_name=auth_response.user.user_metadata.get('full_name'),
            created_at=auth_response.user.created_at
        )
        
        return UserResponse(
            user=user,
            access_token=auth_response.session.access_token,
            refresh_token=auth_response.session.refresh_token
        )
        
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al iniciar sesión: {str(e)}"
        )

@router.post("/logout")
async def logout():
    """
    Cierra la sesión del usuario
    """
    try:
        supabase = get_supabase_client()
        supabase.auth.sign_out()
        return {"message": "Sesión cerrada exitosamente"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al cerrar sesión: {str(e)}"
        )

@router.get("/me", response_model=User)
async def get_current_user(token: str):
    """
    Obtiene la información del usuario actual
    """
    try:
        supabase = get_supabase_client()
        
        # Verificar token y obtener usuario
        user_response = supabase.auth.get_user(token)
        
        if not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido o expirado"
            )
        
        user = User(
            id=user_response.user.id,
            email=user_response.user.email,
            full_name=user_response.user.user_metadata.get('full_name'),
            created_at=user_response.user.created_at
        )
        
        return user
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autorizado"
        )
