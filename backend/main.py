from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
messages = []


class MessageIn(BaseModel):
    email: EmailStr
    message: str


class MessageOut(BaseModel):
    email: EmailStr
    message: str


@app.post("/messages", response_model=MessageOut)
async def add_message(data: MessageIn):
    messages.append({"email": data.email, "message": data.message})
    return data


@app.get("/messages", response_model=List[MessageOut])
async def get_messages():
    return messages
