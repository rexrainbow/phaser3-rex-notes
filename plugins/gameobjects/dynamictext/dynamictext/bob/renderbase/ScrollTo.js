var ScrollTo = function () {
    var textObject = this.parent;
    var textObjectLeftX = 0,
        textObjectRightX = textObject.width,
        textObjectTopY = 0,
        textObjectBottomY = textObject.height;

    var childX = this.drawX,
        childY = this.drawY;
    var childLeftX = childX + this.drawTLX,
        childRightX = childX + this.drawTRX,
        childTopY = childY + this.drawTLY,
        childBottomY = childY + this.drawTRY;

    var dx;
    if (childLeftX < textObjectLeftX) {
        dx = textObjectLeftX - childLeftX;
    } else if (childRightX > textObjectRightX) {
        dx = textObjectRightX - childRightX;
    } else {
        dx = 0;
    }

    var dy;
    if (childTopY < textObjectTopY) {
        dy = textObjectTopY - childTopY;
    } else if (childBottomY > textObjectBottomY) {
        dy = textObjectBottomY - childBottomY;
    } else {
        dy = 0;
    }

    textObject._textOX += dx;
    textObject._textOY += dy;

    return this;
}

export default ScrollTo;