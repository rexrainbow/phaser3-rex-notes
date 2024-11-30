import GetPointerWorldXY from './GetPointerWorldXY.js';

var PointerTest = function (gameObject, pointer, mainTest, preTest, postTest) {
    var mainCamera = gameObject.scene.sys.cameras.main,
        worldXY;

    var useScreenXY = (gameObject.scrollFactorX === 0) && (gameObject.scrollFactorY === 0);

    if (pointer) {
        if (useScreenXY) {
            return mainTest(gameObject, pointer.x, pointer.y, preTest, postTest);

        } else {
            worldXY = GetPointerWorldXY(pointer, mainCamera, true);
            if (!worldXY) {
                return false;
            }
            return mainTest(gameObject, worldXY.x, worldXY.y, preTest, postTest);

        }

    } else {
        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];

            if (useScreenXY) {
                if (mainTest(gameObject, pointer.x, pointer.y, preTest, postTest)) {
                    return true;
                }

            } else {
                worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                if (!worldXY) {
                    continue;
                }

                if (mainTest(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
                    return true;
                }

            }

        }
        return false;

    }1
}
export default PointerTest;