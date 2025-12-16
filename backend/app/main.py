from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, search, history

app = FastAPI(title="AI Semantic Search")

# ✅ ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(search.router)
app.include_router(history.router)
