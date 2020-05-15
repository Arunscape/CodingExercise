from typing import List, Tuple, Dict
from enum import Enum
from collections import Counter

data = "FLRRFRFRRFRFLLFRFFFRRLLLRLFLRRLFLRRFFFFRLLLFRRFFFLRFFRFRRFFRLRFRRRRLLLRFFFFFFFRRFFFFRFRRLFLRFFFRFRLRFRLRLRFRRRRRLFLFLRRLRRRLFFRRFFFFLRLLRLRFFRRLLRLRRRFLRFRFRFLLRFRLRFFLLFLFRRFFRFRFLFFFRLLLRFLRRFFRFLRFRRFRFFLFLRFLFFRRFRRFRLRFFRFLFLFLLRLRLFRRFLRRFFLRFLRFRLFFFFFFRRRFRRRFRFFRRRFFLRFFLLFRLRRFLFRLRLRFRRFFFFRFLFFRFFRFFFRFLFRFRRRLLLRLFFLRRRFFLFFFFFFLFLLRLLLLFFLFLFLRLRRFLFLFFRLLRFRRRFLFFRRLLRLRFRRFLFRLLRFRFFRRFFRRLRLFRLRLFFLLRRRFRFFLLFFRFLRRFFFLFRFLFLFRLFLFFRFLFFRRFFFFLRFLRRFFRFFRLLFFFFRFRRLLFLRRFRLRLFRFLRFRRLFFLLRRFLLRFFLLFLFFFLRFLFFFLRRFRFFFRFFRLRRLFLRFLFFFRFRFLFRFFLFFRFFFFFRRLFRFRLFFLRRFRLLRFRRLLRLRLLLRLLFLFFRFFLLRRLLLRRLFRFFLFFFLRRLFFFLFRFFLRFLLFRLRFFFLFFFFLLFRRFLLFFRLFLRLRRFLRLFFRLFLRFFRFLLFFFLRLRLFRFRLFLRFRRFRFRFLRRRFRFFFFRLRFLRFFFLLLLFFFFRLLLRFRFRLFLFRRLLLFRRFRFRRLLRFLRRRFRRLRFFFRFRLFLRFFRFLFLLLRRLFFLFLRLRFRFRRRLRRFFRRRRFRRFFLFFRRRRRFFLRLRRFRRFRRRRFFFRLLFFRLFFRLFFRRRLRRLFFRFFRLFLLFRLRFFFFRRFFLRRRRFRFLFLRRLLFRFFFRLLLRFRRLLRFLFLFLLFFLLFFFLRLLRFRFRRFFLRLFFLRFLLLRLRFRFRFFFFFLFFRFRRLLLRRRRRLRFFRFFLFFFRFRLRFFLFRRRRFRRFLRRLFLLFFFFFFRRRFFRLRRRLFLRLFLRFFFFLFLLLLFLRFLRFRFLFFFFLRFFLRRFRLFRFRLLRLFFRFRLRRLLRRLFFRLLRFRRLRRLRRRLLLRRRFFFFRLRFLLRRFLFFRRFLFLFLLLRRFRFFRFFLFLRRRLFFFLRFRFRRLFLLFRLFRFFLFLFRFRRFRLRRFFLRLLFRFLRRLRFLRLFRLRRLFRRRLFRRFRFRFLRFFLFRRFLRFFLFLRFRLRRLLFFRRRLLLLFFRFLRLRRFLFLLRLFLLLLLRFLFFFFRRRFRRFLLFFFRFRFFLRRFLRFFFRFRLFRFLRFLFRLRFRFFFRLFRFRLLFLRRFRRRLRFLRFFLRFRFFFLRFRFLFRFRFRLFFRFRRFLRFLFLFRFFRFLRRRRFLLLLRFFFRRFRRRLR"

Direction = Enum("Direction", "UP DOWN LEFT RIGHT")

class Turtle:

    def __init__(self):
        self.path: List[Tuple[int, int]] = [(0,0)]
        self.direction: Direction = Direction.UP

    def move_forward(self) -> None:
        direction_map = {
            Direction.UP: (0,1),
            Direction.DOWN: (0, -1),
            Direction.LEFT: (-1, 0),
            Direction.RIGHT: (1, 0),
        }
        self.path.append(tuple(map(sum, zip(self.path[-1], direction_map[self.direction]))))
    
    def rotate_left(self) -> None:
        direction_map = {
            Direction.UP: Direction.LEFT,
            Direction.DOWN: Direction.RIGHT,
            Direction.LEFT: Direction.DOWN,
            Direction.RIGHT: Direction.UP,
        }
        self.direction = direction_map[self.direction]

    def rotate_right(self)-> None:
        direction_map = {
            Direction.UP: Direction.RIGHT,
            Direction.DOWN: Direction.LEFT,
            Direction.LEFT: Direction.UP,
            Direction.RIGHT: Direction.DOWN,
        }
        self.direction = direction_map[self.direction]


    def process_input(self, data: str) -> Dict:
        for c in data:
            if c == 'F':
                self.move_forward()
            elif c == 'L':
                self.rotate_left()
            elif c == 'R':
                self.rotate_right()
            else:
                raise Exception("Invalid move in sequence. There are 3 valid moves 'F', 'L', or 'R'")
        return self.find_duplicates()

    def find_duplicates(self) -> Dict:
        return dict(filter(lambda x: x[1] > 1, Counter(self.path).items()))


t = Turtle()

print(t.process_input("FFFLFFLLF"))

print(t.path)