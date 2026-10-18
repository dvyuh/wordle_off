import { COLORS } from "../styles/colors";

export default function Tile({ letter, status }) {
  const shape = {};

  return (
    <div
      style={{
        fontFamily: "'Bungee', sans-serif",
        boxSizing: "border-box",
        width: 56,
        height: 56,
        background: COLORS[status] || "white",
        color: status ===  "black",
        border: "3px solid black",
        borderRadius: 8,
        boxShadow: "4px 4px 0 black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        ...shape,
      }}
    >
      {letter}
    </div>
  );
}