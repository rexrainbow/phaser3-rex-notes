import RotateObjectAround from '../../../utils/actions/RotateObjectAround.js';

var SpinObject = function (gameObject, camera) {
    if (!this.isRotation) {
        return this;
    }

    var p0 = this.pointers[0];
    var x, y;
    if (camera === undefined) {
        x = p0.worldX;
        y = p0.worldY;
    } else {
        camera.getWorldPoint(p0.x, p0.y, tmpPos);
        x = tmpPos.x;
        y = tmpPos.y;
    }

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