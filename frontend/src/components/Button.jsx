export default function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        color: "black",
        width: "100%",
        padding: "16px 0",
        fontSize: 32,
        fontFamily: "inherit",
        background: "white",
        border: "3px solid black",
        borderRadius: 8,
        boxShadow: "4px 4px 0 black",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {children}
    </button>
  );
}