var ScrollToBob = function (bob) {
    var textObject = bob.parent;
    var textObjectLeftX = 0,
        textObjectRightX = textObject.width,
        textObjectTopY = 0,
        textObjectBottomY = textObject.height;

    var childX = bob.drawX,
        childY = bob.drawY;
    var childLeftX = childX + bob.drawTLX,
        childRightX = childX + bob.drawTRX,
        childTopY = childY + bob.drawTLY,
        childBottomY = childY + bob.drawBLY;

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

}

export default ScrollToBob;
