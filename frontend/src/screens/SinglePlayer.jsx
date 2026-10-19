import { useState, useEffect } from "react";
import Tile from "../components/Tiles";
import CheckGuess from "../game/checkGuess";
import Keyboard from "../components/keyboard";
import GameOverModal from "../components/GameOverModal";
import { pickWord, isValidWord } from "../game/wordlist";
import Button from "../components/Button";

import { loadStats, recordGame } from "../game/stats";


export default function SinglePlayer({ onMenu }) {
    const [secret, setSecret] = useState(() => pickWord());
  const [current, setCurrent] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState(() => loadStats());
  const won = guesses.includes(secret);
  const lost = !won && guesses.length >= 6;

  function reset(){
    setGuesses([]);
    setCurrent("");
    setSecret(pickWord());
  }
  function toast(text) {
  setMessage(text);
  setTimeout(() => setMessage(""), 1500);
}

  function press(key) {
  if (won || lost) return;

  if (key === "Enter") {
    if (current.length < 5) return;
    if (!isValidWord(current)) {
      toast("NOT IN WORD LIST");
      return;
    }
    const newGuesses = [...guesses, current];
    setGuesses(newGuesses);
    setCurrent("");
    if (current === secret || newGuesses.length >= 6) {
      setStats(recordGame(current === secret, newGuesses.length));
    }
  } else if (key === "Backspace") {
    setCurrent((prev) => prev.slice(0, -1));
  } else if (/^[a-zA-Z]$/.test(key)) {
    setCurrent((prev) => (prev.length < 5 ? prev + key.toUpperCase() : prev));
  }
}

  useEffect(() => {
    function handleKey(e){
      press(e.key);
  }
  // event listener for keypresses
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
  }, [current, guesses,]);

  const RANK = {absent:1, present:2, correct:3};
  const keyStatuses = {};

  guesses.forEach((g) =>{
    const s = CheckGuess(secret, g);
    g.split("").forEach((letter, i) => {
      const old = keyStatuses[letter];
      if (!old || RANK[s[i]] > RANK[old]) keyStatuses[letter] = s[i];
    });
  });


  return (
    <>
    {message && (
  <div
    style={{
      position: "fixed",
      top: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: "white",
      border: "3px solid black",
      borderRadius: 8,
      boxShadow: "4px 4px 0 black",
      padding: "10px 16px",
      fontSize: 18,
      zIndex: 20,
    }}
  >
    {message}
  </div>
)}
    <div style={{  minHeight: "100vh", padding: 16 }}>
    <div style={{ width: 120, marginBottom: 16 }}>
  <Button onClick={onMenu} style={{ padding: "8px 0", fontSize: 16 }}>
    MENU
  </Button>
</div>
    <div style = {{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
    {[0,1,2,3,4,5].map((row) => {
      let word = "";

      if (row < guesses.length) word = guesses[row];
      else if (row === guesses.length) word = current;
      const statuses = row < guesses.length ? CheckGuess(secret, word) : [];
      return(
        <div key = {row} style = {{display: "flex", gap: 8 }}>
        {[0,1,2,3,4].map((col) => (
          <Tile key = {col} letter = {word[col]} status = {statuses[col]} />
        ))}
        </div>
      );
    })}
    
    {(won || lost) && (
      <GameOverModal
        won = {won}
        secret = {secret}
        stats = {stats}
        guessCount = {guesses.length}
        onPlayAgain = {reset}
        onMenu = {onMenu}
      />
)}
    </div>
    <Keyboard onPress = {press} statuses = {keyStatuses} />
    </div>

    </>
    
  )
}
