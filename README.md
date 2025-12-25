# ElevenLabs & Vertex AI: Voice-First Intelligence

A cutting-edge, voice-driven AI application that combines **ElevenLabs'** emotive voice technology with **Google Cloud Vertex AI's** deep reasoning capabilities.

[![Deploy to Google Cloud](https://deploy.cloud.google.com/networks/cloud-run/button.svg)](https://deploy.cloud.google.com/run/deploy?source=https://github.com/SoyuzAI/ElevenLabs-Challenge)

---

## 🚀 Live Demo
**Production URL:** [https://elevenlabs-vertex-voice-app-1042282049680.us-central1.run.app](https://elevenlabs-vertex-voice-app-1042282049680.us-central1.run.app)

---

## ✨ Features

*   🔒 **Secure Biometric Access:** Instant identity verification using face-scanning vector embeddings.
*   🧠 **Gemini 1.5 Power:** Deep reasoning and contextual understanding via Google Vertex AI.
*   🌐 **Search Grounding:** Real-time fact-checking and current events via Google Search integration.
*   🎙️ **Emotive Voice:** Low-latency, human-grade speech synthesis powered by ElevenLabs.
*   ☁️ **Cloud Native:** Fully containerized and deployed on Google Cloud Run for infinite scalability.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Backend** | FastAPI (Python), WebSockets, Uvicorn |
| **Voice AI** | ElevenLabs Conversational AI SDK |
| **LLM** | Google Gemini 1.5 Flash (Vertex AI) |
| **Infrastructure** | Google Cloud Run, Cloud Build, Artifact Registry |

---

## 💻 Local Development

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- Google Cloud SDK (`gcloud`)

### 2. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
GOOGLE_CLOUD_PROJECT=your-project-id
ELEVEN_LABS_API_KEY=your-api-key
ELEVEN_LABS_AGENT_ID=your-agent-id
```

### 3. Run the App
From the root directory, execute the PowerShell runner:
```powershell
.\run_local.ps1
```

---

## 📡 Deployment

This project is optimized for **Google Cloud**. To deploy your own instance, follow these steps:

1.  **Auth:** `gcloud auth login`
2.  **Config:** `gcloud config set project YOUR_PROJECT_ID`
3.  **Run Deploy Script:**
    ```powershell
    .\deploy.ps1
    ```
    *This script builds the Docker image and deploys it to Cloud Run automatically.*

---

## 📜 Documentation
- [Product Manual](C:\Users\Operations\.gemini\antigravity\brain\b4cbdd36-6445-490c-83ed-11cc57613031\product_manual.md)
- [Demo Script & Story](C:\Users\Operations\.gemini\antigravity\brain\b4cbdd36-6445-490c-83ed-11cc57613031\demo_story.md)
- [Deployment Guide](file:///f:/Experiment/ElevenLabs-Challenge/DEPLOY_GUIDE.md)

---

Developed with ❤️ using ElevenLabs and Google Cloud.
