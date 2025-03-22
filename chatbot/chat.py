from openai import OpenAI 
from dotenv import load_dotenv 
import os 
import sys 
import json 

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def chat_with_ai(messages):
    try: 
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7, 
            max_tokens=100,
            presence_penalty=0.6,
            frequency_penalty=0.5
        )

        return {
            "message": response.choices[0].message.content,
            "usage": {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens, 
                "total_tokens": response.usage.total_tokens
            }
        }
    except Exception as e: 
        return {"error": str(e)}
    
if __name__ == "__main__": 
    input_data = sys.stdin.read() 
    try: 
        messages = json.loads(input_data) 
        result = chat_with_ai(messages)
        print(json.dumps(result))
    except json.JSONDecodeError: 
        print(json.dumps({"error": "Invalid JSON input"}))
    except Exception as e: 
        print(json.dumps({"error": str(e)}))