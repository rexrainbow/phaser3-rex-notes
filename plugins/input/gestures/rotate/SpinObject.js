import RotateObjectAround from '../../../utils/actions/RotateObjectAround.js';

var SpinObject = function (gameObject, camera) {
    if (!this.isRotation) {
        return this;
    }

    if (camera === undefined) {
        camera = this.pointers[0].camera;
    }

    var movementX = this.movementCenterX,
        movementY = this.movementCenterY;

    camera.getWorldPoint(this.centerX, this.centerY, tmpPos);
    var centerWorldX = tmpPos.x;
    var centerWorldY = tmpPos.y;

    var angle = this.rotation;
    if (Array.isArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            gameObject.x += movementX;
            gameObject.y += movementY;
            RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
        }
    } else {
        gameObject.x += movementX;
        gameObject.y += movementY;
        RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
    }
    return this;
}

var tmpPos = {};

export default SpinObject;