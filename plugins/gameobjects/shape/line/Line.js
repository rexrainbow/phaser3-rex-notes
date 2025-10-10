import BaseShapes from '../shapes/BaseShapes.js';
import Methods from './methods/Methods.js';
import { BEZIER, SPLINE, POLYLINE, STRAIGHTLINE } from './Const.js';

class Line extends BaseShapes {
    constructor(scene, points, lineWidth, color, alpha, lineType) {
        var pointRadius;
        if (points !== undefined) {
            if (typeof (points) === 'number') {
                lineType = alpha
                alpha = color;
                color = lineWidth;
                lineWidth = points;
                points = [];
            } else if (!Array.isArray(points)) {
                var config = points;
                points = config.points;
                lineWidth = config.lineWidth;
                color = config.color;
                alpha = config.alpha;
                lineType = config.lineType;
                pointRadius = config.pointRadius;
            }
        }

        if (points === undefined) { points = []; }
        if (lineWidth === undefined) { lineWidth = 2; }
        if (color === undefined) { color = 0xffffff; }
        if (alpha === undefined) { alpha = 1; }
        if (lineType === undefined) { lineType = 0; }
        if (pointRadius === undefined) { pointRadius = 10; }

        super(scene);
        this.type = 'rexLine';

        this.points = [];
        this.padding = {};
        this.bounds = undefined;

        this.setPointRadius(pointRadius);
        this.setLine(points, lineType);
        this.setStrokeStyle(lineWidth, color, alpha);

        this.buildShapes();

        this.updateData();
    }

    setLine(points, lineType) {
        if (points === undefined) {
            points = [];
        }
        if (lineType !== undefined) {
            if (typeof (lineType) === 'string') {
                lineType = CURVETYPE_MAP[lineType.toLocaleLowerCase()];
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
            lineType = CURVETYPE_MAP[lineType.toLocaleLowerCase()];
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

const CURVETYPE_MAP = {
    bezier: BEZIER,

    spline: SPLINE,

    polyline: POLYLINE,
    poly: POLYLINE,

    straightline: STRAIGHTLINE,
    straight: STRAIGHTLINE,
}

Object.assign(
    Line.prototype,
    Methods
)

export default Line;