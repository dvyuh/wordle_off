import { useState } from "react";
import Button from "../components/Button";

export default function OneVsOne({ onBack }) {
  const [code, setCode] = useState("");

  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
        <Button onClick={() => console.log("create room")}>CREATE ROOM</Button>

        <div style={{ fontSize: 32, textAlign: "center" }}>OR</div>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
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
            borderRadius: 8,
          }}
        />

        <Button
          disabled={code.length < 6}
          onClick={() => console.log("join", code)}
        >
          ENTER ROOM
        </Button>
        <Button onClick={onBack}>BACK</Button>
      </div>
    </div>
  );
}