from langchain_community.llms import Ollama

llm = Ollama(
    model="llama3.2:latest",
    base_url="http://host.docker.internal:11434"
)
