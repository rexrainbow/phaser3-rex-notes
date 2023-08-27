var ScrollTo = function () {
    var textObject = this.parent;
    var dx, dy;

    var childLeftX = this.drawX + this.drawTLX;
    var childRightX = childLeftX + this.width;
    if (childLeftX < 0) {
        dx = 0 - childLeftX;
    } else if (childRightX > textObject.width) {
        dx = textObject.width - childRightX;
    } else {
        dx = 0;
    }

    var childTopY = this.drawY + this.drawTLY;
    var childBottomY = childTopY + this.height;
    if (childTopY < 0) {
        dy = 0 - childTopY;
    } else if (childBottomY > textObject.height) {
        dy = textObject.height - childBottomY;
    } else {
        dy = 0;
    }

    textObject._textOX += dx;
    textObject._textOY += dy;

    return this;
}

export default ScrollTo;