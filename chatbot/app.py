from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI
from dotenv import load_dotenv 
from utils import detect_crisis, generate_response, create_system_message

load_dotenv() 

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Debug home page
@app.route("/")
def hello(): 
    return "<h1>HELLO</h1>" 

# Call OpenAI API to generate responses 
# Return JSON with ["message", "usage"]
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
            max_tokens=max_tokens,
            presence_penalty=0.6,
            frequency_penalty=0.5
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
    
@app.route("/model", methods=["GET"])
def get_model(): 
    return jsonify({ 
        "model": "gpt-4o-mini",
        "temperature": 0.7, # Median temperature
        "max_tokens": 100 # Limit max tokens for before offically deploying
    })

@app.errorhandler(400)
def not_found(e): 
    return jsonify({"error": "The requested resource was not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "An error occurred on the server"}), 500



if __name__ == "__main__": 
    PORT = int(os.getenv("PORT"))
    app.run(host="0.0.0.0", port=PORT, debug=True)