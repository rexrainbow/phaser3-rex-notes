var ResetChildPosition = function () {
    var x = this.left;
    var y = this.top;
    if (this.scrollMode === 0) {
        y += this.childOY;
    } else {
        x += this.childOY;
    }
    this.child.setPosition(x, y);
    this.maskChildren(this.child.getAllChildren());
    this.resetChildPositionState(this.child);
};

export default ResetChildPosition;