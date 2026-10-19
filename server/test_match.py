from match import new_match, submit_guess

def make(word="CRANE"):
    m = new_match()
    m["words"] = [word]
    return m

def test_wrong_guess_not_done():
    m = make()
    r = submit_guess(m, 0, "SLATE")
    assert r["word_done"] is False

def test_solve_in_one_damages_opponent_and_heals_me():
    m = make()
    m["players"][0]["hp"] = 50
    r = submit_guess(m, 0, "CRANE")
    assert r["solved"] and r["word_done"]
    assert r["hp"] == [100, 30]

def test_fail_after_six():
    m = make()
    for _ in range(6):
        r = submit_guess(m, 0, "SLATE")
    assert r["word_done"] and not r["solved"]
    assert r["secret"] == "CRANE"
    assert r["hp"] == [60, 100]

def test_word_advances_and_guesses_reset():
    m = make()
    submit_guess(m, 0, "CRANE")
    assert m["players"][0]["word_idx"] == 1
    assert m["players"][0]["guesses"] == []

def test_winner_when_opponent_hits_zero():
    m = make()
    m["players"][1]["hp"] = 30
    r = submit_guess(m, 0, "CRANE")
    assert r["winner"] == 0

def test_both_players_get_same_words():
    m = new_match()
    from match import secret_for
    m["players"][0]["word_idx"] = 3
    first = secret_for(m, 0)
    m["players"][1]["word_idx"] = 3
    assert secret_for(m, 1) == first