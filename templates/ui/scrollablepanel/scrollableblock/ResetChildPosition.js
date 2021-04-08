var ResetChildPosition = function () {
    var x = this.left;
    var y = this.top;
    if (this.scrollMode === 0) {
        y += this.childOY;
    } else {
        x += this.childOY;
    }
    this.child.setPosition(x, y);
    this.resetChildPositionState(this.child);

    if (this.maskUpdateMode === 0) {
        this.maskChildren();
    }
};

export default ResetChildPosition;