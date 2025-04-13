from openai import OpenAI
from dotenv import load_dotenv
import os
import sys
import json
import httpx

load_dotenv()

# Initialize OpenAI client with custom httpx client that doesn't use proxies
http_client = httpx.Client()
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    http_client=http_client
)

def analyze_sentiment(message): 
    """
    Analyze the sentiment and emotion in the user's message
    
    Args:
        message (str): User's message text
        
    Returns:
        dict: Detected sentiment and emotions
    """
    try: 
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an emotional analysis assistant. Analyze the sentiment and emotion in the following message. Provide a response in JSON format with keys: 'primary_emotion' (e.g., anxiety, sadness, happiness, anger, neutral), 'intensity' (low, medium, high), and 'sentiment' (negative, neutral, positive)."}, 
                {"role": "user", "content": message}
            ], 
            temperature=0.3,
            max_tokens=150,
            response_format={"type": "json_object"}
        )
        analysis = json.loads(response.choices[0].message.content)
        return analysis
    except Exception as e: 
        print(f"Error in sentiment analysis: {str(e)}", file=sys.stderr)
        return {
            "primary_emotion": "neutral",
            "intensity": "medium",
            "sentiment": "neutral"
        }
    
def generate_response(user_message, emotion_data, conversation_history): 
    """
    Generate a context-aware response based on user message and emotional analysis
    
    Args:
        user_message (str): User's message
        emotion_data (dict): Emotional analysis data
        conversation_history (list, optional): Previous conversation messages
        
    Returns:
        str: AI response
    """
    if conversation_history is None: 
        conversation_history = []
    
    emotion = emotion_data.get("primary_emotion", "neutral")
    intensity = emotion_data.get("intensity", "medium")
    sentiment = emotion_data.get("sentiment", "neutral")
    
    system_prompt = f"""You are an empathetic AI assistant that helps users with emotional support and coping strategies.
                    
                The user's message indicates {emotion} with {intensity} intensity and {sentiment} sentiment.

                Your response should:
                1. Acknowledge their emotions with empathy
                2. Adjust your tone to be appropriate for someone feeling {emotion}
                3. Offer relevant coping techniques such as breathing exercises, mindfulness practices, or guided affirmations
                4. Keep responses concise and supportive

                If the user is expressing significant distress, remind them that professional help is available and important."""
    
    # Prepare messages for API call 
    messages = [{"role": "system", "content": system_prompt}] 

    # Add conversation history if available 
    for msg in conversation_history: 
        messages.append(msg)
    
    # Add user message 
    messages.append({"role": "user", "content": user_message})

    try: 
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7, 
            max_tokens=200, 
            presence_penalty=0.6,
            frequency_penalty=0.5
        )
    
        return response.choices[0].message.content
    except Exception as e: 
        print(f"Error generating response: {str(e)}", file=sys.stderr)
        return "I'm having trouble processing that right now. How else can I support you?"


def chat_with_ai(request):
    """
    Args:
        request_data (dict): Request data containing user message and optional user ID
        
    Returns:
        dict: Response with AI reply and emotion analysis
    """
    try:
        user_message = request.get("message", "") 
        user_id = request.get("userId", "anonymous")
        conversation_history = request.get("conversationHistory", []) 

        emotion_data = analyze_sentiment(user_message)
        reply = generate_response(user_message, emotion_data, conversation_history)

        
        return {
            "reply": reply, 
            "emotion": emotion_data,
            "userId": user_id
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Read input from stdin
    input_data = sys.stdin.read()
    try:
        # Parse JSON input
        messages = json.loads(input_data)
        # Get response
        result = chat_with_ai(messages)
        # Print the result as JSON
        print(json.dumps(result))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
