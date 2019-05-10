import IsObjectBelowPointer from '../../../plugins/utils/input/IsObjectBelowPointer.js';

var IsInTouching = function (pointer) {
    if (!this.input) {
        this.setInteractive();
    }
    return IsObjectBelowPointer(this, pointer, preTest);
}

var preTest = function (gameObject, pointer) {
    return pointer.isDown;
}
export default IsInTouching;