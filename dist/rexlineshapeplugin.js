(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlineshapeplugin = factory());
})(this, (function () { 'use strict';

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        src.updateData();
        camera.addToRenderList(src);

        var pipeline = renderer.pipelines.set(src.pipeline);

        var result = GetCalcMatrix(src, camera, parentMatrix);

        var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = camera.alpha * src.alpha;

        renderer.pipelines.preBatch(src);

        var shapes = src.geom,
            shape;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            shape = shapes[i];
            if (shape.visible) {
                shape.webglRender(pipeline, calcMatrix, alpha, dx, dy);
            }
        }

        renderer.pipelines.postBatch(src);
    };

    const SetTransform = Phaser.Renderer.Canvas.SetTransform;

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        src.updateData();
        camera.addToRenderList(src);

        var ctx = renderer.currentContext;

        if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
            var dx = src._displayOriginX;
            var dy = src._displayOriginY;

            var shapes = src.geom,
                shape;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                shape = shapes[i];
                if (shape.visible) {
                    shape.canvasRender(ctx, dx, dy);
                }
            }

            //  Restore the context saved in SetTransform
            ctx.restore();
        }
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    const Shape = Phaser.GameObjects.Shape;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class BaseShapes extends Shape {
        constructor(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 2;
            }
            if (height === undefined) {
                height = width;
            }

            super(scene, 'rexShapes', []);

            this._width = -1;
            this._height = -1;
            this.dirty = true;
            this.isSizeChanged = true;
            this.shapes = {};

            this.setPosition(x, y);
            this.setSize(width, height);

            this.updateDisplayOrigin();
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.setSize(value, this._height);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.setSize(this._width, value);
        }

        setDirty(value) {
            if (value === undefined) {
                value = true;
            }
            this.dirty = value;
            return this;
        }

        setSize(width, height) {
            this.isSizeChanged = this.isSizeChanged || (this._width !== width) || (this._height !== height);
            this.dirty = this.dirty || this.isSizeChanged;
            this._width = width;
            this._height = height;
            this.updateDisplayOrigin();
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

        get fillColor() {
            return this._fillColor;
        }

        set fillColor(value) {
            this.setFillStyle(value, this._fillAlpha);
        }

        get fillAlpha() {
            return this._fillAlpha;
        }

        set fillAlpha(value) {
            this.setFillStyle(this._fillColor, value);
        }

        setFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.dirty = this.dirty ||
                (this.fillColor !== color) ||
                (this.fillAlpha !== alpha);

            this._fillColor = color;
            this._fillAlpha = alpha;

            return this;
        }

        get lineWidth() {
            return this._lineWidth;
        }

        set lineWidth(value) {
            this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
        }

        get strokeColor() {
            return this._strokeColor;
        }

        set strokeColor(value) {
            this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
        }

        get strokeAlpha() {
            return this._strokeAlpha;
        }

        set strokeAlpha(value) {
            this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
        }

        setStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.dirty = this.dirty ||
                (this.lineWidth !== lineWidth) ||
                (this.strokeColor !== color) ||
                (this.strokeAlpha !== alpha);

            this._lineWidth = lineWidth;
            this._strokeColor = color;
            this._strokeAlpha = alpha;

            return this;
        }

        updateShapes() {

        }

        updateData() {
            if (!this.dirty) {
                return this;
            }

            this.updateShapes();
            var shapes = this.geom;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];
                if (shape.dirty) {
                    shape.updateData();
                }
            }

            this.isSizeChanged = false;
            this.dirty = false;


            return this;
        }

        clear() {
            this.geom.length = 0;
            Clear(this.shapes);
            this.dirty = true;
            return this;
        }

        getShape(name) {
            return this.shapes[name];
        }

        getShapes() {
            return this.geom;
        }

        addShape(shape) {
            this.geom.push(shape);
            var name = shape.name;
            if (name) {
                this.shapes[name] = shape;
            }
            this.dirty = true;
            return this;
        }

        deleteShape(name) {
            var shape = this.getShape(name);
            if (shape) {
                delete this.shapes[name];
                RemoveItem(this.geom, shape);
            }
            return this;
        }
    }

    Object.assign(
        BaseShapes.prototype,
        Render
    );

    const BEZIER = 0;
    const SPLINE = 1;
    const POLYLINE = 2;
    const STRAIGHTLINE = 3;

    const CurveTypes = {
        bezier: BEZIER,

        spline: SPLINE,

        polyline: POLYLINE,
        poly: POLYLINE,

        straightline: STRAIGHTLINE,
        straight: STRAIGHTLINE,
    };

    const NONE = 0;
    const TRIANGLE = 1;
    const DOT = 2;
    const BOX = 3;
    const DIAMOND = 4;

    const EndPointTypes = {
        none: NONE,

        triangle: TRIANGLE,
        dot: DOT,
        box: BOX,
        diamond: DIAMOND,
    };

    var EndPointsMethods = {
        setHeadShape(endPointType) {
            if (typeof (endPointType) === 'string') {
                endPointType = EndPointTypes[endPointType.toLowerCase()];
            }

            this.headShape = endPointType;
            return this;
        },

        setHeadSize(size) {
            this.headSize = size;
            return this;
        },

        setHeadFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.headColor = color;
            this.headAlpha = alpha;
            return this;
        },

        setHeadStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.headStrokeWidth = lineWidth;
            this.headStrokeColor = color;
            this.headStrokeAlpha = alpha;
            return this;
        },

        setTailShape(endPointType) {
            if (typeof (endPointType) === 'string') {
                endPointType = EndPointTypes[endPointType.toLowerCase()];
            }

            this.tailShape = endPointType;
            return this;
        },

        setTailSize(size) {
            this.tailSize = size;
            return this;
        },

        setTailFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.tailColor = color;
            this.tailAlpha = alpha;
            return this;
        },

        setTailStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.tailStrokeWidth = lineWidth;
            this.tailStrokeColor = color;
            this.tailStrokeAlpha = alpha;
            return this;
        },
    };

    var FillStyle = function (color, alpha) {
        if (color == null) {
            this.isFilled = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isFilled = true;
            this.fillColor = color;
            this.fillAlpha = alpha;
        }
        return this;
    };

    var LineStyle = function (lineWidth, color, alpha) {
        if ((lineWidth == null) || (color == null)) {
            this.isStroked = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isStroked = true;
            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;
        }
        return this;
    };

    var StyleMethods = {
        fillStyle: FillStyle,
        lineStyle: LineStyle
    };

    var GetValue$1 = function (source, key, defaultValue, altSource) {
        var isValidSource = source && (typeof source === 'object' || typeof source === 'function');
        var isValidAltSource = altSource && (typeof altSource === 'object' || typeof altSource === 'function');

        if (!isValidSource && !isValidAltSource) {
            return defaultValue;
        }

        var keyPath = String(key);

        // Shortcut:
        // If obj[keyPath] can be read (including prototype chain), return it directly.
        // This also supports literal keys like "a.b".
        if (isValidSource && (keyPath in source)) {
            return source[keyPath];
        }
        if (isValidAltSource && (keyPath in altSource)) {
            return altSource[keyPath];
        }

        // If there is no dot, we already know it's missing.
        if (keyPath.indexOf('.') === -1) {
            return defaultValue;
        }

        var keys = keyPath.split('.');

        // 1) Try source path first
        if (isValidSource) {
            var sourceResult = WalkPath(source, keys, defaultValue);
            if (sourceResult.found) {
                return sourceResult.value;
            }
        }

        // 2) Then try altSource path
        if (isValidAltSource) {
            var altSourceResult = WalkPath(altSource, keys, defaultValue);
            if (altSourceResult.found) {
                return altSourceResult.value;
            }
        }

        return defaultValue;
    };


    var WalkPath = function (source, keys, defaultValue) {
        var parent = source;
        var value = defaultValue;

        var found;
        for (var index = 0, cnt = keys.length; index < cnt; index++) {
            var partKey = keys[index];

            if (parent && (typeof parent === 'object' || typeof parent === 'function')) {
                found = (partKey in parent);
            } else {
                found = false;
            }

            if (!found) {
                WalkPathResult.found = false;
                return WalkPathResult;
            }

            value = parent[partKey];
            parent = value;
        }

        WalkPathResult.found = true;
        WalkPathResult.value = value;
        return WalkPathResult;
    };

    var WalkPathResult = {};

    var DataMethods = {
        enableData() {
            if (this.data === undefined) {
                this.data = {};
            }
            return this;
        },

        setData(key, value) {
            this.enableData();
            if (arguments.length === 1) {
                var data = key;
                for (key in data) {
                    this.data[key] = data[key];
                }
            } else {
                this.data[key] = value;
            }
            return this;
        },

        getData(key, defaultValue) {
            this.enableData();
            return (key === undefined) ? this.data : GetValue$1(this.data, key, defaultValue);
        },

        incData(key, inc, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) + inc);
            return this;
        },

        mulData(key, mul, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) * mul);
            return this;
        },

        clearData() {
            if (this.data) {
                Clear(this.data);
            }
            return this;
        },
    };

    class BaseGeom {
        constructor() {
            this.name = undefined;
            this.dirty = true;
            this.visible = true;
            this.data = undefined;

            this.isFilled = false;
            this.fillColor = undefined;
            this.fillAlpha = 1;

            this.isStroked = false;
            this.lineWidth = 1;
            this.strokeColor = undefined;
            this.strokeAlpha = 1;
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }
            this.visible = visible;
            return this;
        }

        reset() {
            this
                .setVisible()
                .fillStyle()
                .lineStyle();

            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {

        }

        canvasRender(ctx, dx, dy) {

        }

        updateData() {
            this.dirty = false;
        }
    }

    Object.assign(
        BaseGeom.prototype,
        StyleMethods,
        DataMethods
    );

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

    const Earcut = Phaser.Geom.Polygon.Earcut;

    class PathBase extends BaseGeom {
        constructor() {
            super();

            this.pathData = [];
            this.pathIndexes = [];
            this.closePath = false;
        }

        updateData() {
            this.pathIndexes = Earcut(this.pathData);

            super.updateData();
            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {
            if (this.isFilled) {
                FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
            }

            if (this.isStroked) {
                StrokePathWebGL(pipeline, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            var path = this.pathData;
            var pathLength = path.length - 1;

            var px1 = path[0] - dx;
            var py1 = path[1] - dy;

            ctx.beginPath();

            ctx.moveTo(px1, py1);

            if (!this.closePath) {
                pathLength -= 2;
            }

            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;
                ctx.lineTo(px2, py2);
            }

            if (this.closePath) {
                ctx.closePath();
            }


            if (this.isFilled) {
                FillStyleCanvas(ctx, this);
                ctx.fill();
            }

            if (this.isStroked) {
                LineStyleCanvas(ctx, this);
                ctx.stroke();
            }
        }
    }

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

    const DegToRad$1 = Phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad$1(deltaAngle) / iteration;
        startAngle = DegToRad$1(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
        }
        return pathData;
    };

    Phaser.Math.DegToRad;

    var StartAt = function (x, y, pathData) {
        pathData.length = 0;

        if (x != null) {
            pathData.push(x, y);
        }

        return pathData;
    };

    //import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

    const QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;

    var QuadraticBezierTo = function (cx, cy, x, y, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];
        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                QuadraticBezierInterpolation(t, p0x, cx, x),
                QuadraticBezierInterpolation(t, p0y, cy, y)
            );
        }
        return pathData;
    };

    // import CubicBezierInterpolation from '../../utils/math/interpolation/CubicBezierInterpolation.js';

    const CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;

    var CubicBezierCurveTo = function (cx0, cy0, cx1, cy1, x, y, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];
        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                CubicBezierInterpolation(t, p0x, cx0, cx1, x),
                CubicBezierInterpolation(t, p0y, cy0, cy1, y)
            );
        }
        return pathData;
    };

    //import CatmullRomInterpolation from '../../utils/math/interpolation/CatmullRomInterpolation.js';

    const CatmullRomInterpolation = Phaser.Math.Interpolation.CatmullRom;

    var CatmullRomTo = function (points, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];

        var xList = [p0x];
        var yList = [p0y];
        for (var i = 0, cnt = points.length; i < cnt; i += 2) {
            xList.push(points[i]);
            yList.push(points[i + 1]);
        }

        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                CatmullRomInterpolation(xList, t),
                CatmullRomInterpolation(yList, t)
            );
        }
        return pathData;
    };

    var DuplicateLast = function (pathData) {
        var len = pathData.length;
        if (len < 2) {
            return pathData;
        }

        var lastX = pathData[len - 2];
        var lastY = pathData[len - 1];
        pathData.push(lastX);
        pathData.push(lastY);

        return pathData;
    };

    var AddPathMethods = {
        clear() {
            this.start();
            return this;
        },

        start() {
            this.startAt();
            return this;
        },

        startAt(x, y) {
            this.restorePathData();
            this.accumulationLengths = undefined;

            StartAt(x, y, this.pathData);
            this.firstPointX = x;
            this.firstPointY = y;
            this.lastPointX = x;
            this.lastPointY = y;

            return this;
        },

        lineTo(x, y, relative) {
            if (relative === undefined) {
                relative = false;
            }
            if (relative) {
                x += this.lastPointX;
                y += this.lastPointY;
            }

            LineTo(x, y, this.pathData);

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        verticalLineTo(x, relative) {
            this.lineTo(x, this.lastPointY, relative);
            return this;
        },

        horizontalLineTo(y, relative) {
            this.lineTo(this.lastPointX, y, relative);
            return this;
        },

        ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
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
            return this;
        },

        arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
            this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise);
            return this;
        },

        quadraticBezierTo(cx, cy, x, y) {
            QuadraticBezierTo(
                cx, cy, x, y,
                this.iterations,
                this.pathData
            );

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            CubicBezierCurveTo(
                cx0, cy0, cx1, cy1, x, y,
                this.iterations,
                this.pathData
            );

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        catmullRomTo(...points) {
            CatmullRomTo(
                points,
                this.iterations,
                this.pathData
            );

            this.lastPointX = points[points.length-2];
            this.lastPointY = points[points.length-1];
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
            return this;
        },

        end() {
            DuplicateLast(this.pathData);
            return this;
        },

    };

    //import PointRotateAround from '../../utils/math/RotateAround.js';

    const PointRotateAround = Phaser.Math.RotateAround;

    var RotateAround = function (centerX, centerY, angle, pathData) {
        var point = { x: 0, y: 0 };
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            point.x = pathData[i];
            point.y = pathData[i + 1];
            PointRotateAround(point, centerX, centerY, angle);
            pathData[i] = point.x;
            pathData[i + 1] = point.y;
        }
        return pathData;
    };

    var Scale = function (centerX, centerY, scaleX, scaleY, pathData) {
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            var x = pathData[i] - centerX;
            var y = pathData[i + 1] - centerY;
            x *= scaleX;
            y *= scaleY;
            pathData[i] = x + centerX;
            pathData[i + 1] = y + centerY;
        }
        return pathData;
    };

    var Offset = function (x, y, pathData) {
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            pathData[i] += x;
            pathData[i + 1] += y;
        }
        return pathData;
    };

    const DegToRad = Phaser.Math.DegToRad;
    Phaser.Math.RotateAround;

    var TransformPointsMethods = {
        rotateAround(centerX, centerY, angle) {
            if (this.pathData.length === 0) {
                return this;
            }

            angle = DegToRad(angle);

            RotateAround(centerX, centerY, angle, this.pathData);

            var pathDataCnt = this.pathData.length;
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];
            return this;
        },

        scale(centerX, centerY, scaleX, scaleY) {
            if (this.pathData.length === 0) {
                return this;
            }

            Scale(centerX, centerY, scaleX, scaleY, this.pathData);
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];
            return this;
        },

        offset(x, y) {
            Offset(x, y, this.pathData);
            return this;
        }

    };

    var Copy = function (dest, src, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }    if (endIdx === undefined) {
            endIdx = src.length;
        }
        dest.length = endIdx - startIdx;
        for (var i = 0, len = dest.length; i < len; i++) {
            dest[i] = src[i + startIdx];
        }
        return dest;
    };

    var SavePathDataMethods = {
        savePathData() {
            if (this.pathDataSaved) {
                return this;
            }

            this.pathDataSave = [...this.pathData];
            this.pathData.length = 0;
            this.pathDataSaved = true;
            return this;
        },

        restorePathData() {
            if (!this.pathDataSaved) {
                return this;
            }

            Copy(this.pathData, this.pathDataSave);
            this.pathDataSave = undefined;
            this.pathDataSaved = false;
            return this;
        },
    };

    const DistanceBetween = Phaser.Math.Distance.Between;
    const Wrap = Phaser.Math.Wrap;
    const Linear = Phaser.Math.Linear;

    var AppendFromPathSegment = function (srcPathData, accumulationLengths, startT, endT, destPathData) {
        if (endT === undefined) {
            endT = startT;
            startT = 0;
        }

        startT = WrapT(startT);
        endT = WrapT(endT);

        if (startT === endT) {
            return;
        }

        var totalPathLength = accumulationLengths[accumulationLengths.length - 1];
        var startL = totalPathLength * startT;
        var endL = totalPathLength * endT;
        if (startT < endT) {
            AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData);
        } else {
            AddPathSegment(srcPathData, accumulationLengths, startL, totalPathLength, destPathData);
            AddPathSegment(srcPathData, accumulationLengths, 0, endL, destPathData);
        }

        DuplicateLast(destPathData);
    };

    var AddPathSegment = function (srcPathData, accumulationLengths, startL, endL, destPathData) {
        var skipState = (startL > 0);
        for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
            var pIdx = i * 2;
            var d = accumulationLengths[i];

            if (skipState) {
                if (d < startL) {
                    continue;
                } else if (d == startL) {
                    skipState = false;
                } else { // d > startL
                    var deltaD = d - accumulationLengths[i - 1];
                    var t = 1 - ((d - startL) / deltaD);
                    destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
                    destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
                    skipState = false;
                }
            }

            if (d <= endL) {
                destPathData.push(srcPathData[pIdx]);
                destPathData.push(srcPathData[pIdx + 1]);
                if (d === endL) {
                    break;
                }
            } else { // d > endL
                var deltaD = d - accumulationLengths[i - 1];
                var t = 1 - ((d - endL) / deltaD);
                destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
                destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
                break;
            }
        }
    };

    var GetInterpolation = function (pathData, i0, i1, t) {
        var p0 = pathData[i0], p1 = pathData[i1];
        return Linear(p0, p1, t);
    };

    var WrapT = function (t) {
        if (t === 0) {
            return 0;
        } else if ((t % 1) === 0) {
            return 1;
        }
        return Wrap(t, 0, 1);
    };

    var PathSegmentMethods = {
        updateAccumulationLengths() {
            if (this.accumulationLengths == null) {
                this.accumulationLengths = [];
            } else if (this.accumulationLengths.length === (this.pathData.length / 2)) {
                return this;
            }

            var accumulationLengths = this.accumulationLengths;
            var pathData = this.pathData;
            var prevX, prevY, x, y;
            var d, accumulationLength = 0;
            for (var i = 0, cnt = pathData.length; i < cnt; i += 2) {
                x = pathData[i];
                y = pathData[i + 1];

                d = (prevX === undefined) ? 0 : DistanceBetween(prevX, prevY, x, y);
                accumulationLength += d;
                accumulationLengths.push(accumulationLength);

                prevX = x;
                prevY = y;
            }

            this.totalPathLength = accumulationLength;

            return this;
        },

        setDisplayPathSegment(startT, endT) {
            if (!this.pathDataSaved) {
                this.updateAccumulationLengths();
                this.savePathData();
            }

            this.pathData.length = 0;
            AppendFromPathSegment(this.pathDataSave, this.accumulationLengths, startT, endT, this.pathData);

            return this;
        },

        appendFromPathSegment(src, startT, endT) {
            if (startT === undefined) {
                this.pathData.push(...src.pathData);
            } else {
                src.updateAccumulationLengths();
                AppendFromPathSegment(src.pathData, src.accumulationLengths, startT, endT, this.pathData);
            }

            this.firstPointX = this.pathData[0];
            this.firstPointY = this.pathData[1];
            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            return this;
        },
    };

    var GraphicsMethods = {
        draw(graphics, isFill, isStroke) {
            var points = this.toPoints();
            if (isFill) {
                graphics.fillPoints(points, this.closePath, this.closePath);
            }
            if (isStroke) {
                graphics.strokePoints(points, this.closePath, this.closePath);
            }

            return this;
        }
    };

    var ToPoints = function (pathData, points) {
        if (points === undefined) {
            points = [];
        }
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            points.push({
                x: pathData[i],
                y: pathData[i + 1]
            });
        }
        return points;
    };

    //import Polygon from '../../utils/geom/polygon/Polygon.js';

    const Polygon = Phaser.Geom.Polygon;

    var ToPolygon = function (pathData, polygon) {
        if (polygon === undefined) {
            polygon = new Polygon();
        }
        polygon.setTo(pathData);
        return polygon;
    };

    class PathDataBuilder {
        constructor(pathData) {
            if (pathData === undefined) {
                pathData = [];
            }

            this.pathData = pathData;
            this.closePath = false;
            this.setIterations(32);

            this.firstPointX = undefined;
            this.firstPointY = undefined;
            this.lastPointX = undefined;
            this.lastPointY = undefined;
            this.accumulationLengths = undefined;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        toPoints() {
            return ToPoints(this.pathData);
        }

        toPolygon(polygon) {
            return ToPolygon(this.pathData, polygon);
        }

    }

    Object.assign(
        PathDataBuilder.prototype,
        AddPathMethods,
        TransformPointsMethods,
        SavePathDataMethods,
        PathSegmentMethods,
        GraphicsMethods,
    );

    class Lines extends PathBase {
        constructor() {
            super();
            this.builder = new PathDataBuilder(this.pathData);
        }

        get iterations() {
            return this.builder.iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this.builder.iterations !== value);
            this.builder.setIterations(value);
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        get lastPointX() {
            return this.builder.lastPointX;
        }

        get lastPointY() {
            return this.builder.lastPointY;
        }

        start() {
            this.builder.start();

            this.dirty = true;
            return this;
        }

        startAt(x, y) {
            this.builder.startAt(x, y);

            this.dirty = true;
            return this;
        }

        lineTo(x, y, relative) {
            this.builder.lineTo(x, y, relative);

            this.dirty = true;
            return this;
        }

        verticalLineTo(x, relative) {
            this.builder.verticalLineTo(x, relative);

            this.dirty = true;
            return this;
        }

        horizontalLineTo(y, relative) {
            this.builder.horizontalLineTo(y, relative);

            this.dirty = true;
            return this;
        }

        ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
            this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);

            this.dirty = true;
            return this;
        }

        arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
            this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

            this.dirty = true;
            return this;
        }

        quadraticBezierTo(cx, cy, x, y) {
            this.builder.quadraticBezierTo(cx, cy, x, y);

            this.dirty = true;
            return this;
        }

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            this.builder.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);

            this.dirty = true;
            return this;
        }

        catmullRomTo(...points) {
            this.builder.catmullRomTo(...points);

            this.dirty = true;
            return this;
        }

        close() {
            this.builder.close();

            this.closePath = this.builder.closePath;
            this.dirty = true;
            return this;
        }

        end() {
            this.builder.end();
            this.dirty = true;
            return this;
        }

        rotateAround(centerX, centerY, angle) {
            this.builder.rotateAround(centerX, centerY, angle);

            this.dirty = true;
            return this;
        }

        scale(centerX, centerY, scaleX, scaleY) {
            this.builder.scale(centerX, centerY, scaleX, scaleY);

            this.dirty = true;
            return this;
        }

        offset(x, y) {
            this.builder.offset(x, y);

            this.dirty = true;
            return this;
        }

        toPolygon(polygon) {
            return this.builder.toPolygon(polygon);
        }

        appendPathFrom(src, startT, endT) {
            this.builder.appendFromPathSegment(src.builder, startT, endT);
            return this;
        }

        copyPathFrom(src, startT, endT) {
            this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
            return this;
        }

        setDisplayPathSegment(startT, endT) {
            this.builder.setDisplayPathSegment(startT, endT);
            return this;
        }
    }

    Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    Phaser.Utils.Objects.GetValue;

    Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    var DrawQuadraticBezierCurve = function (line) {
        var points = this.points;
        var controlPoint = points[1];
        var endPoint = points[2];

        line
            .startAt(0, 0)
            .quadraticBezierTo(
                controlPoint.x,
                controlPoint.y,
                endPoint.x, endPoint.y
            )
            .end();

    };

    var DrawBezierCurve = function (line) {
        var points = this.points;
        var controlPoint0 = points[1];
        var controlPoint1 = points[2];
        var endPoint = points[3];

        line
            .startAt(0, 0)
            .cubicBezierTo(
                controlPoint0.x, controlPoint0.y, 
                controlPoint1.x, controlPoint1.y, 
                endPoint.x, endPoint.y
            )
            .end();

    };

    var DrawSpinleCurve = function (line) {
        var points = this.points;
        var splinePoints = [];
        for (var i = 1, cnt = points.length; i < cnt; i++) {
            var point = points[i];
            splinePoints.push(point.x);
            splinePoints.push(point.y);
        }

        line
            .startAt(0, 0)
            .catmullRomTo(...splinePoints)
            .end();

    };

    var DrawStraightLine = function (line) {
        var points = this.points;
        var pointsCount = points.length;
        var endPoint = points[pointsCount - 1];

        line
            .startAt(0, 0)
            .lineTo(endPoint.x, endPoint.y)
            .end();

    };

    var DrawPolyLine = function (line) {
        var points = this.points;
        line.startAt(0, 0);

        for (var i = 1, cnt = points.length; i < cnt; i++) {
            var point = points[i];
            line.lineTo(point.x, point.y);
        }

        line.end();
    };

    const Rectangle$1 = Phaser.Geom.Rectangle;

    var GetBounds = function (points, out) {
        if (out === undefined) {
            out = new Rectangle$1();
        } else if (out === true) {
            out = GlobalBounds;
        }

        var pointCount = points.length;

        switch (pointCount) {
            case 0:
                out.setTo(0, 0, 0, 0);
                break;

            case 2:
                out.setTo(points[0], points[1], 0, 0);
                break;

            default:
                var minX = Infinity;
                var minY = Infinity;
                var maxX = -minX;
                var maxY = -minY;

                for (var i = 0, cnt = points.length; i < cnt; i += 2) {
                    var x = points[i];
                    var y = points[i + 1];

                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }

                out.setTo(minX, minY, maxX - minX, maxY - minY);
                break;
        }

        return out;
    };

    var GlobalBounds = new Rectangle$1();

    var BuildEndPoint = function (shape,
        x, y,
        preX, preY,
        size, shapeType
    ) {

        var radius = size / 2;

        switch (shapeType) {
            case TRIANGLE:
                var vx, vy;
                if ((x === preX) && (y === preY)) {
                    vx = 1;
                    vy = 0;
                } else {
                    vx = x - preX;
                    vy = y - preY;
                    var len = Math.hypot(vx, vy);
                    vx /= len;
                    vy /= len;
                }

                var nx = -vy;
                var ny = vx;
                var cx = x - vx * size;
                var cy = y - vy * size;
                var halfSize = size / 2;
                var bx1 = cx + nx * halfSize;
                var by1 = cy + ny * halfSize;
                var bx2 = cx - nx * halfSize;
                var by2 = cy - ny * halfSize;

                shape.startAt(x, y)
                    .lineTo(bx1, by1)
                    .lineTo(bx2, by2)
                    .close();
                break;

            case DOT:
                shape
                    .start()
                    .arc(x, y, radius, 0, 360)
                    .close();
                break;

            case BOX:
                shape
                    .startAt(x - radius, y - radius)
                    .lineTo(size, 0, true)
                    .lineTo(0, size, true)
                    .lineTo(-size, 0, true)
                    .lineTo(0, -size, true)
                    .close();
                break;

            case DIAMOND:
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
    };

    var SetSizeFromBounds = function () {
        // Size    
        var bounds = this.bounds;
        var radius = this.pointRadius;
        var x = bounds.x - radius;
        var y = bounds.y - radius;
        var width = bounds.width + (radius * 2);
        var height = bounds.height + (radius * 2);
        this.setSize(width, height);
        // Origin
        this.setOrigin(-x / width, -y / height);

        // Position
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            var shape = shapes[i];
            if (shape.visible) {
                shape.offset(-x, -y);
            }
        }
    };

    var ShapesUpdateMethods = {
        buildShapes() {
            var body = new Lines().setName('body');
            var head = new Lines().setName('head');
            var tail = new Lines().setName('tail');

            this
                .addShape(body)
                .addShape(head)
                .addShape(tail);
        },

        updateShapes() {
            var points = this.points;
            var pointCount = points.length;

            // Body
            var hasPath = pointCount >= 2;
            var body = this.getShape('body').setVisible(hasPath);

            if (hasPath) {
                body.lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha);
                if ((this.lineType === STRAIGHTLINE) || (pointCount == 2)) {
                    DrawStraightLine.call(this, body);
                } else if ((this.lineType === BEZIER) && (pointCount === 3)) {
                    DrawQuadraticBezierCurve.call(this, body);
                } else if ((this.lineType === BEZIER) && (pointCount === 4)) {
                    DrawBezierCurve.call(this, body);
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
                    .lineStyle(this.headStrokeWidth, this.headStrokeColor, this.headStrokeAlpha);

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
                    .lineStyle(this.tailStrokeWidth, this.tailStrokeColor, this.tailStrokeAlpha);

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
    };

    const LineToCircle = Phaser.Geom.Intersects.LineToCircle;

    const tmpLine = new Phaser.Geom.Line();

    var LinesToCircle = function (points, circle) {
        tmpLine.x1 = points[0];
        tmpLine.y1 = points[1];
        for (var i = 2, cnt = points.length; i < cnt; i += 2) {
            tmpLine.x2 = points[i];
            tmpLine.y2 = points[i + 1];

            if (LineToCircle(tmpLine, circle)) {
                return true;
            }

            tmpLine.x1 = tmpLine.x2;
            tmpLine.y1 = tmpLine.y2;
        }

        return false;
    };

    const Rectangle = Phaser.Geom.Rectangle;
    const RectangleContains = Phaser.Geom.Rectangle.Contains;
    const SetInteractiveBase = Phaser.GameObjects.GameObject.prototype.setInteractive;

    const GlobPoint = new Phaser.Geom.Circle();

    var HitAreaCallback = function (shape, x, y, gameObject) {
        if (!RectangleContains(shape, x, y)) {
            return false;
        }

        GlobPoint.setTo(x, y, gameObject.pointRadius);

        var line = gameObject.getShapes()[0];
        var points = line.pathData;

        return LinesToCircle(points, GlobPoint);
    };

    var SetInteractiveMethods = {
        setPointRadius(radius) {
            this.pointRadius = radius;
            return this;
        },

        setInteractive(config) {
            if (config === undefined) {
                config = {};
            }

            config.hitArea = new Rectangle(0, 0, this.width, this.height);
            config.hitAreaCallback = HitAreaCallback;

            SetInteractiveBase.call(this, config);

            return this;
        }
    };

    var Methods = {};

    Object.assign(
        Methods,
        EndPointsMethods,
        ShapesUpdateMethods,
        SetInteractiveMethods
    );

    class Line extends BaseShapes {
        constructor(scene, points, lineWidth, color, alpha, config) {
            var lineType, pointRadius;
            var headShape, headSize, headColor, headAlpha, headStrokeWidth, headStrokeColor, headStrokeAlpha;
            var tailShape, tailSize, tailColor, tailAlpha, tailStrokeWidth, tailStrokeColor, tailStrokeAlpha;
            if (points !== undefined) {
                if (typeof (points) === 'number') {
                    lineType = alpha;
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

            if (headShape === undefined) { headShape = 0; }        if (headSize === undefined) { headSize = lineWidth * 4; }
            if (headColor === undefined) { headColor = color; }
            if (headStrokeWidth === undefined) { headStrokeWidth = 1; }

            if (tailShape === undefined) { tailShape = 0; }        if (tailSize === undefined) { tailSize = headSize; }
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
                });
            }

            this.dirty = true;

            if (this.geom.length > 0) {
                this.updateData();
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
                this.updateData();
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
                var p = points[i];
                out.push({
                    x: p.x + x,
                    y: p.y + y,
                });
            }

            return out;
        }

        get headShape() {
            return this._headShape;
        }

        set headShape(value) {
            this.dirty = this.dirty || (this._headShape != value);
            this._headShape = value;
        }

        get headSize() {
            return this._headSize;
        }

        set headSize(value) {
            this.dirty = this.dirty || (this._headSize != value);
            this._headSize = value;
        }

        get headColor() {
            return this._headColor;
        }

        set headColor(value) {
            this.dirty = this.dirty || (this._headColor != value);
            this._headColor = value;
        }

        get headAlpha() {
            return this._headAlpha;
        }

        set headAlpha(value) {
            this.dirty = this.dirty || (this._headAlpha != value);
            this._headAlpha = value;
        }

        get headStokeWidth() {
            return this._headStokeWidth;
        }

        set headStokeWidth(value) {
            this.dirty = this.dirty || (this._headStokeWidth != value);
            this._headStokeWidth = value;
        }

        get headStokeColor() {
            return this._headStokeColor;
        }

        set headStokeColor(value) {
            this.dirty = this.dirty || (this._headStokeColor != value);
            this._headStokeColor = value;
        }

        get headStokeAlpha() {
            return this._headStokeAlpha;
        }

        set headStokeAlpha(value) {
            this.dirty = this.dirty || (this._headStokeAlpha != value);
            this._headStokeAlpha = value;
        }

        get tailShape() {
            return this._tailShape;
        }

        set tailShape(value) {
            this.dirty = this.dirty || (this._tailShape != value);
            this._tailShape = value;
        }

        get tailSize() {
            return this._tailSize;
        }

        set tailSize(value) {
            this.dirty = this.dirty || (this._tailSize != value);
            this._tailSize = value;
        }

        get tailColor() {
            return this._tailColor;
        }

        set tailColor(value) {
            this.dirty = this.dirty || (this._tailColor != value);
            this._tailColor = value;
        }

        get tailAlpha() {
            return this._tailAlpha;
        }

        set tailAlpha(value) {
            this.dirty = this.dirty || (this._tailAlpha != value);
            this._tailAlpha = value;
        }

        get tailStokeWidth() {
            return this._tailStokeWidth;
        }

        set tailStokeWidth(value) {
            this.dirty = this.dirty || (this._tailStokeWidth != value);
            this._tailStokeWidth = value;
        }

        get tailStokeColor() {
            return this._tailStokeColor;
        }

        set tailStokeColor(value) {
            this.dirty = this.dirty || (this._tailStokeColor != value);
            this._tailStokeColor = value;
        }

        get tailStokeAlpha() {
            return this._tailStokeAlpha;
        }

        set tailStokeAlpha(value) {
            this.dirty = this.dirty || (this._tailStokeAlpha != value);
            this._tailStokeAlpha = value;
        }

    }

    Object.assign(
        Line.prototype,
        Methods
    );

    function Factory (points, lineWidth, color, alpha, lineType) {
        var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var points = GetValue(config, 'points', undefined);
        var lineWidth = GetAdvancedValue(config, 'lineWidth', 2);
        var color = GetAdvancedValue(config, 'color', 0xffffff);
        var alpha = GetAdvancedValue(config, 'alpha', 1);
        var lineType = GetAdvancedValue(config, 'lineType', 0);
        var gameObject = new Line(this.scene, points, lineWidth, color, alpha, lineType);

        BuildGameObject(this.scene, gameObject, config);

        return gameObject;
    }

    var IsNil = function (value) {
        return value === null || value === undefined;
    };

    var IsObjectLike = function (value) {
        return value !== null && typeof value === 'object';
    };

    var NormalizePath = function (path, delimiter) {
        if (Array.isArray(path)) ; else if (typeof path !== 'string') {
            path = [];
        } else if (path.trim() === '') {
            path = [];
        } else {
            path = path.split(delimiter).filter(Boolean);
        }
        return path;
    };

    /**
     * Set a nested value into target by path (mutates target).
     *
     * - If keys is a string and does NOT contain delimiter, write directly.
     * - Intermediate non-plain-object values are always overwritten with {}.
     *
     * @param {object} target
     * @param {string|string[]} keys
     * @param {*} value
     * @param {string} [delimiter='.']
     * @returns {object} the same target reference
     */
    var SetValue = function (target, keys, value, delimiter = '.') {
        if (!IsObjectLike(target)) {
            return target;
        }

        // Invalid key: no-op; don't replace root
        if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
            return target;
        }

        // Fast path: single key
        if (typeof keys === 'string' && keys.indexOf(delimiter) === -1) {
            target[keys] = value;
            return target;
        }

        var pathSegments = NormalizePath(keys, delimiter);
        if (pathSegments.length === 0) {
            return target;
        }

        var cursor = target;
        var pathSegmentsCount = pathSegments.length;

        for (var index = 0; index < pathSegmentsCount - 1; index++) {
            var segment = pathSegments[index];
            var next = cursor[segment];

            if (!IsObjectLike(next)) {
                // Force overwrite intermediates
                cursor[segment] = {};
            }

            cursor = cursor[segment];
        }

        cursor[pathSegments[pathSegmentsCount - 1]] = value;
        return target;
    };

    class LinePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexLineShape', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.LineShape', Line);

    return LinePlugin;

}));
