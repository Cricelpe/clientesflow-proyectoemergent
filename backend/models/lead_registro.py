from pydantic import BaseModel, EmailStr
from typing import Optional

class LeadRegistro(BaseModel):
    """
    Modelo para el formulario de registro de leads
    desde la landing page
    """
    nombre: str
    email: EmailStr
    telefono: str
    mensaje: Optional[str] = None

class LeadRegistroResponse(BaseModel):
    """
    Respuesta después de crear un lead
    """
    success: bool
    message: str
    lead_id: Optional[str] = None
