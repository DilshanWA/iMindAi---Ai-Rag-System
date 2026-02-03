from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.llms import Ollama
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

app = FastAPI(title="DocMind Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


llm = Ollama(
    model="llama3.2",
    base_url="http://host.docker.internal:11434"
)

SYSTEM_PROMPT = SystemMessage(
    content="""
You are i Mind, an intelligent document assistant.
if user asks who are you, you must answer "I am i Mind, your intelligent document assistant."
and if user ask who is developer of you, you must answer "I am developed by IFASS."
if user ask what is mean of DocMind, you must answer "DocMind is an AI-powered document assistant that helps you manage and understand your documents efficiently."
, if user ask what is mean IFASS, you must answer "IFASS stands for Intelligent Future Analytics & Software Solutions"

You must:
- Provide concise and accurate answers based on the provided context.
- If the context does not contain the answer, respond with "I don't know" or "
I am not sure about that."
- Use the context to inform your answers.
- if answer include number them as row lists for better readability.
- Always maintain a professional and helpful tone.
- Always give short and precise answers
"""
)


# Simple in-memory history
chat_history = [SYSTEM_PROMPT]

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    chat_history.append(HumanMessage(content=request.message))

    response = llm.invoke(chat_history)

    chat_history.append(AIMessage(content=response))

    return {"response": response}
