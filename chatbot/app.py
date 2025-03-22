from flask import Flask, request, jsonify
import os
from openai import OpenAI
from dotenv import load_dotenv 

load_dotenv() 

app = Flask(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route("/")
def hello(): 
    return "<h1>HELLO</h1>" 

@app.route("/chat", methods=["POST"]) 
def chat(): 
    try: 
        data = request.json
        messages = data.get("messages", [])
        
        if not messages or not isinstance(messages, list): 
            return jsonify({"error": "Invalid or missing message"}), 400
        
        temperature = data.get("temperature", 0.7)
        max_tokens = data.get("max_tokens", 100)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages, 
            temperature=temperature, 
            max_tokens=max_tokens
        )

        return jsonify({
            "message": response.choices[0].message.content,
            "usage": { 
                "prompt_tokens" : response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens, 
                "total_tokens": response.usage.total_tokens
            }
        })
        
    except Exception as e: 
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__": 
    PORT = int(os.getenv("PORT"))
    app.run(host="0.0.0.0", port=PORT, debug=True)