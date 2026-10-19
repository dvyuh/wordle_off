MAX_HP = 100
FAIL_PENALTY = 40

def apply_result(hp_me, hp_opp, solved, guesses):
    if solved:
        hp_me += 70 -10* guesses
        hp_opp -= 80 - 10* guesses
    else:
        hp_me -= FAIL_PENALTY
    hp_me = min(max(hp_me, 0), MAX_HP)
    hp_opp = min(max(hp_opp, 0), MAX_HP)
    return hp_me, hp_opp