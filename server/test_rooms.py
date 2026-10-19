from rooms import make_code, rooms

def test_code_is_six_uppercase_letters():
    code = make_code()
    assert len(code) == 6
    assert code.isalpha() and code.isupper()

def test_code_is_unique():
    rooms["ABCDEF"] = {}
    for _ in range(200):
        assert make_code() != "ABCDEF"