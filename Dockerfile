# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build   

# Stage 2: Backend & Serving
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies if needed
# RUN apt-get update && apt-get install -y ...

# Copy backend
COPY backend/ ./backend/
COPY backend/requirements.txt ./backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy built frontend static files to a reachable location
# FastAPI will need to be configured to serve these
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Expose port
ENV PORT=8080
EXPOSE 8080

# Run the application
# We need to adjust main.py to serve the static files from /app/frontend/dist
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
