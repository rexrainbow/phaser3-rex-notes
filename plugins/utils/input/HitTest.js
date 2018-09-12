var HitTest = function (pointer, gameObject) {
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

export default HitTest;