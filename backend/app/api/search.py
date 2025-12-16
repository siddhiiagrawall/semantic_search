from fastapi import APIRouter, Header, HTTPException
from app.schemas.search import SearchRequest
from app.services.exa_service import semantic_search
from app.db.session import history_collection
from app.core.security import decode_token
from app.core.config import JWT_SECRET

router = APIRouter(prefix="/search")

@router.post("/")
async def search(req: SearchRequest, authorization: str = Header(None)):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    results = semantic_search(req.query)

    # OPTIONAL: save history if token exists
    if authorization:
        token = authorization.replace("Bearer ", "")
        payload = decode_token(token, JWT_SECRET)
        await history_collection.insert_one({
            "email": payload["email"],
            "query": req.query
        })

    return results
