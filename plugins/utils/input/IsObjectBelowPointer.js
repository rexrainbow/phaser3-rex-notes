var IsObjectBelowPointer = function (gameObject, pointer, preTest, postTest) {
    var isHit = false;
    if (pointer) {
        if (preTest && !preTest(gameObject, pointer)) {
            return false;
        }
        isHit = HitTest(gameObject, pointer);
        if (isHit && postTest && !postTest(gameObject, pointer)) {
            return false;
        }
        return isHit;
    } else {
        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers,
            pointer;
        for (var i = 0; i < pointersTotal; i++) {
            isHit = false;
            pointer = pointers[i];
            if (preTest && !preTest(gameObject, pointer)) {
                continue;
            }
            isHit = HitTest(gameObject, pointer);
            if (isHit && postTest && !postTest(gameObject, pointer)) {
                continue;
            }
            if (isHit) {
                return true;
            }
        }

        return false;
    }
}

var HitTest = function (gameObject, pointer) {
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

export default IsObjectBelowPointer;