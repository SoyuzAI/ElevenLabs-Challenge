try:
    from vertexai.generative_models import GoogleSearchRetrieval
    print("Found in stable")
except ImportError:
    print("Not in stable")

try:
    from vertexai.preview.generative_models import GoogleSearchRetrieval
    print("Found in preview")
except ImportError:
    print("Not in preview")
