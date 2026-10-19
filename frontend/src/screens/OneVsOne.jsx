import { useState } from "react";
import Button from "../components/Button";
import useSocket from "../hooks/useSocket";

export default function OneVsOne({ onBack }) {
  const [stage, setStage] = useState("menu"); // "menu" or "lobby"
  const [input, setInput] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [opponentHere, setOpponentHere] = useState(false);
  const [error, setError] = useState("");

  const send = useSocket((msg) => {
      console.log("server said:", msg);
    if (msg.type === "created") {
      setRoomCode(msg.code);
      setStage("lobby");
    } else if (msg.type === "joined") {
      setRoomCode(msg.code);
      setOpponentHere(true);
      setStage("lobby");
    } else if (msg.type === "player_joined") {
      setOpponentHere(true);
    } else if (msg.type === "error") {
      setError(msg.message);
    }
  });

  const wrapper = {
    minHeight: "100dvh",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const column = {
    width: "100%",
    maxWidth: 320,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    textAlign: "center",
  };

  if (stage === "lobby") {
    return (
      <div style={wrapper}>
        <div style={column}>
          <div style={{ fontSize: 20 }}>ROOM CODE</div>
          <div style={{ fontSize: 48, fontFamily: "'Bungee', sans-serif" }}>
            {roomCode}
          </div>
          <div style={{ fontSize: 24 }}>
            {opponentHere ? "OPPONENT JOINED!" : "WAITING FOR OPPONENT..."}
          </div>
          <Button onClick={onBack}>LEAVE</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={wrapper}>
      <div style={column}>
        <Button onClick={() => send({ type: "create" })}>CREATE ROOM</Button>

        <div style={{ fontSize: 32 }}>OR</div>

        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value.toUpperCase());
            setError("");
          }}
          maxLength={6}
          placeholder="ROOM CODE"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "16px 0",
            fontSize: 24,
            fontFamily: "'Bungee', sans-serif",
            textAlign: "center",
            background: "white",
            border: "3px solid black",
            borderRadius: 8,
            boxShadow: "4px 4px 0 black",
          }}
        />

        {error && <div style={{ color: "#B00020", fontSize: 18 }}>{error}</div>}

        <Button
          disabled={input.length < 6}
          onClick={() =>  {console.log("join clicked", input); send({ type: "join", code: input })}}
        >
          ENTER ROOM CODE
        </Button>

        <Button onClick={onBack}>BACK</Button>
      </div>
    </div>
  );
}