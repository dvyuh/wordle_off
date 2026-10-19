import random
import string

rooms = {}

def make_code():
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=6))
        if code not in rooms:
            return code