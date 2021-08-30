import StartAt from './StartAt.js';
import LineTo from './LineTo.js';
import ArcTo from './ArcTo.js';
import QuadraticBezierTo from './QuadraticBezierTo.js';
import CubicBezierCurveTo from './QuadraticBezierTo.js';
import RotateAround from './RotateAround.js';
import Offset from './Offset.js';
import ToPoints from './ToPoints.js';
import ToPolygon from './ToPolygon.js';

const DegToRad = Phaser.Math.DegToRad;

class PathData {
    constructor(pathData) {
        if (pathData === undefined) {
            pathData = [];
        }

        this.pathData = pathData;
        this.closePath = false;
        this.setIterations(32);

        this.lastPointX = undefined;
        this.lastPointY = undefined;
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    startAt(x, y) {
        StartAt(x, y, this.pathData);
        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    }

    lineTo(x, y, relative) {
        if (relative === undefined) {
            relative = false;
        }
        if (relative) {
            x += this.lastPointX;
            y += this.lastPointY;
        }

        LineTo(x, y, this.pathData);

        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    }

    verticalLineTo(x, relative) {
        this.lineTo(x, this.lastPointY, relative);
        return this;
    }

    horizontalLineTo(y, relative) {
        this.lineTo(this.lastPointX, y, relative);
        return this;
    }

    ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === undefined) {
            anticlockwise = false;
        }

        ArcTo(
            centerX, centerY,
            radiusX, radiusY,
            startAngle, endAngle, anticlockwise,
            this.iterations,
            this.pathData
        );

        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];
        return this;
    }

    arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
        this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise)
        return this;
    }

    quadraticBezierTo(cx, cy, x, y) {
        QuadraticBezierTo(
            cx, cy, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx;
        this.lastCY = cy;
        return this;
    }

    smoothQuadraticBezierTo(x, y) {
        var cx = this.lastPointX * 2 - this.lastCX;
        var cy = this.lastPointY * 2 - this.lastCY;
        this.quadraticBezierTo(cx, cy, x, y);
        return this;
    }

    cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y) {
        CubicBezierCurveTo(
            cx0, cy0, cx1, cy1, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx1;
        this.lastCY = cy1;
        return this;
    }

    smoothCubicBezierCurveTo(cx1, cy1, x, y) {
        var cx0 = this.lastPointX * 2 - this.lastCX;
        var cy0 = this.lastPointY * 2 - this.lastCY;
        this.cubicBezierCurveTo(cx0, cy0, cx1, cy1, x, y);
        return this;
    }

    close() {
        this.closePath = true;
        return this;
    }

    rotateAround(centerX, centerY, angle) {
        if (this.pathData.length === 0) {
            return this;
        }

        angle = DegToRad(angle);

        RotateAround(centerX, centerY, angle, this.pathData);

        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];
        if (this.lastCX !== undefined) {
            var point = {
                x: this.lastCX,
                y: this.lastCY
            }
            PointRotateAround(point, centerX, centerY, angle);
            this.lastCX = point.x;
            this.lastCY = point.y;
        }
        return this;
    }

    offset(x, y) {
        Offset(x, y, this.pathData);
        return this;
    }

    toPoints() {
        return ToPoints(this.pathData);
    }

    toPolygon(polygon) {
        return ToPolygon(this.pathData, polygon);
    }

    draw(graphics, isFill, isStroke) {
        var points = this.toPoints();
        if (isFill) {
            graphics.fillPoints(points, this.closePath, this.closePath);
        }
        if (isStroke) {
            graphics.strokePoints(points, this.closePath, this.closePath);
        }

        return this;
    }

}

export default PathData;