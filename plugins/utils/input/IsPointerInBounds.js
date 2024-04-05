import IsPointInBounds from '../bounds/IsPointInBounds.js';
import GetPointerWorldXY from './GetPointerWorldXY.js';

var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
    var mainCamera = gameObject.scene.sys.cameras.main,
        worldXY;

    var useScreenXY = (gameObject.scrollFactorX === 0) && (gameObject.scrollFactorY === 0);

    if (pointer) {
        if (useScreenXY) {
            return IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest);

        } else {
            worldXY = GetPointerWorldXY(pointer, mainCamera, true);
            if (!worldXY) {
                return false;
            }
            return IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest);

        }

    } else {
        var inputManager = gameObject.scene.input.manager;
        var pointersTotal = inputManager.pointersTotal;
        var pointers = inputManager.pointers;
        for (var i = 0; i < pointersTotal; i++) {
            pointer = pointers[i];

            if (useScreenXY) {
                if (IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest)) {
                    return true;
                }

            } else {
                worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                if (!worldXY) {
                    continue;
                }

                if (IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
                    return true;
                }

            }

        }
        return false;

    }

}

export default IsPointerInBounds;