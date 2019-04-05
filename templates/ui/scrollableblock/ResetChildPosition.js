import MaskChildren from '../../../plugins/gameobjects/containerlite/MaskChildren.js';

var ResetChildPosition = function () {
    var x = this.left;
    var y = this.top;
    if (this.scrollMode === 0) {
        y += this.childOY;
    } else {
        x += this.childOY;
    }
    this.child.setPosition(x, y);
    this.resetChildState(this.child);

    if (this.childMask) {
        MaskChildren(this, this.childMask);
    }
};

export default ResetChildPosition;