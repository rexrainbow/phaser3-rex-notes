const Rectangle = Phaser.Geom.Rectangle;
const Union = Phaser.Geom.Rectangle.Union;

var GetBoundsOfGameObjects = function (gameObjects, out) {
    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        if (globBounds === undefined) {
            globBounds = new Rectangle();
        }
        out = globBounds;
    }

    var gameObject;
    var firstClone = true;
    for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
        gameObject = gameObjects[i];
        if (!gameObject.getBounds) {
            continue;
        }

        GOBounds = gameObject.getBounds(GOBounds);

        if (firstClone) {
            out.setTo(GOBounds.x, GOBounds.y, GOBounds.width, GOBounds.height);
            firstClone = false;
        } else {
            Union(GOBounds, out, out);
        }
    }

    return out;
}

var GOBounds, globBounds;

export default GetBoundsOfGameObjects;