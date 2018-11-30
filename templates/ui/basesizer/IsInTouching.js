import IsObjectInTouching from '../../../plugins/utils/input/IsObjectInTouching.js';

var IsInTouching = function (pointer) {
    if (!this.input) {
        this.setInteractive();
    }
    return IsObjectInTouching(this, pointer);
}
export default IsInTouching;