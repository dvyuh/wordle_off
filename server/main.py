from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from rooms import rooms, make_code

app = FastAPI()


@app.get("/")
def home():
    return {"status": "ok"}


@app.websocket("/ws")
async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    my_code = None

    try:
        while True:
            msg = await websocket.receive_json()

            if msg["type"] == "create":
                my_code = make_code()
                rooms[my_code] = {"players": [websocket]}
                await websocket.send_json({"type": "created", "code": my_code})

            elif msg["type"] == "join":
                code = msg["code"]
                if code not in rooms:
                    await websocket.send_json({"type": "error", "message": "ROOM NOT FOUND"})
                elif len(rooms[code]["players"]) >= 2:
                    await websocket.send_json({"type": "error", "message": "ROOM FULL"})
                else:
                    rooms[code]["players"].append(websocket)
                    my_code = code
                    await websocket.send_json({"type": "joined", "code": code})
                    host = rooms[code]["players"][0]
                    await host.send_json({"type": "player_joined"})

    except WebSocketDisconnect:
        if my_code in rooms:
            rooms[my_code]["players"].remove(websocket)
            if not rooms[my_code]["players"]:
                del rooms[my_code]