var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
    if (globRect === undefined) {
        globRect = new Phaser.Geom.Rectangle();
    }
    gameObject.getBounds(globRect);

    if (pointer) {
        if (preTest && !preTest(gameObject, pointer)) {
            return false;
        }
        if (!globRect.contains(pointer.x, pointer.y)) {
            return false;
        }
        if (postTest && !postTest(gameObject, pointer)) {
            return false;
        }
        return true;

    } else {
        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];
            if (preTest && !preTest(gameObject, pointer)) {
                continue;
            }
            if (!globRect.contains(pointer.x, pointer.y)) {
                continue;
            }
            if (postTest && !postTest(gameObject, pointer)) {
                continue;
            }
            return true;
        }
        return false;

    }

}

var globRect = undefined;

export default IsPointerInBounds;