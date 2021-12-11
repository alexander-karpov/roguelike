from typing import Tuple
from flask import Flask, request, make_response
from PIL import Image
import io

SPRITE_SIDE = 64

sprites = []

# Load sprites
with Image.open("./sprites/roguelike.png") as im:
    SPRITES_IN_LINE = im.size[0] // SPRITE_SIDE

    for i in range(56):
        x1 = SPRITE_SIDE * i % im.size[0]
        y1 = (i // SPRITES_IN_LINE) * SPRITE_SIDE

        part = im.crop((x1, y1, x1 + SPRITE_SIDE, y1 + SPRITE_SIDE))
        sprites.append(part)


def draw_sprite(frame: Image.Image, sprite: Image.Image, position: Tuple[int, int], mask=None):
    frame.paste(sprite, (position[0] * SPRITE_SIDE, position[1] * SPRITE_SIDE), mask)


def draw_scene(scene) -> Image.Image:
    SPRITES_IN_LINE = 6
    frame = Image.new("RGBA", (328, 480), (0,0,0,255))

    for (i, sprite_num) in enumerate(scene["background"]):
        draw_sprite(frame, sprites[sprite_num], (i % SPRITES_IN_LINE, i // SPRITES_IN_LINE))

    for sprite_id, x, y in scene["objects"]:
        draw_sprite(frame, sprites[sprite_id], (x, y), sprites[sprite_id])

    return frame


app = Flask(__name__)

@app.route("/", methods=['GET']) # type:ignore
def greating():
    return "Всё хорошо. Работаем"


@app.route("/image", methods=['POST']) # type:ignore
def main():
    scene = request.json

    frame = draw_scene(scene)
    output = io.BytesIO()
    frame.save(output, format='PNG')
    frame.close()

    response = make_response(output.getvalue())
    response.headers.set('Content-Type', 'image/png')

    return response


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=5000)
