import StartAt from '../StartAt.js';
import LineTo from '../LineTo.js';
import ArcTo from '../ArcTo.js';
import QuadraticBezierTo from '../QuadraticBezierTo.js';
import CubicBezierCurveTo from '../CubicBezierCurveTo.js';
import CatmullRomTo from '../CatmullRomTo.js';
import DuplicateLast from '../DuplicateLast.js';

export default {
    clear() {
        this.start();
        return this;
    },

    start() {
        this.startAt();
        return this;
    },

    startAt(x, y) {
        this.restorePathData();
        this.accumulationLengths = undefined;

        StartAt(x, y, this.pathData);
        this.firstPointX = x;
        this.firstPointY = y;
        this.lastPointX = x;
        this.lastPointY = y;

        return this;
    },

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
    },

    verticalLineTo(x, relative) {
        this.lineTo(x, this.lastPointY, relative);
        return this;
    },

    horizontalLineTo(y, relative) {
        this.lineTo(this.lastPointX, y, relative);
        return this;
    },

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

        this.lastPointX = this.pathData[this.pathData.length - 2];
        this.lastPointY = this.pathData[this.pathData.length - 1];
        return this;
    },

    arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
        this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise)
        return this;
    },

    quadraticBezierTo(cx, cy, x, y) {
        QuadraticBezierTo(
            cx, cy, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    },

    cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
        CubicBezierCurveTo(
            cx0, cy0, cx1, cy1, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        return this;
    },

    catmullRomTo(...points) {
        CatmullRomTo(
            points,
            this.iterations,
            this.pathData
        )

        this.lastPointX = points[points.length-2];
        this.lastPointY = points[points.length-1];
        return this;
    },

    close() {
        // Line to first point        
        var startX = this.pathData[0],
            startY = this.pathData[1];
        if ((startX !== this.lastPointX) || (startY !== this.lastPointY)) {
            this.lineTo(startX, startY);
        }

        this.closePath = true;
        return this;
    },

    end() {
        DuplicateLast(this.pathData);
        return this;
    },

}