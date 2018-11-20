var IsObjectInTouching = function (gameObject, pointer, callback, scope) {
    var isHit = false;
    if (pointer) {
        isHit = HitTest(gameObject, pointer);
        if (isHit && callback) {
            if (scope) {
                isHit = callback.call(scope, pointer);
            } else {
                isHit = callback(pointer);
            }
        }
    } else {
        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers,
            pointer;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            isHit = HitTest(gameObject, pointer);
            if (isHit && callback) {
                if (scope) {
                    isHit = callback.call(scope, pointer);
                } else {
                    isHit = callback(pointer);
                }
            }
            if (isHit) {
                break;
            }
        }

        return false;
    }

    return isHit;
}

var HitTest = function (gameObject, pointer) {
    if (!pointer.isDown) {
        return false;
    }
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];
    var output;

    for (var i = 0, len = cameras.length; i < len; i++) {
        output = inputManager.hitTest(pointer, gameObjects, cameras[i]);
        if (output.length > 0) {
            return true;
        }
    }

    return false;
}

export default IsObjectInTouching;