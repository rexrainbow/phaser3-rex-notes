import PathBase from './PathBase.js';

class Curve extends PathBase {
    constructor(curve) {
        super();
        this.setCurve(curve);
        this.iterations = 32;
    }

    setCurve(curve) {
        this.dirty = this.dirty || (this.curve !== curve);
        this.curve = curve;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        var points = this.curve.getPoints(this.iterations);
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            this.pathData.push(points[i].x, points[i].y);
        }
        this.pathData.push(points[0].x, points[0].y);

        super.updateData();
        return this;
    }
}

export default Curve;