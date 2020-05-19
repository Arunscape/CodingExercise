from typing import List, Tuple, Dict
from enum import Enum
from collections import Counter

# hmm, I could encode each direction as a tuple instead. e.g. right would be (1,0) and up is (0, 1)
Direction = Enum("Direction", "UP DOWN LEFT RIGHT")


class Turtle:
    def __init__(self):
        self.path: List[Tuple[int, int]] = [(0, 0)]
        self.direction: Direction = Direction.UP

    def move_forward(self) -> None:
        direction_map = {
            Direction.UP: (0, 1),
            Direction.DOWN: (0, -1),
            Direction.LEFT: (-1, 0),
            Direction.RIGHT: (1, 0),
        }
        self.path.append(
            tuple(map(sum, zip(self.path[-1], direction_map[self.direction])))
        )

    def rotate_left(self) -> None:
        direction_map = {
            Direction.UP: Direction.LEFT,
            Direction.DOWN: Direction.RIGHT,
            Direction.LEFT: Direction.DOWN,
            Direction.RIGHT: Direction.UP,
        }
        self.direction = direction_map[self.direction]

    def rotate_right(self) -> None:
        direction_map = {
            Direction.UP: Direction.RIGHT,
            Direction.DOWN: Direction.LEFT,
            Direction.LEFT: Direction.UP,
            Direction.RIGHT: Direction.DOWN,
        }
        self.direction = direction_map[self.direction]

    def process_input(self, data: str) -> Dict:
        for c in data:
            if c == "F":
                self.move_forward()
            elif c == "L":
                self.rotate_left()
            elif c == "R":
                self.rotate_right()
            else:
                raise Exception(
                    "Invalid move in sequence. There are 3 valid moves 'F', 'L', or 'R'"
                )
        return self.find_duplicates()

    def find_duplicates(self) -> Dict:
        return dict(filter(lambda x: x[1] > 1, Counter(self.path).items()))


# webserver stuff
from wsgiref.simple_server import make_server
import falcon
import json


class TurtleResource:
    def on_post(self, req, resp):
        """Handles POST requests"""
        resp.status = falcon.HTTP_200  # This is the default status
        t = Turtle()
        request_body = req.stream.read(req.content_length or 0).decode()
        duplicates = t.process_input(request_body)

        # print(req)
        resp.media = {
            "path": [{"x": x, "y": y} for x, y in t.path],
            "duplicates": [
                {"x": coord[0], "y": coord[1], "times_visited": count}
                for coord, count in duplicates.items()
            ],
            "input": request_body,
        }


# falcon.App instances are callable WSGI apps
# in larger applications the app is created in a separate file
app = falcon.App()

# Resources are represented by long-lived class instances
tr = TurtleResource()

app.add_route("/turtle", tr)

if __name__ == "__main__":
    with make_server("", 8000, app) as httpd:
        print("Serving on port 8000...")

        # Serve until process is killed
        httpd.serve_forever()
