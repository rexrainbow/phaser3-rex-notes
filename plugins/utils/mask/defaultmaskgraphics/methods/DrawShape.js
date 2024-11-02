import GetGeom from './GetGeom.js';

var DrawShape = function (width, height, padding, originX, originY) {
    this.geom = GetGeom(this.shapeType, width, height, padding, originX, originY, this.geom);

    this.clear().fillStyle(0xffffff);
    switch (this.shapeType) {
        case 1: // circle
            // Assume that all padding are the same value in this circle shape
            this.fillCircleShape(this.geom);
            break;

        default: // 0|'rectangle'
            this.fillRectShape(this.geom);
            break;
    }
}

export default DrawShape;