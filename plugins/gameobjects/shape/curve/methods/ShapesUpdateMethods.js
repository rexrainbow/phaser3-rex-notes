import { Lines } from '../../shapes/geoms';
import { BEZIER, SPLINE, POLYLINE, STRAIGHTLINE } from '../Const.js';
import DrawQuadraticBezierCurve from './DrawQuadraticBezierCurve.js';
import DrawCubicBezierCurve from './DrawCubicBezierCurve.js';
import DrawSpinleCurve from './DrawSpinleCurve.js';
import DrawStraightLine from './DrawStraightLine.js';
import DrawPolyLine from './DrawPolyLine.js';
import SetTransform from './SetTransform.js';

export default {
    buildShapes() {
        this
            .addShape(new Lines())
    },

    updateShapes() {
        // Set style
        var lines = this.getShapes()[0]
            .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)

        var points = this.points;

        if ((this.lineType === STRAIGHTLINE) || (points.length == 2)) {
            DrawStraightLine.call(this, lines);
        } else if ((this.lineType === BEZIER) && (points.length === 3)) {
            DrawQuadraticBezierCurve.call(this, lines);
        } else if ((this.lineType === BEZIER) && (points.length === 4)) {
            DrawCubicBezierCurve.call(this, lines);
        } else if (this.lineType === POLYLINE) {
            DrawPolyLine.call(this, lines);
        } else {
            DrawSpinleCurve.call(this, lines);
        }

        SetTransform.call(this, lines);

    }
}