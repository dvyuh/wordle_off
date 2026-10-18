import { useState } from "react";
import { COLORS } from "../styles/colors";

export default function Key({ label, onPress, wide, status }) {
  const [down, setDown] = useState(false);

  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        setDown(true);
        onPress(label);
      }}
      onPointerUp={() => setDown(false)}
      onPointerLeave={() => setDown(false)}
      onPointerCancel={() => setDown(false)}
      style={{
        flex: wide ? 1.6 : 1,
        minWidth: 0,
        padding: 2,
        background: "none",
        border: "none",
        touchAction: "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
        cursor: "pointer",
      }}
    >
      <div
        style={{
            
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS[status] || "white",
          color:"black",
          border: "2px solid black",
          borderRadius: 8,
          boxShadow: down ? "0 0 0 black" : "2px 2px 0 black",
          transform: down ? "translate(2px, 2px)" : "none",
          fontSize: wide ? 12 : 24,
          fontFamily: "'Bungee', sans-serif",
        }}
      >
        {label === "Backspace" ? "BACK" : label.toUpperCase()}
      </div>
    </button>
  );
}