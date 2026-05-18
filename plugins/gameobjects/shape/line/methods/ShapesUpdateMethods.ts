import { Lines } from '../../shapes/geoms/index';
import { BEZIER, SPLINE, POLYLINE, STRAIGHTLINE } from '../Const';
import DrawQuadraticBezierCurve from './DrawQuadraticBezierCurve';
import DrawCubicBezierCurve from './DrawCubicBezierCurve';
import DrawSpinleCurve from './DrawSpinleCurve';
import DrawStraightLine from './DrawStraightLine';
import DrawPolyLine from './DrawPolyLine';
import GetBounds from './GetBounds';
import BuildEndPoint from './BuildEndPoint';
import SetSizeFromBounds from './SetSizeFromBounds';

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

        if (hasPath?: any) {
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

        if (hasHead?: any) {
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
        if (hasTail?: any) {
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

        if (hasPath?: any) {
            body.setDashPattern(this.dashPattern, this.dashOffset);
        }
    }
}