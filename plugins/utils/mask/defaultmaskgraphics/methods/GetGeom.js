const RectangleGeom = Phaser.Geom.Rectangle;
const CircleGemo = Phaser.Geom.Circle;

var GetGeom = function (shapeType, width, height, padding, originX, originY, out) {
    switch (shapeType) {
        case 1: // circle
            // Assume that all padding are the same value in this circle shape
            padding = padding.left;
            var centerX = -width * (originX - 0.5);
            var centerY = -height * (originY - 0.5);
            var radius = Math.min(width, height) / 2 + padding;

            if ((out === undefined) || !(out instanceof (CircleGemo))) {
                out = new CircleGemo();
            }
            out.setTo(centerX, centerY, radius);
            break;

        default: // 0|'rectangle'
            var topLeftX = -(width * originX) - padding.left;
            var topLeftY = -(height * originY) - padding.top;
            var rectWidth = width + padding.left + padding.right;
            var rectHeight = height + padding.top + padding.bottom;

            if ((out === undefined) || !(out instanceof (RectangleGeom))) {
                out = new RectangleGeom();
            }
            out.setTo(topLeftX, topLeftY, rectWidth, rectHeight);
            break;
    }

    return out;
}

export default GetGeom;