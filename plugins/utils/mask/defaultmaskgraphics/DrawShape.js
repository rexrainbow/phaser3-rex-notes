var DrawShape = function (width, height, padding, originX, originY) {
    this.clear().fillStyle(0xffffff);
    switch (this.shapeType) {
        case 1: // circle
            // Assume that all padding are the same value in this circle shape
            padding = padding.left;
            var radius = Math.min(width, height) / 2;
            this.fillCircle(
                -width * (originX - 0.5),     // centerX
                -height * (originY - 0.5),    // centerY
                radius + padding              // radius
            );
            break;

        default: // 0|'rectangle'
            this.fillRect(
                -(width * originX) - padding.left,      // x
                -(height * originY) - padding.top,      // y
                width + padding.left + padding.right,   // width
                height + padding.top + padding.bottom   // height
            );
            break;
    }
}

export default DrawShape;