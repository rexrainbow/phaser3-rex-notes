const RotateAround = Phaser.Math.RotateAround;

var ChangeOrigin = function (gameObject, originX, originY) {
    if (originY === undefined) {
        originY = originX;
    }

    var deltaXY = {
        x: (originX - gameObject.originX) * gameObject.displayWidth,
        y: (originY - gameObject.originY) * gameObject.displayHeight
    }
    RotateAround(deltaXY, 0, 0, gameObject.rotation);

    gameObject.setOrigin(originX, originY);
    gameObject.setPosition(gameObject.x + deltaXY.x, gameObject.y + deltaXY.y);

    return gameObject;
}

export default ChangeOrigin;