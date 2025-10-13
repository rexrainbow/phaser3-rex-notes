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
            UpdateEndPoint(head, headPoint.x, headPoint.y, this.headSize, this.headShape);
        }
        if (hasTail) {
            tail
                .fillStyle(this.tailColor, this.tailAlpha)
                .lineStyle(this.tailStrokeWidth, this.tailStrokeColor, this.tailStrokeAlpha)

            var tailPoint = this.points[this.points.length - 1];
            UpdateEndPoint(tail, tailPoint.x, tailPoint.y, this.tailSize, this.tailShape);
        }


        this.bounds = GetBounds.call(this, body.pathData, true);
        SetSizeFromBounds.call(this);

    }
}

var UpdateEndPoint = function (shape, x, y, size, shapeType) {
    var radius = size / 2;

    switch (shapeType) {
        case 1: // DOT
            shape
                .start()
                .arc(x, y, radius, 0, 360)
                .close();
            break;

        case 2: // BOX
            shape
                .startAt(x - radius, y - radius)
                .lineTo(size, 0, true)
                .lineTo(0, size, true)
                .lineTo(-size, 0, true)
                .lineTo(0, -size, true)
                .close();
            break;

        case 3: // DIAMOND
            shape
                .startAt(x, y - radius)
                .lineTo(x + radius, y)
                .lineTo(x, y + radius)
                .lineTo(x - radius, y)
                .close();
            break;

        default: // DOT
            shape
                .start()
                .arc(x, y, radius, 0, 360)
                .close();
            break;
    }
}
