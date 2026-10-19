from game import apply_result

def test_solve_in_one():
    assert apply_result(50, 100, True, 1) == (100, 30)   # heal capped at 100

def test_solve_in_four():
    assert apply_result(50, 100, True, 4) == (80, 60)

def test_fail():
    assert apply_result(100, 100, False, 6) == (60, 100)

def test_hp_never_below_zero():
    assert apply_result(30, 100, False, 6) == (0, 100)