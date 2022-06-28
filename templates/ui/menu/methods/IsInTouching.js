import IsInTouchingBase from '../../basesizer/IsInTouching.js';

var IsInTouching = function (pointer) {
    if (IsInTouchingBase.call(this, pointer)) {
        return true;
    } else if (this.childrenMap.subMenu) {
        return this.childrenMap.subMenu.isInTouching(pointer);
    } else {
        return false;
    }
}

export default IsInTouching;