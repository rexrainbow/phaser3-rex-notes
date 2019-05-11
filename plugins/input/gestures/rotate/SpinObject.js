import RotateObjectAround from '../../../utils/actions/RotateObjectAround.js';

var SpinObject = function (gameObject, camera) {
    if (!this.isRotation) {
        return this;
    }

    if (camera === undefined) {
        camera = this.pointers[0].camera;
    }

    var centerX = this.centerX,
        centerY = this.centerY,
        prevCenterX = this.prevCenterX,
        prevCenterY = this.prevCenterY;
    var deltaX = centerX - prevCenterX,
        deltaY = centerY - prevCenterY;

    camera.getWorldPoint(centerX, centerY, tmpPos);
    var centerWorldX = tmpPos.x;
    var centerWorldY = tmpPos.y;

    var angle = this.rotation;
    if (Array.isArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            gameObject.x += deltaX;
            gameObject.y += deltaY;
            RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
        }
    } else {
        gameObject.x += deltaX;
        gameObject.y += deltaY;
        RotateObjectAround(gameObject, x, y, angle);
    }
    return this;
}

var tmpPos = {};

export default SpinObject;