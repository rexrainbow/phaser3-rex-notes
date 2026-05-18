import StartAt from '../StartAt';
import LineTo from '../LineTo';
import ArcTo from '../ArcTo';
import QuadraticBezierTo from '../QuadraticBezierTo';
import CubicBezierCurveTo from '../CubicBezierCurveTo';
import CatmullRomTo from '../CatmullRomTo';
import DuplicateLast from '../DuplicateLast';

const ControlTypeQuadratic = 'quadratic';
const ControlTypeCubic = 'cubic';

var WarnPathTypeMismatch = function(methodName?: any, expectedControlType?: any) {
    if (!this.pathTypeMismatchWarningEnable) {
        return;
    }

    if ((typeof console === 'undefined') || !console.warn) {
        return;
    }

    console.warn(
        methodName +
        ' path type mismatch: expected previous control type to be ' +
        expectedControlType +
        ', got ' +
        (this.lastControlType || 'none') +
        '. Falling back to current point as control point.'
    );
}

export default {
    clear() {
        this.start();
        return this;
    },

    start() {
        this.startAt();
        return this;
    },

    startAt(x?: any, y?: any) {
        this.restorePathData();
        this.accumulationLengths = undefined;

        StartAt(x, y, this.pathData);
        this.firstPointX = x;
        this.firstPointY = y;
        this.lastPointX = x;
        this.lastPointY = y;
        this.resetControlPoint();

        return this;
    },

    lineTo(x?: any, y?: any, relative?: any) {
        if (relative === undefined) {
            relative = false;
        }
        if (relative?: any) {
            x += this.lastPointX;
            y += this.lastPointY;
        }

        LineTo(x, y, this.pathData);

        this.lastPointX = x;
        this.lastPointY = y;
        this.resetControlPoint();
        return this;
    },

    verticalLineTo(x?: any, relative?: any) {
        this.lineTo(x, this.lastPointY, relative);
        return this;
    },

    horizontalLineTo(y?: any, relative?: any) {
        this.lineTo(this.lastPointX, y, relative);
        return this;
    },

    ellipticalArc(centerX?: any, centerY?: any, radiusX?: any, radiusY?: any, startAngle?: any, endAngle?: any, anticlockwise?: any) {
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
        this.resetControlPoint();
        return this;
    },

    arc(centerX?: any, centerY?: any, radius?: any, startAngle?: any, endAngle?: any, anticlockwise?: any) {
        this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise)
        return this;
    },

    quadraticBezierTo(cx?: any, cy?: any, x?: any, y?: any) {
        QuadraticBezierTo(
            cx, cy, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx;
        this.lastCY = cy;
        this.lastControlType = ControlTypeQuadratic;
        return this;
    },

    smoothQuadraticBezierTo(x?: any, y?: any) {
        var cx, cy;
        if (this.lastControlType === ControlTypeQuadratic) {
            cx = this.lastPointX * 2 - this.lastCX;
            cy = this.lastPointY * 2 - this.lastCY;
        } else {
            WarnPathTypeMismatch.call(
                this,
                'smoothQuadraticBezierTo()',
                ControlTypeQuadratic
            );
            cx = this.lastPointX;
            cy = this.lastPointY;
        }

        this.quadraticBezierTo(cx, cy, x, y);
        return this;
    },

    cubicBezierTo(cx0?: any, cy0?: any, cx1?: any, cy1?: any, x?: any, y?: any) {
        CubicBezierCurveTo(
            cx0, cy0, cx1, cy1, x, y,
            this.iterations,
            this.pathData
        );

        this.lastPointX = x;
        this.lastPointY = y;
        this.lastCX = cx1;
        this.lastCY = cy1;
        this.lastControlType = ControlTypeCubic;
        return this;
    },

    smoothCubicBezierTo(cx1?: any, cy1?: any, x?: any, y?: any) {
        var cx0, cy0;
        if (this.lastControlType === ControlTypeCubic) {
            cx0 = this.lastPointX * 2 - this.lastCX;
            cy0 = this.lastPointY * 2 - this.lastCY;
        } else {
            WarnPathTypeMismatch.call(
                this,
                'smoothCubicBezierTo()',
                ControlTypeCubic
            );
            cx0 = this.lastPointX;
            cy0 = this.lastPointY;
        }

        this.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);
        return this;
    },

    catmullRomTo(...points) {
        CatmullRomTo(
            points,
            this.iterations,
            this.pathData
        )

        this.lastPointX = points[points.length - 2];
        this.lastPointY = points[points.length - 1];
        this.resetControlPoint();
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
        this.resetControlPoint();
        return this;
    },

    end() {
        DuplicateLast(this.pathData);
        this.resetControlPoint();
        return this;
    },

}