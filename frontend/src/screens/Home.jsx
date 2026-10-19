import Button from "../components/Button";


export default function Home({ onSinglePlayer, onOneVsOne }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img src="/title.svg" alt="Wordle Off" style={{
            marginTop: 80,
            }} />
      <div
        style={{
          width: "100%",
          maxWidth: 320,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 40,
        }}
      >
        <Button onClick={onSinglePlayer}>SINGLE PLAYER</Button>
        <Button onClick={onOneVsOne}>1V1</Button>
        <Button disabled>CO-OP</Button>

      </div>
    </div>
  );
}