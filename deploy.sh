# Deploy to Cloud Run
# Assumes gcloud is authenticated and project is set

# Variables
SERVICE_NAME="elevenlabs-vertex-voice-app"
REGION="us-central1"

echo "Building and deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLOUD_PROJECT=$GOOGLE_CLOUD_PROJECT

echo "Deployment complete!"
