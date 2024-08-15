import IsPointInBounds from '../bounds/IsPointInBounds.js';
import GetPointerWorldXY from './GetPointerWorldXY.js';

var GetInBoundsPointer = function (gameObject, isPointerDown, preTest, postTest) {
    var mainCamera = gameObject.scene.sys.cameras.main,
        worldXY;

    var useScreenXY = (gameObject.scrollFactorX === 0) && (gameObject.scrollFactorY === 0);

    var inputManager = gameObject.scene.input.manager;
    var pointersTotal = inputManager.pointersTotal;
    var pointer, pointers = inputManager.pointers;
    for (var i = 0; i < pointersTotal; i++) {
        pointer = pointers[i];

        if (isPointerDown && (!pointer.isDown)) {
            continue;
        }

        if (useScreenXY) {
            if (IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest)) {
                return pointer;
            }

        } else {
            worldXY = GetPointerWorldXY(pointer, mainCamera, true);
            if (!worldXY) {
                continue;
            }

            if (IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
                return pointer;
            }

        }

    }

    return null;
}

export default GetInBoundsPointer;