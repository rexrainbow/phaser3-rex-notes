import PathBase from './PathBase.js';

const RotateAround = Phaser.Math.RotateAround;
const QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;
const CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;

class Lines extends PathBase {
    constructor() {
        super();
        this.setIterations(32);
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

    startAt(x, y) {
        this.dirty = true;
        this.pathData.length = 0;
        this.pathData.push(x, y);
        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    }

    lineTo(x, y) {
        this.dirty = true;
        this.pathData.push(x, y);
        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    }

    quadraticBezierTo(cx, cy, x, y) {
        this.dirty = true;
        var p0x = this.lastPointX;
        var p0y = this.lastPointY;
        for (var i = 1, last = this.iterations - 1; i <= last; i++) {
            var t = i / last;
            this.pathData.push(
                QuadraticBezierInterpolation(t, p0x, cx, x),
                QuadraticBezierInterpolation(t, p0y, cy, y)
            );
        }

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx;
        this.lastCY = cy;
        return this;
    }

    smoothQuadraticBezierTo(x, y) {
        var cx = this.lastPointX * 2 - this.lastCX;
        var cy = this.lastPointY * 2 - this.lastCY;

        return this.quadraticBezierTo(cx, cy, x, y);
    }

    cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
        this.dirty = true;
        var p0x = this.lastPointX;
        var p0y = this.lastPointY;
        for (var i = 1, last = this.iterations - 1; i <= last; i++) {
            var t = i / last;
            this.pathData.push(
                CubicBezierInterpolation(t, p0x, cx0, cx1, x),
                CubicBezierInterpolation(t, p0y, cy0, cy1, y)
            );
        }

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx1;
        this.lastCY = cy1;
        return this;
    }

    smoothCubicBezierCurveTo(cx1, cy1, x, y) {
        var cx0 = this.lastPointX * 2 - this.lastCX;
        var cy0 = this.lastPointY * 2 - this.lastCY;

        return this.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
    }

    close() {
        this.dirty = true;
        this.closePath = true;
        return this;
    }

    rotateAround(x, y, angle) {
        if (this.pathData.length === 0) {
            return this;
        }

        var point = { x: 0, y: 0 };
        for (var i = 0, cnt = this.pathData.length - 1; i < cnt; i += 2) {
            point.x = this.pathData[i];
            point.y = this.pathData[i + 1];
            RotateAround(point, x, y, angle);
            this.pathData[i] = point.x;
            this.pathData[i + 1] = point.y;
        }

        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];
        if (this.lastCX !== undefined) {
            point.x = this.lastCX;
            point.y = this.lastCY;
            RotateAround(point, x, y, angle);
            this.lastCX = point.x;
            this.lastCY = point.y;
        }
        return this;
    }
}

export default Lines;