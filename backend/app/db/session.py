from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGO_URL

client = AsyncIOMotorClient(MONGO_URL)
db = client.semantic_search

users_collection = db.users
history_collection = db.history
