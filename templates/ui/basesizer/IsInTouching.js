import IsObjectBelowPointer from '../../../plugins/utils/input/IsObjectBelowPointer.js';

var IsInTouching = function (pointer) {
    if (!this.input) {
        this.setInteractive();
    }
    if (pointer && (!pointer.isDown)) {
        return false;
    }
    return IsObjectBelowPointer(this, pointer);
}
export default IsInTouching;