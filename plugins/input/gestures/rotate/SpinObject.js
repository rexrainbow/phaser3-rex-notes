import RotateObjectAround from '../../../utils/actions/RotateObjectAround.js';

var SpinObject = function (gameObject, camera) {
    if (!this.isRotation) {
        return this;
    }

    if (camera === undefined) {
        camera = this.pointers[0].camera;
    }

    var p0 = this.pointers[0],
        p1 = this.pointers[1];
    var x = (p0.x + p1.x) / 2,
        y = (p0.y + p1.y) / 2;
    camera.getWorldPoint(x, y, tmpPos);
    x = tmpPos.x;
    y = tmpPos.y;

    var angle = this.rotation;
    if (Array.isArray(gameObject)) {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            RotateObjectAround(gameObjects[i], x, y, angle);
        }
    } else {
        RotateObjectAround(gameObject, x, y, angle);
    }
    return this;
}

var tmpPos = {};

export default SpinObject;