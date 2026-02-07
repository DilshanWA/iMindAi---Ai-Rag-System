from langchain_core.messages import SystemMessage, HumanMessage,AIMessage
from chroma_db import vectorstore
from ollama import llm

SYSTEM_PROMPT = SystemMessage(
    content="""
You are i Mind, an intelligent document assistant.

Rules:
- If the question is related to the document, answer using context.
- If NOT related, answer normally like a general AI assistant.
- If unsure, say "I don't know".
- Keep answers short and clear.
"""
)

def ask_question(query: str):
    docs_with_scores = vectorstore.similarity_search_with_score(query, k=4)

    if not docs_with_scores:
        return normal_chat(query)
    
    context = "\n\n".join(doc.page_content for doc, _ in docs_with_scores)

    system = SystemMessage(
        content=SYSTEM_PROMPT.content + f"\n\nContext:\n{context}"
    )

    response = llm.invoke([
        system,
        HumanMessage(content=query)
    ])

    return response

chat_history = [SYSTEM_PROMPT]


def normal_chat(query: str):
    chat_history.append(HumanMessage(content=query))

    response = llm.invoke(chat_history)

    chat_history.append(AIMessage(content=response))

    return response
