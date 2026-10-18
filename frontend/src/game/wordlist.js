import { ANSWERS } from "./answers";
import { VALID } from "./valid";

const VALID_SET = new Set([...VALID, ...ANSWERS]);

export function pickWord() {
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
}

export function isValidWord(word) {
  return VALID_SET.has(word);
}