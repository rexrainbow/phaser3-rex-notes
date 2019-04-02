import MaskChildren from '../../../plugins/utils/mask/MaskChildren.js';

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

    MaskChildren(this, this.childMask);
};

export default ResetChildPosition;