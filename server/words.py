from pathlib import Path
import random

HERE = Path(__file__).parent

def load(filename):
    with open(HERE / filename) as f:
        return [line.strip() for line in f.readlines()]

ANSWERS = load("answers.txt")
VALID = set(load("valid.txt")) | set(ANSWERS)

def pick_word():
    return random.choice(ANSWERS)

def is_valid(word):
    return word in VALID
