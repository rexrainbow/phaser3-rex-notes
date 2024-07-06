var IsPointerInHitArea = function (gameObject, pointer, preTest, postTest, returnFirstPointer) {
    if (pointer) {
        if (preTest && !preTest(gameObject, pointer)) {
            return false;
        }
        if (!HitTest(gameObject, pointer)) {
            return false;
        }
        if (postTest && !postTest(gameObject, pointer)) {
            return false;
        }
        return true;

    } else {
        if (returnFirstPointer === undefined) {
            returnFirstPointer = false;
        }

        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers,
            pointer;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (preTest && !preTest(gameObject, pointer)) {
                continue;
            }
            if (!HitTest(gameObject, pointer)) {
                continue;
            }
            if (postTest && !postTest(gameObject, pointer)) {
                continue;
            }

            if (returnFirstPointer) {
                return pointer;
            }

            return true;
        }

        return false;
    }
}

var HitTest = function (gameObject, pointer) {
    var scene = gameObject.scene;
    var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
    var inputManager = scene.input.manager;
    var gameObjects = [gameObject];

    for (var i = 0, len = cameras.length; i < len; i++) {
        inputManager.hitTest(pointer, gameObjects, cameras[i], HitTestResult);
        if (HitTestResult.length > 0) {
            HitTestResult.length = 0;
            return true;
        }
    }

    HitTestResult.length = 0;
    return false;
}

var HitTestResult = [];

export default IsPointerInHitArea;