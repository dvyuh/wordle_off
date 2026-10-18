import Key from "./key";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export default function Keyboard({ onPress, statuses }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
      {ROWS.map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((k) => (
            <Key
              key={k}
              label={k}
              onPress={onPress}
              status = {statuses[k.toUpperCase()]}
              wide={k === "Enter" || k === "Backspace"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}