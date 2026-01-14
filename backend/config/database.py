from sqlalchemy import create_engine, Column, String, Text, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import json
import os

# Base de datos SQLite
DATABASE_URL = "sqlite:///./database.db"

# Crear engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos SQLite
class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    telefono = Column(String(50), nullable=False)
    mensaje = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class LandingGenerada(Base):
    __tablename__ = "landings_generadas"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    business_description = Column(Text, nullable=False)
    content = Column(Text, nullable=False)  # JSON stringificado
    template_used = Column(String(50), default='v1')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Crear todas las tablas
def init_db():
    Base.metadata.create_all(bind=engine)
    print("✓ Base de datos SQLite inicializada")

# Dependency para obtener session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
