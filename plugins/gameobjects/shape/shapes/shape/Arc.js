import PathBase from './PathBase.js';
import ArcTo from '../../utils/pathData/ArcTo.js';

class Arc extends PathBase {
    constructor(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        super();

        this.setCenterPosition(x, y);
        this.setRadius(radiusX, radiusY);
        this.setAngle(startAngle, endAngle, anticlockwise);
        this.iterations = 32;
    }

    updateData() {
        this.pathData.length = 0;
        ArcTo(this.x, this.y, this.radiusX, this.radiusY, this.startAngle, this.endAngle, this.anticlockwise, this.iterations, this.pathData);
        super.updateData();
        return this;
    }

    setCenterPosition(x, y) {
        this.isDirty |= (this.x !== x) || (this.y !== y);
        this.x = x;
        this.y = y;
        return this;
    }

    setRadius(radiusX, radiusY) {
        if (radiusY === undefined) {
            radiusY = radiusX;
        }
        this.isDirty |= (this.radiusX !== radiusX) || (this.radiusY !== radiusY);
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        return this;
    }

    setAngle(startAngle, endAngle, anticlockwise) {
        if (anticlockwise === undefined) {
            anticlockwise = false;
        }

        this.isDirty |= (this.startAngle !== startAngle) || (this.endAngle !== endAngle) || (this.anticlockwise !== anticlockwise);
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        return this;
    }
}

export default Arc;