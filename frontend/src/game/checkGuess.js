export default function CheckGuess(secret, guess) {
  const result = Array(5).fill("absent");
  const remaining = secret.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === secret[i]) {
      result[i] = "correct";
      remaining[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "absent" && remaining.includes(guess[i])) {
      result[i] = "present";
      remaining[remaining.indexOf(guess[i])] = null;
    }
  }

  return result;
}