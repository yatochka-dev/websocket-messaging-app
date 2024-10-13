from typing import List, Tuple
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database for messages
database: List[Tuple[str, str]] = [
]


# Model for the message
class Message(BaseModel):
    name: str
    message: str


class SocketResponse(BaseModel):
    type: str
    new_message: Message | None


# To keep track of connected WebSocket clients
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)


manager = ConnectionManager()


# Function to get messages
def get_all_messages() -> List[Tuple[str, str]]:
    return database


# Function to add a message and notify WebSocket clients
async def add_message(name: str, message: str):
    database.append((name, message))
    # Notify all connected clients of the new message
    await manager.send_message(SocketResponse(type="new_message", new_message=Message(name=name, message=message)).dict())


# Basic GET route
@app.get("/")
async def root():
    return {"message": "Hello World"}


# Endpoint to send a message via POST request (using JSON)
@app.post("/send")
async def send_message(message: Message):
    await add_message(message.name, message.message)
    return {"message": "Message sent successfully"}


# Endpoint to retrieve all messages (in JSON format)
@app.get("/messages")
async def get_messages():
    return {"messages": [{"name": name, "message": msg} for name, msg in get_all_messages()]}


@app.post("/clear-messages")
async def clear_messages():
    database.clear()
    await manager.send_message(SocketResponse(type="clear_messages", new_message=None).dict())
    return {"message": "Messages cleared successfully"}


# WebSocket endpoint to handle real-time communication (using JSON)
@app.websocket("/messages/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            if data.get("action") == "close":
                break
            # Echo back the received JSON message
            # await websocket.send_json({"message": "Message received", "data": data})
    except WebSocketDisconnect:
        manager.disconnect(websocket)
