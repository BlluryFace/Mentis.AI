from typing import Dict

CRISIS_KEYWORDS = ["suicide", "kill myself", "kill", "end my life", 
                   "don't want to live", "about to die", "goodbye forever"]

WARNING_KEYWORDS = ["suicide", "kill myself", "kill", "end my life", "self-harm", "hurt myself"]

BAD_KEYWORDS = ["feeling down", "depressed", "sad", "hopeless", "worthless", "anxiety", "crying", "lonely"]

EMERGENCY_RESOURCES = {
    "suicide_prevention": "988",
    "crisis_text": "Text HOME to 741741",
    "hotline": "1-800-273-8255",
    "hotline_chat": "https://suicidepreventionlifeline.org/chat",
    "emergency": "911"
}

def detect_crisis(message: str) -> int: 
    message = message.lower() 

    # Level 3: Immediate intervention needed
    if any(keyword in message for keyword in CRISIS_KEYWORDS): 
        return 3
    # Level 2: Warning signs
    if any(keyword in message for keyword in WARNING_KEYWORDS): 
        return 2
    # Level 1: Emotional distress
    if any(keyword in message for keyword in BAD_KEYWORDS): 
        return 1
    # Level 0: No warning detected 
    return 0

def generate_response(level: int) -> Dict:
    responses = {
        3: {
            "message": """I'm very concerned about your safety right now. This is a serious situation:

            1. You're not alone
            2. Help is available 24/7
            3. Please reach out for immediate support

            Emergency contacts:
            • Crisis Hotline: 988
            • Crisis Text: Text HOME to 741741
            • Emergency: 911

            Would you be willing to contact one of these services right now?""",
                        "resources": EMERGENCY_RESOURCES,
                        "immediate": True
        },
        2: {
            "message": """I hear you're having some difficult thoughts. Please know:

            • You're not alone in this
            • Professional help is available 24/7
            • Would you like to talk about what's troubling you?

            I can provide crisis resources if you'd like.""",
                        "resources": EMERGENCY_RESOURCES,
                        "immediate": False
        },
        1: {
            "message": """I understand you're going through a tough time. Your feelings are valid.

            Would you like to:
            1. Talk more about what you're feeling?
            2. Learn some coping strategies?
            3. Get information about professional support?

            I'm here to listen and help however I can.""",
                        "resources": None,
                        "immediate": False
        }
    } 
    return responses.get(level, {})

def create_system_message() -> Dict: 
    return {
        "role": "system",
        "content": """You are an empathetic AI companion focused on emotional support. Follow these guidelines:
        - Show genuine care and validate feelings
        - Never provide medical advice or diagnosis
        - Use supportive, non-judgmental language
        - Encourage professional help when needed
        - Respond appropriately to crisis situations
        - Focus on listening and understanding
        - Share coping strategies when appropriate
        - Maintain appropriate boundaries"""
    }