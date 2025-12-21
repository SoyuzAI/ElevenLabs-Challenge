import os
import json
import logging
from fastapi import FastAPI, WebSocket, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from vertex_client import VertexClient
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount frontend static files
# We mount "/" to index.html for SPA to work usually requires a catch-all
from fastapi.responses import FileResponse

# Serve static assets
app.mount("/assets", StaticFiles(directory="/app/frontend/dist/assets"), name="assets")

@app.get("/")
async def serve_index():
    return FileResponse("/app/frontend/dist/index.html")

# Initialize Vertex AI Client
# Ensure GOOGLE_APPLICATION_CREDENTIALS or gcloud auth is set up
project_id = os.getenv("GOOGLE_CLOUD_PROJECT")
vertex_client = VertexClient(project_id=project_id) if project_id else None

@app.on_event("startup")
async def startup_event():
    if not project_id:
        logging.warning("GOOGLE_CLOUD_PROJECT not set. Vertex AI features may fail.")
    else:
        logging.info(f"Initialized Vertex AI with project {project_id}")

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    message = data.get("message")
    if not message:
        raise HTTPException(status_code=400, detail="Message required")
    
    if not vertex_client:
        return {"response": "Vertex AI is not configured on the backend."}
        
    try:
        response_text = await vertex_client.generate_response(message)
        return {"response": response_text}
    except Exception as e:
        logging.error(f"Error calling Vertex AI: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Custom LLM WebSocket for ElevenLabs Agent (Combines Everything)
@app.websocket("/v1/chat-completions")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            # This follows the structure expected by ElevenLabs Custom LLM
            # Typically they send interaction history.
            # functionality: receive user text -> query Vertex -> stream back text
            
            # Simple simulation of handling content
            # Actual protocol details depend on specific ElevenLabs Custom LLM definitions
            # Assuming standard OpenAI-like or simple interaction
            
            # Log for debug
            print(f"Received from ElevenLabs: {payload}")
            
            # Extract user message (simplification)
            user_text = "Hello" # Placeholder extraction
            if "messages" in payload:
                user_text = payload["messages"][-1]["content"]

            if vertex_client:
                response = await vertex_client.generate_response(user_text)
            else:
                response = "I am not connected to my brain (Vertex AI) yet."

            # Send back
            response_payload = {
                "choices": [{
                    "delta": {
                        "content": response
                    }
                }]
            }
            await websocket.send_text(json.dumps(response_payload))
            
            # End turn
            await websocket.send_text(json.dumps({"choices": [{"finish_reason": "stop"}]}))
            
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

# Start command: uvicorn main:app --reload
