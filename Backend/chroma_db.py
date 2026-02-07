from langchain_chroma import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

vectorstore = Chroma(
    collection_name="docmind_collection",
    embedding_function=embedding,
    persist_directory="./chroma"
)

def add_document(text: str):
    chunks = splitter.split_text(text)
    vectorstore.add_texts(chunks)
