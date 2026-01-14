import os
import json
import openai
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

# Configurar OpenAI con Emergent LLM key
openai.api_key = os.environ.get('EMERGENT_LLM_KEY', 'sk-emergent-4C5786581FeFf0b8d2')

# Prompt Master basado en el PDF de reglas de copywriting
PROMPT_MASTER = """
Eres un experto en copywriting de Direct Response especializado en crear landing pages de alta conversión.

DEBES seguir estas reglas estrictamente del framework:

1. DREAM OUTCOME (Resultado Deseado):
   - El estado transformado, cambio de identidad o cambio de vida definitivo
   - Enfócate en libertad, estatus, control, reconocimiento, paz mental
   - Pinta la imagen de quién se convierte el cliente

2. FUNCTIONAL BENEFIT (Beneficio Funcional):
   - Resultado específico y medible dentro de un período concreto
   - Debe ser específico, medible y con marco temporal
   - Ejemplo: "en 24 horas", "en 3 semanas", "en 90 días"

3. UNIQUE MECHANISM (Mecanismo Único):
   - Lo que hace posible o creíble la oferta
   - Método propietario, tecnología o enfoque diferenciador
   - Prueba o razón para creer en la promesa

4. ESTRUCTURA DE HEADLINES:
   - Formato: [Dream Outcome] + [Functional Benefit] + [Timeframe] + [Unique Mechanism] + [Proof]
   - Máximo 15 palabras por frase
   - Sin guiones largos (—), usa ampersands (&), comas o "y"
   - Directo, audaz y centrado en beneficios

5. PAIN POINTS (Framework PAS - Problem, Agitate, Solve):
   - Problema: 3 puntos débiles como preguntas empáticas
   - Agita: Pinta imagen vívida de frustraciones
   - Soluciona: Presenta la solución clara

6. BENEFITS:
   - Identifica 3 proposiciones de valor únicas
   - Combina características con beneficios emocionales
   - Responde "¿Qué gano yo?"

7. CTA (Call to Action):
   - Orientado al valor, fácil de entender
   - Reduce el riesgo, ofrece incentivos
   - Enfoque en lo que gana el prospecto

8. FAQ:
   - 5-6 preguntas frecuentes
   - Respuestas claras que abordan objeciones
   - Construye credibilidad

REGLAS DE ESTILO:
- Frases cortas (máximo 15 palabras)
- Párrafos de máximo 2 frases
- Usar ampersands (&) en lugar de guiones largos
- Lenguaje conversacional y empático
- Específico y medible
"""

def generate_landing_content(business_description: str) -> Dict[str, Any]:
    """
    Genera el contenido completo de una landing page usando IA
    basándose en la descripción del negocio.
    """
    try:
        prompt = f"""{PROMPT_MASTER}

Ahora genera el contenido para esta landing page:

DESCRIPCIÓN DEL NEGOCIO:
{business_description}

Genera un JSON con esta estructura exacta:
{{
    "headline": "[Dream Outcome] + [Functional Benefit] en [Timeframe] usando [Unique Mechanism]",
    "subheadline": "Explicación clara del problema que resuelves y cómo lo haces de forma única (2-3 líneas máximo)",
    "social_proof": "Dato o estadística impactante que genera credibilidad",
    "cta_text": "Texto del botón CTA orientado al valor",
    "cta_subtext": "Texto que reduce fricción o FUD (Fear, Uncertainty, Doubt)",
    "pain_points": [
        {{
            "question": "¿[Pregunta empática sobre punto de dolor]?",
            "agitation": "Descripción de la frustración y consecuencias"
        }},
        {{
            "question": "¿[Segunda pregunta]?",
            "agitation": "Descripción de la frustración"
        }},
        {{
            "question": "¿[Tercera pregunta]?",
            "agitation": "Descripción de la frustración"
        }}
    ],
    "benefits": [
        {{
            "title": "Beneficio #1 (resultado específico)",
            "description": "Explicación de cómo funciona y qué valor aporta (1-2 líneas)",
            "icon": "wand"
        }},
        {{
            "title": "Beneficio #2",
            "description": "Explicación del valor",
            "icon": "target"
        }},
        {{
            "title": "Beneficio #3",
            "description": "Explicación del valor",
            "icon": "zap"
        }}
    ],
    "faq": [
        {{
            "question": "Pregunta frecuente #1",
            "answer": "Respuesta clara que aborda objeción"
        }},
        {{
            "question": "Pregunta frecuente #2",
            "answer": "Respuesta"
        }},
        {{
            "question": "Pregunta frecuente #3",
            "answer": "Respuesta"
        }},
        {{
            "question": "Pregunta frecuente #4",
            "answer": "Respuesta"
        }},
        {{
            "question": "Pregunta frecuente #5",
            "answer": "Respuesta"
        }}
    ],
    "template_recommendation": "v1"
}}

RESPONDE SOLO CON EL JSON, SIN TEXTO ADICIONAL.
"""
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Eres un experto en copywriting de Direct Response. Siempre respondes en formato JSON válido."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        content = response.choices[0].message.content.strip()
        
        # Limpiar markdown code blocks si existen
        if content.startswith('```json'):
            content = content[7:]
        if content.startswith('```'):
            content = content[3:]
        if content.endswith('```'):
            content = content[:-3]
        
        content = content.strip()
        
        # Parsear JSON
        landing_data = json.loads(content)
        
        logger.info(f"Landing content generado exitosamente para: {business_description[:50]}...")
        
        return landing_data
        
    except json.JSONDecodeError as e:
        logger.error(f"Error parseando JSON de IA: {str(e)}")
        logger.error(f"Contenido recibido: {content}")
        raise ValueError(f"La IA no generó un JSON válido: {str(e)}")
    except Exception as e:
        logger.error(f"Error generando contenido: {str(e)}")
        raise
