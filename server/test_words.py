from words import pick_word, is_valid, ANSWERS

def test_lists_loaded():
    assert len(ANSWERS) > 2000

def test_pick_word_is_five_letters():
    for _ in range(50):
        assert len(pick_word()) == 5

def test_valid_and_invalid():
    assert is_valid("CRANE")
    assert not is_valid("QQQQQ")