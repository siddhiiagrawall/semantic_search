import os
from dotenv import load_dotenv

load_dotenv()

EXA_API_KEY = os.getenv("EXA_API_KEY")
JWT_SECRET = os.getenv("JWT_SECRET")
MONGO_URL = os.getenv("MONGO_URL")
