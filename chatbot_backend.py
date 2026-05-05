from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
# CORS ayarı: Web siten başka bir domainde olsa bile buraya erişebilsin
CORS(app)

# Ollama yerel adresi
OLLAMA_URL = "http://localhost:11434/api/generate"

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])
        
        # Son mesajı al (Ollama generate API'si için basit bir prompt oluştur)
        last_message = messages[-1]['content'] if messages else ""
        
        # Sistem mesajı ve geçmişi birleştirerek prompt oluştur
        system_prompt = "Sen Efe Kırbaş'ın asistanısın. Efe hakkında bilgi veriyor ve ziyaretçilere yardımcı oluyorsun. Kibar ve yardımsever ol."
        full_prompt = f"{system_prompt}\n\nKullanıcı: {last_message}\nAsistan:"
        
        payload = {
            "model": "qwen3.5", # Bilgisayarında yüklü olan model
            "prompt": full_prompt,
            "stream": False,
            "options": {
                "temperature": 0.7
            }
        }
        
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        
        result = response.json()
        return jsonify({
            "content": result.get('response', '')
        })

    except Exception as e:
        print(f"Hata oluştu: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Chatbot Backend başlatılıyor... Port: 5001")
    app.run(host='0.0.0.0', port=5001)
