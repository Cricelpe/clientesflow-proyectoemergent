from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class LandingPageBase(BaseModel):
    title: str
    content: Optional[Dict[str, Any]] = None
    domain: Optional[str] = None
    is_published: bool = False

class LandingPageCreate(LandingPageBase):
    user_id: str

class LandingPageUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    domain: Optional[str] = None
    is_published: Optional[bool] = None

class LandingPage(LandingPageBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
