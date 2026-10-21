MAX_HP = 100
FAIL_PENALTY = 40

def check_guess(secret, guess):
    secret, guess = secret.upper(), guess.upper()
    result = ["absent"] * 5
    remaining = list(secret)

    for i in range(5):
        if guess[i] == secret[i]:
            result[i] = "correct"
            remaining[i] = None

    for i in range(5):
        if result[i] == "absent" and guess[i] in remaining:
            result[i] = "present"
            remaining[remaining.index(guess[i])] = None

    return result

def apply_result(hp_me, hp_opp, solved, guesses):
    if solved:
        hp_me += 70 -10* guesses
        hp_opp -= 80 - 10* guesses
    else:
        hp_me -= FAIL_PENALTY
    hp_me = min(max(hp_me, 0), MAX_HP)
    hp_opp = min(max(hp_opp, 0), MAX_HP)
    return hp_me, hp_opp