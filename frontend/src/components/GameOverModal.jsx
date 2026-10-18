import { COLORS } from "../styles/colors";

const buttonStyle = {
  width: "100%",
  padding: "14px 0",
  fontSize: 20,
  fontFamily: "inherit",
  border: "3px solid black",
  borderRadius: 8,
  boxShadow: "4px 4px 0 black",
  cursor: "pointer",
};

export default function GameOverModal({ won, secret,stats,guessCount, onPlayAgain, onMenu }) {
  function StatsGraph({ stats, highlight }) {
  const max = Math.max(...stats.dist, 1);
   return (
    <div style={{ textAlign: "left" }}>
      <div style={{ fontSize: 16, marginBottom: 6 }}>
        GAMES PLAYED: {stats.played} · WON: {stats.won}
      </div>
      {stats.dist.map((count, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}
        >
          <span style={{ width: 12, fontSize: 14 }}>{i + 1}</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                boxSizing: "border-box",
                width: `${Math.max((count / max) * 100, 10)}%`,
                background: i + 1 === highlight ? COLORS.correct : COLORS.absent,
                color: i + 1 === highlight ? "black" : "white",
                border: "2px solid black",
                borderRadius: 4,
                padding: "0 6px",
                fontSize: 14,
                textAlign: "right",
              }}
            >
              {count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
        color: "black",
        width: "min(320px, 88%)",
        background: "white",
        border: "3px solid black",
        borderRadius: 16,
        boxShadow: "6px 6px 0 black",
        padding: 24,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: "bold" }}>{won ? "YOU WON!" : "YOU LOST"}</div>
        <div style={{ fontSize: 24,fontWeight: "bold", marginBottom: 8 }}>
          THE WORD WAS {secret}
        </div>
        <StatsGraph stats={stats} highlight={won ? guessCount : null} />
        <button
          onClick={onPlayAgain}
          style={{ ...buttonStyle,fontWeight: "bold", fontSize: 24, color:"black", background: COLORS.correct }}
        >
          PLAY AGAIN
        </button>
        <button onClick={onMenu} style={{ ...buttonStyle,fontWeight: "bold", fontSize: 24, color: "black", background: "white" }}>
          MENU
        </button>
      </div>
    </div>
  );
}
