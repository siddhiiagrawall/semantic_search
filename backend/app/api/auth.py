from fastapi import APIRouter, HTTPException
from app.schemas.auth import AuthRequest
from app.db.session import users_collection
from app.core.security import hash_password, verify_password, create_token
from app.core.config import JWT_SECRET

router = APIRouter(prefix="/auth")

@router.post("/register")
async def register(req: AuthRequest):
    if await users_collection.find_one({"email": req.email}):
        raise HTTPException(400, "User already exists")

    await users_collection.insert_one({
        "email": req.email,
        "password": hash_password(req.password)
    })

    return {"message": "Registered successfully"}

@router.post("/login")
async def login(req: AuthRequest):
    user = await users_collection.find_one({"email": req.email})

    if not user or not verify_password(req.password, user["password"]):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"email": req.email}, JWT_SECRET)
    return {"access_token": token}
