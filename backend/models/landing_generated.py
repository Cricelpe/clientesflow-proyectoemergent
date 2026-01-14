from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class PainPoint(BaseModel):
    question: str
    agitation: str

class Benefit(BaseModel):
    title: str
    description: str
    icon: str

class FAQ(BaseModel):
    question: str
    answer: str

class GenerateLandingRequest(BaseModel):
    business_description: str

class LandingContent(BaseModel):
    headline: str
    subheadline: str
    social_proof: str
    cta_text: str
    cta_subtext: str
    pain_points: List[Dict[str, str]]
    benefits: List[Dict[str, str]]
    faq: List[Dict[str, str]]
    template_recommendation: str

class GenerateLandingResponse(BaseModel):
    success: bool
    landing_id: Optional[str] = None
    content: Optional[LandingContent] = None
    message: str

class GeneratedLanding(BaseModel):
    id: str
    business_description: str
    content: Dict[str, Any]
    template_used: str
    created_at: datetime
    
    class Config:
        from_attributes = True
