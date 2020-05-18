import IsPointerInBounds from '../../../plugins/utils/input/IsPointerInBounds.js';

var IsInTouching = function (pointer, gameObject) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    return IsPointerInBounds(gameObject, pointer);
}

export default IsInTouching;