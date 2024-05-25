import PolygnBase from '../roundrectangle/PolygnBase.js';
import PointMethods from './methods/PointMethods.js';
import QuadGeom from './methods/QuadGeom.js';
import LineTo from '../../../geom/pathdata/LineTo.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;
const Linear = Phaser.Math.Linear;
const Earcut = Phaser.Geom.Polygon.Earcut;

class Quad extends PolygnBase {
    constructor(scene, x, y, width, height, fillColor, fillAlpha) {
        var strokeColor, strokeAlpha, strokeWidth;
        if (IsPlainObject(x)) {
            var config = x;

            x = config.x;
            y = config.y;
            width = config.width;
            height = config.height;
            fillColor = config.color;
            fillAlpha = config.alpha;

            strokeColor = config.strokeColor;
            strokeAlpha = config.strokeAlpha;
            strokeWidth = config.strokeWidth;
        }

        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 1; }
        if (height === undefined) { height = width; }

        var geom = new QuadGeom();  // Configurate it later
        super(scene, 'rexQuadShape', geom);

        geom.setTo(0, 0, width, height);

        this.setPosition(x, y);

        this.setFillStyle(fillColor, fillAlpha);

        if ((strokeColor !== undefined) && (strokeWidth === undefined)) {
            strokeWidth = 2;
        }
        this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

        this
            .setTLPosition(GetValue(config, 'tlx', 0), GetValue(config, 'tly', 0))
            .setTRPosition(GetValue(config, 'trx', 0), GetValue(config, 'try', 0))
            .setBLPosition(GetValue(config, 'blx', 0), GetValue(config, 'bly', 0))
            .setBRPosition(GetValue(config, 'brx', 0), GetValue(config, 'bry', 0))

        var leftSidePoints = GetValue(config, 'leftSidePoints');
        if (leftSidePoints) {
            this.insertLeftSidePoint(leftSidePoints);
        }
        var topSidePoints = GetValue(config, 'topSidePoints');
        if (topSidePoints) {
            this.insertTopSidePoint(topSidePoints);
        }
        var rightSidePoints = GetValue(config, 'rightSidePoints');
        if (rightSidePoints) {
            this.insertRightSidePoint(rightSidePoints);
        }
        var bottomSidePoints = GetValue(config, 'bottomSidePoints');
        if (bottomSidePoints) {
            this.insertBottomSidePoint(bottomSidePoints);
        }


        this.updateDisplayOrigin();
        this.dirty = true;
    }

    updateData() {
        var geom = this.geom;
        var pathData = this.pathData;
        pathData.length = 0;

        var width = geom.width;
        var height = geom.height;
        var tlx = 0 + geom.tlx;
        var tly = 0 + geom.tly;
        var trx = width + geom.trx;
        var try_ = 0 + geom.try;
        var brx = width + geom.brx;
        var bry = height + geom.bry;
        var blx = 0 + geom.blx;
        var bly = height + geom.bly;
        var topSidePoints = geom.topSidePoints;
        var rightSidePoints = geom.rightSidePoints;
        var bottomSidePoints = geom.bottomSidePoints;
        var leftSidePoints = geom.leftSidePoints;

        // Top side
        LineTo(tlx, tly, pathData);
        SortPoints(topSidePoints);
        for (var i = 0, cnt = topSidePoints.length; i < cnt; i++) {
            var point = topSidePoints[i];
            var px = Linear(tlx, trx, point.t) + point.x;
            var py = Linear(tly, try_, point.t) + point.y;
            LineTo(px, py, pathData);
        }

        // Right side
        LineTo(trx, try_, pathData);
        SortPoints(rightSidePoints);
        for (var i = 0, cnt = rightSidePoints.length; i < cnt; i++) {
            var point = rightSidePoints[i];
            var px = Linear(trx, brx, point.t) + point.x;
            var py = Linear(try_, bry, point.t) + point.y;
            LineTo(px, py, pathData);
        }

        // Bottom side
        LineTo(brx, bry, pathData);
        SortPoints(bottomSidePoints);
        for (var i = bottomSidePoints.length - 1; i >= 0; i--) {
            var point = bottomSidePoints[i];
            var px = Linear(blx, brx, point.t) + point.x;
            var py = Linear(bly, bry, point.t) + point.y;
            LineTo(px, py, pathData);
        }

        // Left side
        LineTo(blx, bly, pathData);
        SortPoints(leftSidePoints);
        for (var i = leftSidePoints.length - 1; i >= 0; i--) {
            var point = leftSidePoints[i];
            var px = Linear(tlx, blx, point.t) + point.x;
            var py = Linear(tly, bly, point.t) + point.y;
            LineTo(px, py, pathData);
        }

        pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
        this.pathIndexes = Earcut(pathData);

        return this;
    }

    get tlx() {
        return this.geom.tlx;
    }

    set tlx(value) {
        this.geom.tlx = value;
        this.dirty = true;
    }

    get tly() {
        return this.geom.tly;
    }

    set tly(value) {
        this.geom.tly = value;
        this.dirty = true;
    }

    get trx() {
        return this.geom.trx;
    }

    set trx(value) {
        this.geom.trx = value;
        this.dirty = true;
    }

    get try() {
        return this.geom.try;
    }

    set try(value) {
        this.geom.try = value;
        this.dirty = true;
    }

    get blx() {
        return this.geom.blx;
    }

    set blx(value) {
        this.geom.blx = value;
        this.dirty = true;
    }

    get bly() {
        return this.geom.bly;
    }

    set bly(value) {
        this.geom.bly = value;
        this.dirty = true;
    }

    get brx() {
        return this.geom.brx;
    }

    set brx(value) {
        this.geom.brx = value;
        this.dirty = true;
    }

    get bry() {
        return this.geom.bry;
    }

    set bry(value) {
        this.geom.bry = value;
        this.dirty = true;
    }

    get leftSidePoints() {
        return this.geom.leftSidePoints;
    }

    get topSidePoints() {
        return this.geom.topSidePoints;
    }

    get bottomSidePoints() {
        return this.geom.bottomSidePoints;
    }

    get rightSidePoints() {
        return this.geom.rightSidePoints;
    }
}

var SortPoints = function (points) {
    if (points.length <= 1) {
        return;
    }
    points.sort(function (pointA, pointB) {
        return pointA.t - pointB.t;
    })
}

Object.assign(
    Quad.prototype,
    PointMethods,
)

export default Quad;