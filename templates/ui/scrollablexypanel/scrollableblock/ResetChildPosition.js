var ResetChildPosition = function () {
    var x = this.left;
    var y = this.top;

    switch (this.scrollMode) {
        case 0:
            y += this.childOY;
            break;
        case 1:
            x += this.childOY;
            break;

        default:  // xy
            y += this.childOY;
            x += this.childOX;
            break;
    }

    this.child.setPosition(x, y);
    this.resetChildPositionState(this.child);

    this.setMaskChildrenFlag();
};

export default ResetChildPosition;