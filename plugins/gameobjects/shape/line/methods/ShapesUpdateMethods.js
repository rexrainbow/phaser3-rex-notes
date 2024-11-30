import { Lines } from '../../shapes/geoms/index.js';
import { BEZIER, SPLINE, POLYLINE, STRAIGHTLINE } from '../Const.js';
import DrawQuadraticBezierCurve from './DrawQuadraticBezierCurve.js';
import DrawCubicBezierCurve from './DrawCubicBezierCurve.js';
import DrawSpinleCurve from './DrawSpinleCurve.js';
import DrawStraightLine from './DrawStraightLine.js';
import DrawPolyLine from './DrawPolyLine.js';
import GetBounds from './GetBounds.js';
import SetSizeFromBounds from './SetSizeFromBounds.js';

export default {
    buildShapes() {
        this
            .addShape(new Lines())
    },

    updateShapes() {
        // Set style
        var line = this.getShapes()[0]
            .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)

        var points = this.points;
        var pointCount = points.length;

        line.setVisible(pointCount >= 2);

        if (pointCount <= 1) {
            return;
        }

        if ((this.lineType === STRAIGHTLINE) || (pointCount == 2)) {
            DrawStraightLine.call(this, line);
        } else if ((this.lineType === BEZIER) && (pointCount === 3)) {
            DrawQuadraticBezierCurve.call(this, line);
        } else if ((this.lineType === BEZIER) && (pointCount === 4)) {
            DrawCubicBezierCurve.call(this, line);
        } else if (this.lineType === POLYLINE) {
            DrawPolyLine.call(this, line);
        } else {
            DrawSpinleCurve.call(this, line);
        }

        this.bounds = GetBounds.call(this, line.pathData, true);
        SetSizeFromBounds.call(this, line);
    }
}