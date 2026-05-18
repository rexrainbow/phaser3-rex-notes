import IsPointerInBounds from '../../../plugins/utils/input/IsPointerInBounds';
import IsGameObject from '../../../plugins/utils/system/IsGameObject';

var IsInTouching = function(pointer?: any, gameObject?: any) {
    if (IsGameObject(pointer) || (typeof (pointer) === 'string')) {
        gameObject = pointer;
        pointer = undefined;
    }

    if (gameObject === undefined) {
        gameObject = this;
    } else if (typeof (gameObject) === 'string') {
        gameObject = this.getElement(gameObject);
    }

    return IsPointerInBounds(gameObject, pointer);
}

export default IsInTouching;