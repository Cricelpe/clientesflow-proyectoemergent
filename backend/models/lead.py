from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum

class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    CONVERTED = "converted"
    LOST = "lost"

class LeadBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    status: LeadStatus = LeadStatus.NEW
    metadata: Optional[Dict[str, Any]] = None

class LeadCreate(LeadBase):
    landing_page_id: str

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    status: Optional[LeadStatus] = None
    metadata: Optional[Dict[str, Any]] = None

class Lead(LeadBase):
    id: str
    landing_page_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
