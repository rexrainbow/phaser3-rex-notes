import BaseShapes from '../shapes/BaseShapes.js';
import Methods from './methods/Methods.js';
import { CurveTypes } from './Const.js';

class Line extends BaseShapes {
    constructor(scene, points, lineWidth, color, alpha, config) {
        var lineType, pointRadius;
        var headShape, headSize, headColor, headAlpha, headStrokeWidth, headStrokeColor, headStrokeAlpha;
        var tailShape, tailSize, tailColor, tailAlpha, tailStrokeWidth, tailStrokeColor, tailStrokeAlpha;
        if (points !== undefined) {
            if (typeof (points) === 'number') {
                lineType = alpha
                alpha = color;
                color = lineWidth;
                lineWidth = points;
                points = [];
            } else if (!Array.isArray(points)) {
                config = points;
                points = config.points;
                lineWidth = config.lineWidth;
                color = config.color;
                alpha = config.alpha;

            }
        }

        if (config === undefined) { config = {}; }

        lineType = config.lineType;
        pointRadius = config.pointRadius;

        headShape = config.headShape;
        headSize = config.headSize;
        headColor = config.headColor;
        headAlpha = config.headAlpha;
        headStrokeWidth = config.headStrokeWidth;
        headStrokeColor = config.headStrokeColor;
        headStrokeAlpha = config.headStrokeAlpha;

        tailShape = config.tailShape;
        tailSize = config.tailSize;
        tailColor = config.tailColor;
        tailAlpha = config.tailAlpha;
        tailStrokeWidth = config.tailStrokeWidth;
        tailStrokeColor = config.tailStrokeColor;
        tailStrokeAlpha = config.tailStrokeAlpha;


        if (points === undefined) { points = []; }
        if (lineWidth === undefined) { lineWidth = 2; }
        if (color === undefined) { color = 0xffffff; }
        if (alpha === undefined) { alpha = 1; }
        if (lineType === undefined) { lineType = 0; }
        if (pointRadius === undefined) { pointRadius = 10; }

        if (headShape === undefined) { headShape = 0 };
        if (headSize === undefined) { headSize = lineWidth * 5; }
        if (headColor === undefined) { headColor = color; }
        if (headStrokeWidth === undefined) { headStrokeWidth = 1; }

        if (tailShape === undefined) { tailShape = 0 };
        if (tailSize === undefined) { tailSize = headSize; }
        if (tailColor === undefined) { tailColor = color; }
        if (tailStrokeWidth === undefined) { tailStrokeWidth = 1; }

        super(scene);
        this.type = 'rexLine';

        this.points = [];
        this.padding = {};
        this.bounds = undefined;

        this.setPointRadius(pointRadius);
        this.setLine(points, lineType);
        this.setStrokeStyle(lineWidth, color, alpha);

        this.setHeadShape(headShape);
        this.setHeadSize(headSize);
        this.setHeadFillStyle(headColor, headAlpha);
        this.setHeadStrokeStyle(headStrokeWidth, headStrokeColor, headStrokeAlpha);

        this.setTailShape(tailShape);
        this.setTailSize(tailSize);
        this.setTailFillStyle(tailColor, tailAlpha);
        this.setTailStrokeStyle(tailStrokeWidth, tailStrokeColor, tailStrokeAlpha);

        this.buildShapes();

        this.updateData();
    }

    setLine(points, lineType) {
        if (points === undefined) {
            points = [];
        }
        if (lineType !== undefined) {
            if (typeof (lineType) === 'string') {
                lineType = CurveTypes[lineType.toLocaleLowerCase()];
            }
            this.lineType = lineType;
        }

        this.points.length = 0;

        var x = 0, y = 0;
        if (points.length > 0) {
            x = points[0].x;
            y = points[0].y;
        }
        this.x = x;
        this.y = y;

        for (var i = 0, cnt = points.length; i < cnt; i++) {
            var p = points[i];
            this.points.push({
                x: p.x - x,
                y: p.y - y
            })
        }

        this.dirty = true;

        if (this.geom.length > 0) {
            this.updateData()
        }

        return this;
    }

    setLineType(lineType) {
        if (typeof (lineType) === 'string') {
            lineType = CurveTypes[lineType.toLocaleLowerCase()];
        }
        if (this.lineType === lineType) {
            return this;
        }
        this.lineType = lineType;
        this.dirty = true;

        if (this.geom.length > 0) {
            this.updateData()
        }

        return this;
    }

    getPoints(out) {
        if (out === undefined) {
            out = [];
        }
        var x = this.x;
        var y = this.y;
        var points = this.points;
        for (var i = 0, cnt = points.length; i < cnt; i++) {
            var p = points[i]
            out.push({
                x: p.x + x,
                y: p.y + y,
            })
        }

        return out;
    }
}

Object.assign(
    Line.prototype,
    Methods
)

export default Line;