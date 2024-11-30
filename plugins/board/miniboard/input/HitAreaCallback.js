const RectangleContains = Phaser.Geom.Rectangle.Contains;

var HitAreaCallback = function (shape, x, y, gameObject) {
    if (!RectangleContains(shape, x, y)) {
        return false;
    }

    return gameObject.isInTouching();
}

export default HitAreaCallback;