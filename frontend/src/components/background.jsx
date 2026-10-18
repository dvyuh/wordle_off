const LETTERS = "WORDLEEVERYTHING";

const TILES = Array.from({ length: 14 }, (_, i) => ({
  letter: LETTERS[i % LETTERS.length],
  left: (i * 73) % 100,
  size: 48 + ((i * 11) % 24),
  duration: 14 + ((i * 4) % 10),
  delay: -((i * 4) % 14),
}));

export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {TILES.map((t, i) => (
        <div
          key={i}
          className="bg-tile"
          style={{
            position: "absolute",
            top: "100%",
            left: `${t.left}%`,
            width: t.size,
            height: t.size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.25)",
            border: "3px solid rgba(0,0,0,0.2)",
            borderRadius: 8,
            fontFamily: "'Bungee', sans-serif",
            fontSize: t.size * 0.55,
            color: "rgba(0,0,0,0.2)",
            animation: `float-up ${t.duration}s linear ${t.delay}s infinite`,
          }}
        >
          {t.letter}
        </div>
      ))}
    </div>
  );
}