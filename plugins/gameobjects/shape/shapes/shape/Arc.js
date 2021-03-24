import PathBase from './PathBase.js';
import ArcTo from '../../utils/pathData/ArcTo.js';

class Arc extends PathBase {
    constructor(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === undefined) {
            anticlockwise = false;
        }

        super();

        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        this.iterations = 32;
    }

    updateData() {
        this.pathData.length = 0;
        ArcTo(this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, this.iterations, this.pathData);
        super.updateData();
        return this;
    }
}

export default Arc;