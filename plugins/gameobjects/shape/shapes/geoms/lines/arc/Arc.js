import PathBase from '../PathBase.js';
import ArcTo from '../../../../utils/pathData/ArcTo.js';

class Arc extends PathBase {
    constructor(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        super();

        this.setCenterPosition(x, y);
        this.setRadius(radiusX, radiusY);
        this.setAngle(startAngle, endAngle, anticlockwise);
        this.setIterations(32);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.dirty = this.dirty || (this._x !== value);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.dirty = this.dirty || (this._y !== value);
        this._y = value;
    }

    setCenterPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    get radiusX() {
        return this._radiusX;
    }

    set radiusX(value) {
        this.dirty = this.dirty || (this._radiusX !== value);
        this._radiusX = value;
    }

    get radiusY() {
        return this._radiusY;
    }

    set radiusY(value) {
        this.dirty = this.dirty || (this._radiusY !== value);
        this._radiusY = value;
    }

    setRadius(radiusX, radiusY) {
        if (radiusY === undefined) {
            radiusY = radiusX;
        }
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        return this;
    }

    get startAngle() {
        return this._startAngle;
    }

    set startAngle(value) {
        this.dirty = this.dirty || (this._startAngle !== value);
        this._startAngle = value;
    }

    get endAngle() {
        return this._endAngle;
    }

    set endAngle(value) {
        this.dirty = this.dirty || (this._endAngle !== value);
        this._endAngle = value;
    }

    get anticlockwise() {
        return this._anticlockwise;
    }

    set anticlockwise(value) {
        this.dirty = this.dirty || (this._anticlockwise !== value);
        this._anticlockwise = value;
    }

    setAngle(startAngle, endAngle, anticlockwise) {
        // startAngle, endAngle in degrees
        if (anticlockwise === undefined) {
            anticlockwise = false;
        }

        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        return this;
    }

    get iterations() {
        return this._iterations;
    }

    set iterations(value) {
        this.dirty = this.dirty || (this._iterations !== value);
        this._iterations = value;
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        ArcTo(
            this.x, this.y,
            this.radiusX, this.radiusY,
            this.startAngle, this.endAngle, this.anticlockwise,
            this.iterations,
            this.pathData
        );
        this.pathData.push(this.pathData[0], this.pathData[1]);
        super.updateData();
        return this;
    }
}

export default Arc;