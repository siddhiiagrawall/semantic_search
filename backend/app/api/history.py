from fastapi import APIRouter, Header, HTTPException
from app.db.session import history_collection
from app.core.security import decode_token
from app.core.config import JWT_SECRET

router = APIRouter(prefix="/history")

@router.get("/")
async def history(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(401, "Missing token")

    token = authorization.replace("Bearer ", "")
    payload = decode_token(token, JWT_SECRET)

    cursor = history_collection.find({"email": payload["email"]})
    return [doc["query"] async for doc in cursor]
