(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadshapeplugin = factory());
})(this, (function () { 'use strict';

    /*
    src: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$1 = Phaser.Renderer.WebGL.Utils;

    var FillPathWebGL = function (pipeline, calcMatrix, src, alpha, dx, dy)
    {
        var fillTintColor = Utils$1.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);

        var path = src.pathData;
        var pathIndexes = src.pathIndexes;

        for (var i = 0; i < pathIndexes.length; i += 3)
        {
            var p0 = pathIndexes[i] * 2;
            var p1 = pathIndexes[i + 1] * 2;
            var p2 = pathIndexes[i + 2] * 2;

            var x0 = path[p0 + 0] - dx;
            var y0 = path[p0 + 1] - dy;
            var x1 = path[p1 + 0] - dx;
            var y1 = path[p1 + 1] - dy;
            var x2 = path[p2 + 0] - dx;
            var y2 = path[p2 + 1] - dy;

            var tx0 = calcMatrix.getX(x0, y0);
            var ty0 = calcMatrix.getY(x0, y0);
            var tx1 = calcMatrix.getX(x1, y1);
            var ty1 = calcMatrix.getY(x1, y1);
            var tx2 = calcMatrix.getX(x2, y2);
            var ty2 = calcMatrix.getY(x2, y2);

            pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
        }
    };

    /*
    src: {
        strokeColor,
        strokeAlpha,
        pathData,
        lineWidth,
        closePath
    }
    */
    var Utils = Phaser.Renderer.WebGL.Utils;

    var StrokePathWebGL = function (pipeline, src, alpha, dx, dy)
    {
        var strokeTint = pipeline.strokeTint;
        var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);

        strokeTint.TL = strokeTintColor;
        strokeTint.TR = strokeTintColor;
        strokeTint.BL = strokeTintColor;
        strokeTint.BR = strokeTintColor;

        var path = src.pathData;
        var pathLength = path.length - 1;
        var lineWidth = src.lineWidth;
        var halfLineWidth = lineWidth / 2;

        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        if (!src.closePath)
        {
            pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2)
        {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;

            pipeline.batchLine(
                px1,
                py1,
                px2,
                py2,
                halfLineWidth,
                halfLineWidth,
                lineWidth,
                i - 2,
                (src.closePath) ? (i === pathLength - 1) : false
            );

            px1 = px2;
            py1 = py2;
        }
    };

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var PolygonWebGLRenderer = function (renderer, src, camera, parentMatrix) {    
        if (src.dirty) {
            src.updateData();
            src.dirty = false;
        }

        camera.addToRenderList(src);

        var pipeline = renderer.pipelines.set(src.pipeline);

        var result = GetCalcMatrix(src, camera, parentMatrix);

        var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = camera.alpha * src.alpha;

        renderer.pipelines.preBatch(src);

        if (src.isFilled) {
            FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy);
        }

        if (src.isStroked) {
            StrokePathWebGL(pipeline, src, alpha, dx, dy);
        }

        renderer.pipelines.postBatch(src);
    };

    var FillStyleCanvas = function (ctx, src, altColor, altAlpha)
    {
        var fillColor = (altColor) ? altColor : src.fillColor;
        var fillAlpha = (altAlpha) ? altAlpha : src.fillAlpha;

        var red = ((fillColor & 0xFF0000) >>> 16);
        var green = ((fillColor & 0xFF00) >>> 8);
        var blue = (fillColor & 0xFF);

        ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
    };

    var LineStyleCanvas = function (ctx, src, altColor, altAlpha)
    {
        var strokeColor = (altColor) ? altColor : src.strokeColor;
        var strokeAlpha = (altAlpha) ? altAlpha : src.strokeAlpha;

        var red = ((strokeColor & 0xFF0000) >>> 16);
        var green = ((strokeColor & 0xFF00) >>> 8);
        var blue = (strokeColor & 0xFF);

        ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
        ctx.lineWidth = src.lineWidth;
    };

    const SetTransform = Phaser.Renderer.Canvas.SetTransform;

    var PolygonCanvasRenderer = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateData();
            src.dirty = false;
        }

        camera.addToRenderList(src);

        var ctx = renderer.currentContext;

        if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
            var dx = src._displayOriginX;
            var dy = src._displayOriginY;

            var path = src.pathData;
            var pathLength = path.length - 1;

            var px1 = path[0] - dx;
            var py1 = path[1] - dy;

            ctx.beginPath();

            ctx.moveTo(px1, py1);

            if (!src.closePath) {
                pathLength -= 2;
            }

            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;

                ctx.lineTo(px2, py2);
            }

            ctx.closePath();

            if (src.isFilled) {
                FillStyleCanvas(ctx, src);

                ctx.fill();
            }

            if (src.isStroked) {
                LineStyleCanvas(ctx, src);

                ctx.stroke();
            }

            //  Restore the context saved in SetTransform
            ctx.restore();
        }
    };

    var Render = {
        renderWebGL: PolygonWebGLRenderer,
        renderCanvas: PolygonCanvasRenderer

    };

    const Shape = Phaser.GameObjects.Shape;

    class PolygnBase extends Shape {
        get fillColor() {
            return this._fillColor;
        }

        set fillColor(value) {
            this._fillColor = value;
            this.isFilled = (value != null) && (this._fillAlpha > 0);
        }

        get fillAlpha() {
            return this._fillAlpha;
        }

        set fillAlpha(value) {
            this._fillAlpha = value;
            this.isFilled = (value > 0) && (this._fillColor != null);
        }

        // Fully override setFillStyle method
        setFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.fillColor = color;
            this.fillAlpha = alpha;

            return this;
        }

        get strokeColor() {
            return this._strokeColor;
        }

        set strokeColor(value) {
            this._strokeColor = value;
            this.isStroked = (value != null) && (this._strokeAlpha > 0) && (this._lineWidth > 0);
        }

        get strokeAlpha() {
            return this._strokeAlpha;
        }

        set strokeAlpha(value) {
            this._strokeAlpha = value;
            this.isStroked = (value > 0) && (this._strokeColor != null) && (this._lineWidth > 0);
        }

        get lineWidth() {
            return this._lineWidth;
        }

        set lineWidth(value) {
            this._lineWidth = value;
            this.isStroked = (value > 0) && (this._strokeColor != null);
        }

        // Fully override setStrokeStyle method
        setStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;

            return this;
        }

        updateData() {
            return this;
        }

        get width() {
            return this.geom.width;
        }
        set width(value) {
            this.resize(value, this.height);
        }

        get height() {
            return this.geom.height;
        }
        set height(value) {
            this.resize(this.width, value);
        }

        setSize(width, height) {
            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = width;
                input.hitArea.height = height;
            }
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

    }

    Object.assign(
        PolygnBase.prototype,
        Render
    );

    var HasProperty = function (obj, prop) {
        if (!obj) {
            return false;
        }

        if (obj.hasOwnProperty(prop)) {
            return true;
        }

        while (obj) {
            if (Object.getOwnPropertyDescriptor(obj, prop)) {
                return true;
            }
            obj = obj.__proto__;
        }

        return false;
    };

    var InjectPointAccessProperties = function (gameObject, key, point) {
        if (!key || HasProperty(gameObject, `${key}X`)) {
            return;
        }
        Object.defineProperty(gameObject, `${key}X`, {
            get: function () {
                return point.x;
            },
            set: function (value) {
                point.x = value;
                gameObject.dirty = true;
            },
        });
        Object.defineProperty(gameObject, `${key}Y`, {
            get: function () {
                return point.y;
            },
            set: function (value) {
                point.y = value;
                gameObject.dirty = true;
            },
        });
        Object.defineProperty(gameObject, `${key}T`, {
            get: function () {
                return point.t;
            },
            set: function (value) {
                point.t = value;
                gameObject.dirty = true;
            },
        });
    };

    var PointMethods = {
        setTLPosition(x, y) {
            this.geom.setTLPosition(x, y);
            this.dirty = true;
            return this;
        },

        setTRPosition(x, y) {
            this.geom.setTRPosition(x, y);
            this.dirty = true;
            return this;
        },

        setBLPosition(x, y) {
            this.geom.setBLPosition(x, y);
            this.dirty = true;
            return this;
        },

        setBRPosition(x, y) {
            this.geom.setBRPosition(x, y);
            this.dirty = true;
            return this;
        },

        resetCornerPosition() {
            this.geom.resetCornerPosition();
            this.dirty = true;
            return this;
        },

        insertTopSidePoint(t, x, y, key) {
            var points = this.geom.topSidePoints;
            if (Array.isArray(t)) {
                var points = t, point;
                for (var i = 0, cnt = points.length; i < cnt; i++) {
                    point = points[i];
                    this.geom.insertTopSidePoint(point.t, point.x, point.y);
                    InjectPointAccessProperties(this, point.key, points[points.length - 1]);
                }
            } else {
                this.geom.insertTopSidePoint(t, x, y);
                InjectPointAccessProperties(this, key, points[points.length - 1]);
            }
            this.dirty = true;
            return this;
        },

        insertRightSidePoint(t, x, y, key) {
            var points = this.geom.rightSidePoints;
            if (Array.isArray(t)) {
                var points = t, point;
                for (var i = 0, cnt = points.length; i < cnt; i++) {
                    point = points[i];
                    this.geom.insertRightSidePoint(point.t, point.x, point.y);
                    InjectPointAccessProperties(this, point.key, points[points.length - 1]);
                }
            } else {
                this.geom.insertRightSidePoint(t, x, y);
                InjectPointAccessProperties(this, key, points[points.length - 1]);
            }
            this.dirty = true;
            return this;
        },

        insertBottomSidePoint(t, x, y, key) {
            var points = this.geom.bottomSidePoints;
            if (Array.isArray(t)) {
                var points = t, point;
                for (var i = 0, cnt = points.length; i < cnt; i++) {
                    point = points[i];
                    this.geom.insertBottomSidePoint(point.t, point.x, point.y);
                    InjectPointAccessProperties(this, point.key, points[points.length - 1]);
                }
            } else {
                this.geom.insertBottomSidePoint(t, x, y);
                InjectPointAccessProperties(this, key, points[points.length - 1]);
            }
            this.dirty = true;
            return this;
        },

        insertLeftSidePoint(t, x, y, key) {
            var points = this.geom.leftSidePoints;
            if (Array.isArray(t)) {
                var points = t, point;
                for (var i = 0, cnt = points.length; i < cnt; i++) {
                    point = points[i];
                    this.geom.insertLeftSidePoint(point.t, point.x, point.y);
                    InjectPointAccessProperties(this, point.key, points[points.length - 1]);
                }
            } else {
                this.geom.insertLeftSidePoint(t, x, y);
                InjectPointAccessProperties(this, key, points[points.length - 1]);
            }
            this.dirty = true;
            return this;
        },

        clearTopSidePoints() {
            this.geom.clearTopSidePoints();
            this.dirty = true;
            return this;
        },

        clearRightSidePoints() {
            this.geom.clearRightSidePoints();
            this.dirty = true;
            return this;
        },

        clearBottomSidePoints() {
            this.geom.clearBottomSidePoints();
            this.dirty = true;
            return this;
        },

        clearLeftSidePoints() {
            this.geom.clearLeftSidePoints();
            this.dirty = true;
            return this;
        },

        clearAllSidesPoints() {
            this.geom.clearAllSidesPoints();
            this.dirty = true;
            return this;
        },

    };

    class QuadGeom {
        constructor(x, y, width, height) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = 0; }

            this.setTo(x, y, width, height);

            this.tlx = 0;
            this.tly = 0;
            this.trx = 0;
            this.try = 0;
            this.blx = 0;
            this.bly = 0;
            this.brx = 0;
            this.bry = 0;
            this.topSidePoints = [];
            this.rightSidePoints = [];
            this.bottomSidePoints = [];
            this.leftSidePoints = [];
        }

        setTo(x, y, width, height) {
            this.setPosition(x, y);
            this.setSize(width, height);
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        setTLPosition(x, y) {
            this.tlx = x;
            this.tly = y;
            return this;
        }

        setTRPosition(x, y) {
            this.trx = x;
            this.try = y;
            return this;
        }

        setBLPosition(x, y) {
            this.blx = x;
            this.bly = y;
            return this;
        }

        setBRPosition(x, y) {
            this.brx = x;
            this.bry = y;
            return this;
        }

        resetCornerPosition() {
            this
                .setTLPosition(0, 0)
                .setTRPosition(0, 0)
                .setBLPosition(0, 0)
                .setBRPosition(0, 0);

            return this;
        }

        insertTopSidePoint(t, x, y) {
            AddPoint(this.topSidePoints, t, x, y);
            return this;
        }

        insertRightSidePoint(t, x, y) {
            AddPoint(this.rightSidePoints, t, x, y);
            return this;
        }

        insertBottomSidePoint(t, x, y) {
            AddPoint(this.bottomSidePoints, t, x, y);
            return this;
        }

        insertLeftSidePoint(t, x, y) {
            AddPoint(this.leftSidePoints, t, x, y);
            return this;
        }

        clearTopSidePoints() {
            this.topSidePoints.length = 0;
            return this;
        }

        clearRightSidePoints() {
            this.rightSidePoints.length = 0;
            return this;
        }

        clearBottomSidePoints() {
            this.bottomSidePoints.length = 0;
            return this;
        }

        clearLeftSidePoints() {
            this.leftSidePoints.length = 0;
            return this;
        }

        clearAllSidesPoints() {
            this
                .clearTopSidePoints()
                .clearRightSidePoints()
                .clearBottomSidePoints()
                .clearLeftSidePoints();

            return this;

        }
    }

    var AddPoint = function (points, t, x, y) {
        if (typeof (t) !== 'number') {
            var config = t;
            t = config.t;
            x = config.x;
            y = config.y;
        }
        points.push({ t: t, x: x, y: y });
    };

    var LineTo = function (x, y, pathData) {
        var cnt = pathData.length;
        if (cnt >= 2) {
            var lastX = pathData[cnt - 2];
            var lastY = pathData[cnt - 1];
            if ((x === lastX) && (y === lastY)) {
                return pathData;
            }
        }

        pathData.push(x, y);
        return pathData;
    };

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
                .setBRPosition(GetValue(config, 'brx', 0), GetValue(config, 'bry', 0));

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
        });
    };

    Object.assign(
        Quad.prototype,
        PointMethods,
    );

    function Factory (x, y, width, height, fillColor, fillAlpha) {
        var gameObject = new Quad(this.scene, x, y, width, height, fillColor, fillAlpha);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue(config, 'width', undefined);
        var height = GetAdvancedValue(config, 'height', width);
        var fillColor = GetAdvancedValue(config, 'fillColor', undefined);
        var fillAlpha = GetAdvancedValue(config, 'fillAlpha', undefined);
        var gameObject = new Quad(this.scene, 0, 0, width, height, fillColor, fillAlpha);

        BuildGameObject(this.scene, gameObject, config);

        return gameObject;
    }

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    class QuadPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexQuadShape', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.QuadShape', Quad);

    return QuadPlugin;

}));
