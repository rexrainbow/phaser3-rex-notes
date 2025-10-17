import { Lines } from '../../shapes/geoms/index.js';
import { BEZIER, SPLINE, POLYLINE, STRAIGHTLINE } from '../Const.js';
import DrawQuadraticBezierCurve from './DrawQuadraticBezierCurve.js';
import DrawCubicBezierCurve from './DrawCubicBezierCurve.js';
import DrawSpinleCurve from './DrawSpinleCurve.js';
import DrawStraightLine from './DrawStraightLine.js';
import DrawPolyLine from './DrawPolyLine.js';
import GetBounds from './GetBounds.js';
import BuildEndPoint from './BuildEndPoint.js';
import SetSizeFromBounds from './SetSizeFromBounds.js';

export default {
    buildShapes() {
        var body = new Lines().setName('body');
        var head = new Lines().setName('head');
        var tail = new Lines().setName('tail');

        this
            .addShape(body)
            .addShape(head)
            .addShape(tail)
    },

    updateShapes() {
        var points = this.points;
        var pointCount = points.length;

        // Body
        var hasPath = pointCount >= 2;
        var body = this.getShape('body').setVisible(hasPath);

        if (hasPath) {
            body.lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
            if ((this.lineType === STRAIGHTLINE) || (pointCount == 2)) {
                DrawStraightLine.call(this, body);
            } else if ((this.lineType === BEZIER) && (pointCount === 3)) {
                DrawQuadraticBezierCurve.call(this, body);
            } else if ((this.lineType === BEZIER) && (pointCount === 4)) {
                DrawCubicBezierCurve.call(this, body);
            } else if (this.lineType === POLYLINE) {
                DrawPolyLine.call(this, body);
            } else {
                DrawSpinleCurve.call(this, body);
            }
        }

        // End points
        var hasEndPoint = pointCount >= 1;
        var hasHead = hasEndPoint && (this.headShape !== 0);
        var hasTail = hasEndPoint && (this.tailShape !== 0);
        var head = this.getShape('head').setVisible(hasHead);
        var tail = this.getShape('tail').setVisible(hasTail);

        if (hasHead) {
            head
                .fillStyle(this.headColor, this.headAlpha)
                .lineStyle(this.headStrokeWidth, this.headStrokeColor, this.headStrokeAlpha)

            var headPoint = this.points[0];
            var prevPoint;
            if (pointCount >= 2) {
                if (this.lineType === STRAIGHTLINE) {
                    prevPoint = this.points[pointCount - 1];
                } else {
                    prevPoint = this.points[1];
                }
            } else {
                prevPoint = headPoint;
            }
            BuildEndPoint(head,
                headPoint.x, headPoint.y,
                prevPoint.x, prevPoint.y,
                this.headSize, this.headShape
            );
        }
        if (hasTail) {
            tail
                .fillStyle(this.tailColor, this.tailAlpha)
                .lineStyle(this.tailStrokeWidth, this.tailStrokeColor, this.tailStrokeAlpha)

            var tailPoint = this.points[pointCount - 1];

            var prevPoint;
            if (this.lineType === STRAIGHTLINE) {
                prevPoint = this.points[0];
            } else {
                prevPoint = this.points[pointCount - 2];
            }
            BuildEndPoint(tail,
                tailPoint.x, tailPoint.y,
                prevPoint.x, prevPoint.y,
                this.tailSize, this.tailShape
            );
        }


        this.bounds = GetBounds.call(this, body.pathData, true);
        SetSizeFromBounds.call(this);

    }
}
