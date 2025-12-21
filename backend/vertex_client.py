from vertexai.generative_models import GenerativeModel, Part, Tool
# GoogleSearchRetrieval is often in preview in some SDK versions
try:
    from vertexai.generative_models import GoogleSearchRetrieval
except ImportError:
    from vertexai.preview.generative_models import GoogleSearchRetrieval
    
import logging

class VertexClient:
    def __init__(self, project_id: str, location: str = "us-central1"):
        try:
            vertexai.init(project=project_id, location=location)
            
            # Enable Google Search Grounding
            search_tool = Tool.from_google_search_retrieval(
                google_search_retrieval=GoogleSearchRetrieval()
            )
            
            self.model = GenerativeModel(
                "gemini-1.5-flash-001",
                tools=[search_tool]
            )
            logging.info("Vertex AI Client initialized successfully with Search Grounding.")
        except Exception as e:
            logging.error(f"Failed to initialize Vertex AI: {e}")
            self.model = None

    async def generate_response(self, text: str) -> str:
        if not self.model:
            return "Vertex AI connection error."
        
        try:
            # Generate content
            # Depending on async support of the library, might need to run in executor
            # vertexai python SDK supports async for some methods, but simple 'generate_content' is sync usually?
            # Actually GenerativeModel.generate_content_async exists in newer versions.
            
            response = await self.model.generate_content_async(text)
            return response.text
        except Exception as e:
            logging.error(f"Error generating content: {e}")
            return "I'm having trouble thinking right now."
