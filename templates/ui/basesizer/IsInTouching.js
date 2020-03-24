import IsPointerInBounds from '../../../plugins/utils/input/IsPointerInBounds.js';

export default function (pointer, gameObject) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    return IsPointerInBounds(gameObject, pointer);
}