from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from chroma_db import add_document
from rag import ask_question

app = FastAPI(title="DocMind Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    if not file.filename.endswith(".txt"):
        raise HTTPException(400, "Only .txt files allowed")

    text = (await file.read()).decode("utf-8")
    add_document(text)

    return {"response": "Allright ! I Read your document and added it to my knowledge base. You can now ask me questions related to it."}

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    answer = ask_question(req.message)
    return {"response": str(answer)}
