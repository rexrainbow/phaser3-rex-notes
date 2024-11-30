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

    var GetValue$1 = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

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

    const BEZIER = 0;
    const SPLINE = 1;
    const POLYLINE = 2;
    const STRAIGHTLINE = 3;

    var DrawQuadraticBezierCurve = function (line) {
        var points = this.points;

        var startPoint = points[0];
        var startX = startPoint.x;
        var startY = startPoint.y;

        var controlPoint = points[1];
        var cx = controlPoint.x - startX;
        var cy = controlPoint.y - startY;

        var endPoint = points[2];
        var endX = endPoint.x - startX;
        var endY = endPoint.y - startY;

        line
            .startAt(0, 0)
            .quadraticBezierTo(cx, cy, endX, endY)
            .end();

    };

    var DrawBezierCurve = function (line) {
        var points = this.points;
        var startPoint = points[0];
        var startX = startPoint.x;
        var startY = startPoint.y;

        var controlPoint0 = points[1];
        var cx0 = controlPoint0.x - startX;
        var cy0 = controlPoint0.y - startY;

        var controlPoint1 = points[2];
        var cx1 = controlPoint1.x - startX;
        var cy1 = controlPoint1.y - startY;

        var endPoint = points[3];
        var endX = endPoint.x - startX;
        var endY = endPoint.y - startY;

        line
            .startAt(0, 0)
            .cubicBezierTo(cx0, cy0, cx1, cy1, endX, endY)
            .end();

    };

    var DrawSpinleCurve = function (line) {
        var points = this.points;
        var startPoint = points[0];
        var startX = startPoint.x;
        var startY = startPoint.y;

        var splinePoints = [];
        for (var i = 1, cnt = points.length; i < cnt; i ++) {
            var point = points[i];
            splinePoints.push(point.x - startX);
            splinePoints.push(point.y - startY);
        }

        line
            .startAt(0, 0)
            .catmullRomTo(...splinePoints)
            .end();

    };

    var DrawStraightLine = function (line) {
        var points = this.points;
        var startPoint = points[0];
        var startX = startPoint.x;
        var startY = startPoint.y;


        var pointsCount = points.length;
        var endPoint = points[pointsCount - 1];
        var endX = endPoint.x - startX;
        var endY = endPoint.y - startY;

        line
            .startAt(0, 0)
            .lineTo(endX, endY)
            .end();

    };

    var DrawPolyLine = function (line) {
        var points = this.points;
        var startPoint = points[0];
        var startX = startPoint.x;
        var startY = startPoint.y;
        line.startAt(0, 0);

        for (var i = 1, cnt = points.length; i < cnt; i++) {
            var point = points[i];
            var x = point.x - startX;
            var y = point.y - startY;
            line.lineTo(x, y);
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

        out.x = minX;
        out.y = minY;
        out.width = maxX - minX;
        out.height = maxY - minY;

        return out;
    };

    var GlobalBounds = new Rectangle$1();

    var SetSizeFromBounds = function (line, bounds) {
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
        var point = this.points[0];
        this.setPosition(point.x, point.y);
        line.offset(-x, -y);
    };

    var ShapesUpdateMethods = {
        buildShapes() {
            this
                .addShape(new Lines());
        },

        updateShapes() {
            // Set style
            var line = this.getShapes()[0]
                .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha);

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
                DrawBezierCurve.call(this, line);
            } else if (this.lineType === POLYLINE) {
                DrawPolyLine.call(this, line);
            } else {
                DrawSpinleCurve.call(this, line);
            }

            this.bounds = GetBounds.call(this, line.pathData, true);
            SetSizeFromBounds.call(this, line);
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
        ShapesUpdateMethods,
        SetInteractiveMethods
    );

    class Line extends BaseShapes {
        constructor(scene, points, lineWidth, color, alpha, lineType) {
            var pointRadius;
            if (points !== undefined) {
                if (typeof (points) === 'number') {
                    lineType = alpha;
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
            this.type = 'rexPath';
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

            this.points = points;
            this.dirty = true;

            if (this.geom.length > 0) {
                this.updateData();
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
                this.updateData();
            }

            return this;
        }
    }

    const CURVETYPE_MAP = {
        bezier: BEZIER,

        spline: SPLINE,

        polyline: POLYLINE,
        poly: POLYLINE,

        straightline: STRAIGHTLINE,
        straight: STRAIGHTLINE,
    };

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
