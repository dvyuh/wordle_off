from game import check_guess, apply_result
from words import pick_word


def new_match():
    return {
        "words": [pick_word()],
        "players": [
            {"hp": 100, "word_idx": 0, "guesses": []},
            {"hp": 100, "word_idx": 0, "guesses": []},
        ],
    }


def secret_for(match, p):
    # the word player p is currently on; adds new words to the shared list if needed
    idx = match["players"][p]["word_idx"]
    while len(match["words"]) <= idx:
        match["words"].append(pick_word())
    return match["words"][idx]


def submit_guess(match, p, word):
    me = match["players"][p]
    opp = match["players"][1 - p]

    secret = secret_for(match, p)
    result = check_guess(secret, word)
    me["guesses"].append(word)

    solved = word == secret
    failed = not solved and len(me["guesses"]) >= 6
    word_done = solved or failed

    if not word_done:
        return {
            "result": result,
            "word_done": False,
            "solved": solved,
            "secret": secret,
            "hp": me["hp"],
            "winner": None,
        }

    n = len(me["guesses"])

    me["hp"], opp["hp"] = apply_result(
        me["hp"], opp["hp"], solved, n
    )

    me["guesses"] = []
    me["word_idx"] += 1

    winner = None

    if opp["hp"] <= 0:
        winner = p
    elif me["hp"] <= 0:
        winner = 1 - p

    return {
        "result": result,
        "word_done": True,
        "solved": solved,
        "secret": secret,
        "hp": me["hp"],
        "winner": winner,
    }