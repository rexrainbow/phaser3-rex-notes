import { GameObjects, Renderer, Utils as Utils$3, Geom, Math as Math$1, Plugins } from 'phaser';

const GetCalcMatrix = GameObjects.GetCalcMatrix;

var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
    src.updateData();

    var camera = drawingContext.camera;
    camera.addToRenderList(src);

    var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

    var dx = src._displayOriginX;
    var dy = src._displayOriginY;

    var alpha = src.alpha;

    var submitter = src.customRenderNodes.Submitter || src.defaultRenderNodes.Submitter;

    var shapes = src.geom,
        shape;
    for (var i = 0, cnt = shapes.length; i < cnt; i++) {
        shape = shapes[i];
        if (shape.visible) {
            shape.webglRender(drawingContext, submitter, calcMatrix, src, alpha, dx, dy);
        }
    }
};

const SetTransform = Renderer.Canvas.SetTransform;

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

const Shape = GameObjects.Shape;
const RemoveItem = Utils$3.Array.Remove;

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

    webglRender(drawingContext, submitter, gameObject, calcMatrix, alpha, dx, dy) {

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
shapeData: {
    fillColor, 
    fillAlpha, 
    pathData, 
    pathIndexes  // Earcut(pathData)
}
*/

var Utils$2 = Renderer.WebGL.Utils;

var FillPathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
    // This is very similar to the FillPath RenderNode, but it already
    // has access to the Earcut indexes, so it doesn't need to calculate them.

    var fillTintColor = Utils$2.getTintAppendFloatAlpha(shapeData.fillColor, shapeData.fillAlpha * alpha);

    var path = shapeData.pathData;
    var pathIndexes = shapeData.pathIndexes;

    var length = path.length;
    var pathIndex, pointX, pointY, x, y;

    var vertices = Array(length * 2);
    var colors = Array(length);

    var verticesIndex = 0;
    var colorsIndex = 0;

    for (pathIndex = 0; pathIndex < length; pathIndex += 2) {
        pointX = path[pathIndex] - dx;
        pointY = path[pathIndex + 1] - dy;

        // Transform the point.
        x = calcMatrix.getX(pointX, pointY);
        y = calcMatrix.getY(pointX, pointY);

        vertices[verticesIndex++] = x;
        vertices[verticesIndex++] = y;
        colors[colorsIndex++] = fillTintColor;
    }

    submitter.batch(
        drawingContext,
        pathIndexes,
        vertices,
        colors,
        gameObject.lighting
    );
};

/*
shapeData: {
    strokeColor,
    strokeAlpha,
    pathData,
    lineWidth,
    closePath,
    isDashed,
    strokePathData,
    strokePathMask
}
*/
var Utils$1 = Renderer.WebGL.Utils;

var StrokePathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
    var strokeTintColor = Utils$1.getTintAppendFloatAlpha(shapeData.strokeColor, shapeData.strokeAlpha * alpha);
    var strokePath = gameObject.customRenderNodes.StrokePath || gameObject.defaultRenderNodes.StrokePath;

    var lineWidth = shapeData.lineWidth;
    var openPath = !shapeData.closePath;
    var isDashed = shapeData.isDashed && !!shapeData.strokePathData && !!shapeData.strokePathMask;

    // Helper method
    var RunStrokePath = function (pointPath, pathIsOpen) {
        if (pointPath.length < 2) {
            return;
        }

        strokePath.run(
            drawingContext,
            submitter,
            pointPath,
            lineWidth,
            pathIsOpen,
            calcMatrix,
            strokeTintColor, strokeTintColor, strokeTintColor, strokeTintColor,
            undefined,
            gameObject.lighting
        );
    };

    if (!isDashed) {
        // Default behavior
        var path = shapeData.pathData;
        if (!path || path.length < 4) {
            return;
        }
        var pathLength = path.length - 1;

        // Don't add the last point to open paths.
        if (openPath) {
            pathLength -= 2;
        }

        var pointPath = [];
        for (var i = 0; i < pathLength; i += 2) {
            pointPath.push({
                x: path[i] - dx,
                y: path[i + 1] - dy,
                width: lineWidth
            });
        }

        RunStrokePath(pointPath, openPath);

    } else {
        // Dashed path data is a sequence of segment endpoints with a per-segment draw mask.
        var dashedPath = shapeData.strokePathData;
        if (!dashedPath || dashedPath.length < 4) {
            return;
        }
        var strokePathMask = shapeData.strokePathMask;
        var dashedPathLength = dashedPath.length - 1;

        if (openPath) {
            dashedPathLength -= 2;
        }

        var px1 = dashedPath[0] - dx;
        var py1 = dashedPath[1] - dy;

        var drawMaskIdx = 0;
        var pointPath = [];

        for (var j = 2; j < dashedPathLength; j += 2) {
            var px2 = dashedPath[j] - dx;
            var py2 = dashedPath[j + 1] - dy;

            // Build continuous line segments (pointPath)
            if (strokePathMask[drawMaskIdx]) {
                if (
                    pointPath.length === 0 ||
                    pointPath[pointPath.length - 1].x !== px1 ||
                    pointPath[pointPath.length - 1].y !== py1
                ) {
                    pointPath.push({
                        x: px1,
                        y: py1,
                        width: lineWidth
                    });
                }

                pointPath.push({
                    x: px2,
                    y: py2,
                    width: lineWidth
                });
            } else {
                RunStrokePath(pointPath, true);
                pointPath = [];

            }

            px1 = px2;
            py1 = py2;
            drawMaskIdx++;
        }

        RunStrokePath(pointPath, true);
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

/*
src: {
    fillColor,
    fillAlpha,
    pathData,
    closePath
}
*/
var FillPathCanvas = function (ctx, src, dx, dy) {
    var path = src.pathData;
    if (!path || (path.length < 4)) {
        return;
    }

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

    if (src.closePath) {
        ctx.closePath();
    }

    FillStyleCanvas(ctx, src);
    ctx.fill();
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

/*
src: {
    strokeColor,
    strokeAlpha,
    pathData,
    lineWidth,
    closePath,
    isDashed,
    strokePathData,
    strokePathMask
}
*/
var StrokePathCanvas = function (ctx, src, dx, dy) {
    var isDashed = src.isDashed && !!src.strokePathData;
    var path = (!isDashed) ? src.pathData : src.strokePathData;
    if (!path || (path.length < 4)) {
        return;
    }

    var pathLength = path.length - 1;
    var px1 = path[0] - dx;
    var py1 = path[1] - dy;

    LineStyleCanvas(ctx, src);
    ctx.beginPath();

    if (!src.closePath) {
        pathLength -= 2;
    }

    if (!isDashed) {
        // Default behavior
        ctx.moveTo(px1, py1);
        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;
            ctx.lineTo(px2, py2);
        }

        if (src.closePath) {
            ctx.closePath();
        }

    } else {
        // Draw dashed line
        var strokePathMask = src.strokePathMask;
        var drawMaskIdx = 0;

        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;

            if (strokePathMask[drawMaskIdx]) {
                ctx.moveTo(px1, py1);
                ctx.lineTo(px2, py2);
            }

            px1 = px2;
            py1 = py2;
            drawMaskIdx++;
        }
    }

    ctx.stroke();
};

const EPSILON = 1e-6;
const DEFAULT_SEGMENT_COUNT = 10;
const DEFAULT_DRAW_RATIO = 0.5;

var NormalizeDashArray = function (dashPattern) {
    if (!Array.isArray(dashPattern)) {
        return null;
    }

    var normalized = [];
    for (var i = 0, cnt = dashPattern.length; i < cnt; i++) {
        var d = Number(dashPattern[i]);
        if (isFinite(d) && (d > 0)) {
            normalized.push(d);
        }
    }

    return (normalized.length > 0) ? normalized : null;
};

var BuildAutoDashPattern = function (dashPattern, totalPathLength) {
    var {
        segments = DEFAULT_SEGMENT_COUNT,
        drawRatio = DEFAULT_DRAW_RATIO
    } = dashPattern;

    segments = Math.round(segments);
    if (!isFinite(segments) || (segments <= 0)) {
        return null;
    }

    if (!(totalPathLength > EPSILON)) {
        return null;
    }

    var segmentLength = totalPathLength / segments;
    if (!(segmentLength > EPSILON)) {
        return null;
    }

    drawRatio = Math.max(0, Math.min(1, drawRatio));

    if (drawRatio >= (1 - EPSILON)) {
        // 100% draw ratio becomes a solid stroke.
        return null;
    }

    var drawLength = segmentLength * drawRatio;
    if (drawLength <= EPSILON) {
        drawLength = EPSILON;
    }

    var gapLength = segmentLength - drawLength;
    if (gapLength <= EPSILON) {
        return null;
    }

    return [drawLength, gapLength];
};

var NormalizeDashPattern = function (dashPattern, totalPathLength) {
    return NormalizeDashArray(dashPattern) || BuildAutoDashPattern(dashPattern, totalPathLength);
};

var WrapOffset = function (offset, totalLength) {
    if (!isFinite(offset)) {
        offset = 0;
    }

    offset = offset % totalLength;
    if (offset < 0) {
        offset += totalLength;
    }

    return offset;
};

var ForEachStrokeSegment = function (pathData, closePath, callback) {
    if ((!pathData) || (pathData.length < 4)) {
        return;
    }

    var pathLength = pathData.length - 1;
    if (!closePath) {
        pathLength -= 2;
    }

    if (pathLength < 2) {
        return;
    }

    var px1 = pathData[0];
    var py1 = pathData[1];

    for (var i = 2; i < pathLength; i += 2) {
        var px2 = pathData[i];
        var py2 = pathData[i + 1];

        callback(px1, py1, px2, py2);

        px1 = px2;
        py1 = py2;
    }
};

var GetTotalPathLength = function (pathData, closePath) {
    var totalLength = 0;
    ForEachStrokeSegment(pathData, closePath, function (x0, y0, x1, y1) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        totalLength += Math.sqrt((dx * dx) + (dy * dy));
    });
    return totalLength;
};

var BuildDashStroke = function (pathData, config, out) {
    if (config === undefined) {
        config = {};
    }
    if (out === undefined) {
        out = {};
    }

    var {
        closePath = false,
        dashPattern,
        dashOffset = 0,
    } = config;

    var totalPathLength = GetTotalPathLength(pathData, closePath);
    dashPattern = NormalizeDashPattern(dashPattern, totalPathLength);

    // No valid dash pattern -> keep original stroke path, disable mask.
    if (dashPattern === null) {
        return null;
    }

    var strokePathData = [];
    var strokePathMask = [];

    var totalPatternLength = 0;
    for (var i = 0, cnt = dashPattern.length; i < cnt; i++) {
        totalPatternLength += dashPattern[i];
    }

    if (totalPatternLength <= EPSILON) {
        out.strokePathData = (pathData) ? pathData.slice() : [];
        out.strokePathMask = undefined;
        return out;
    }

    var patternIndex = 0;
    var draw = true;  // Pattern starts from a draw segment.
    var patternRemain = dashPattern[patternIndex];

    var AdvancePattern = function () {
        patternIndex = (patternIndex + 1) % dashPattern.length;
        draw = !draw;
        patternRemain = dashPattern[patternIndex];
    };

    var offset = WrapOffset(dashOffset, totalPatternLength);
    while (offset > EPSILON) {
        if (offset < (patternRemain - EPSILON)) {
            patternRemain -= offset;
            offset = 0;
        } else {
            offset -= patternRemain;
            AdvancePattern();
        }
    }

    var PushSegment = function (x0, y0, x1, y1, drawState) {
        if (strokePathData.length === 0) {
            strokePathData.push(x0, y0);
        } else {
            var lastX = strokePathData[strokePathData.length - 2];
            var lastY = strokePathData[strokePathData.length - 1];
            if ((lastX !== x0) || (lastY !== y0)) {
                strokePathData.push(x0, y0);
            }
        }

        strokePathData.push(x1, y1);
        strokePathMask.push(drawState ? 1 : 0);
    };

    ForEachStrokeSegment(pathData, closePath, function (x0, y0, x1, y1) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        var segLength = Math.sqrt((dx * dx) + (dy * dy));

        if (segLength <= EPSILON) {
            return;
        }

        var traveled = 0;
        while (traveled < (segLength - EPSILON)) {
            var step = Math.min(patternRemain, segLength - traveled);
            if (step <= EPSILON) {
                AdvancePattern();
                continue;
            }

            var t0 = traveled / segLength;
            var t1 = (traveled + step) / segLength;

            var sx = x0 + (dx * t0);
            var sy = y0 + (dy * t0);
            var ex = x0 + (dx * t1);
            var ey = y0 + (dy * t1);

            PushSegment(sx, sy, ex, ey, draw);

            traveled += step;
            patternRemain -= step;
            if (patternRemain <= EPSILON) {
                AdvancePattern();
            }
        }
    });

    // Keep the existing open-path convention in StrokePathWebGL:
    // an extra tail point is ignored by the renderer when closePath=false.
    if (!closePath && (strokePathData.length >= 2)) {
        strokePathData.push(
            strokePathData[strokePathData.length - 2],
            strokePathData[strokePathData.length - 1]
        );
    }

    out.strokePathData = strokePathData;
    out.strokePathMask = strokePathMask;

    return out;
};

var SetDashPattern = function (dashPattern, dashOffset) {
    // dashPattern: [draw, gap] , or {segments, drawRatio}
    this.dashPattern = dashPattern;
    this.dashOffset = dashOffset || 0;
    this.isDashed = !!dashPattern;
    return this;
};

var ClearDashPattern = function () {
    this.setDashPattern();
    return this;
};

var SetDashed = function (enable) {
    if (enable === undefined) {
        enable = true;
    }

    this.isDashed = enable;
    return this;
};

var BuildStrokePath = function () {
    if (this.isDashed) {
        var result = BuildDashStroke(this.pathData, {
            closePath: this.closePath,
            dashPattern: this.dashPattern,
            dashOffset: this.dashOffset
        }, this);

        if (result) {
            this.strokePathData = result.strokePathData;
            this.strokePathMask = result.strokePathMask;
        } else {
            this.isDashed = false;
        }

    }

    return this;
};

var StrokePathConfigMethods = {
    setDashPattern: SetDashPattern,
    clearDashPattern: ClearDashPattern,
    setDashed: SetDashed
};

var Methods$1 = {
    buildStrokePath: BuildStrokePath
};
Object.assign(
    Methods$1,
    StrokePathConfigMethods,
);

const Earcut$1 = Geom.Polygon.Earcut;

class PathBase extends BaseGeom {
    constructor() {
        super();

        this.pathData = [];

        this.isDashed = false;
        this.strokePathData = undefined;
        this.strokePathMask = undefined;
        this.dashPattern = undefined;
        this.dashOffset = 0;

        this.pathIndexes = [];
        this.closePath = false;
    }

    updateData() {
        this.pathIndexes = Earcut$1(this.pathData);

        super.updateData();

        this.buildStrokePath();
        return this;
    }

    webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
        if (this.isFilled) {
            FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }

        if (this.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillPathCanvas(ctx, this, dx, dy);
        }

        if (this.isStroked) {
            StrokePathCanvas(ctx, this, dx, dy);
        }
    }
}

Object.assign(
    PathBase.prototype,
    Methods$1,
);

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

const DegToRad$1 = Math$1.DegToRad;

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

Math$1.DegToRad;

var StartAt = function (x, y, pathData) {
    pathData.length = 0;

    if (x != null) {
        pathData.push(x, y);
    }

    return pathData;
};

//import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

const QuadraticBezierInterpolation = Math$1.Interpolation.QuadraticBezier;

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

const CubicBezierInterpolation = Math$1.Interpolation.CubicBezier;

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

const CatmullRomInterpolation = Math$1.Interpolation.CatmullRom;

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

const ControlTypeQuadratic = 'quadratic';
const ControlTypeCubic = 'cubic';

var WarnPathTypeMismatch = function (methodName, expectedControlType) {
    if (!this.pathTypeMismatchWarningEnable) {
        return;
    }

    if ((typeof console === 'undefined') || !console.warn) {
        return;
    }

    console.warn(
        methodName +
        ' path type mismatch: expected previous control type to be ' +
        expectedControlType +
        ', got ' +
        (this.lastControlType || 'none') +
        '. Falling back to current point as control point.'
    );
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
        this.resetControlPoint();

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
        this.resetControlPoint();
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
        this.resetControlPoint();
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
        this.lastCX = cx;
        this.lastCY = cy;
        this.lastControlType = ControlTypeQuadratic;
        return this;
    },

    smoothQuadraticBezierTo(x, y) {
        var cx, cy;
        if (this.lastControlType === ControlTypeQuadratic) {
            cx = this.lastPointX * 2 - this.lastCX;
            cy = this.lastPointY * 2 - this.lastCY;
        } else {
            WarnPathTypeMismatch.call(
                this,
                'smoothQuadraticBezierTo()',
                ControlTypeQuadratic
            );
            cx = this.lastPointX;
            cy = this.lastPointY;
        }

        this.quadraticBezierTo(cx, cy, x, y);
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
        this.lastCX = cx1;
        this.lastCY = cy1;
        this.lastControlType = ControlTypeCubic;
        return this;
    },

    smoothCubicBezierTo(cx1, cy1, x, y) {
        var cx0, cy0;
        if (this.lastControlType === ControlTypeCubic) {
            cx0 = this.lastPointX * 2 - this.lastCX;
            cy0 = this.lastPointY * 2 - this.lastCY;
        } else {
            WarnPathTypeMismatch.call(
                this,
                'smoothCubicBezierTo()',
                ControlTypeCubic
            );
            cx0 = this.lastPointX;
            cy0 = this.lastPointY;
        }

        this.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);
        return this;
    },

    catmullRomTo(...points) {
        CatmullRomTo(
            points,
            this.iterations,
            this.pathData
        );

        this.lastPointX = points[points.length - 2];
        this.lastPointY = points[points.length - 1];
        this.resetControlPoint();
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
        this.resetControlPoint();
        return this;
    },

    end() {
        DuplicateLast(this.pathData);
        this.resetControlPoint();
        return this;
    },

};

//import PointRotateAround from '../../utils/math/RotateAround.js';

const PointRotateAround$1 = Math$1.RotateAround;

var RotateAround = function (centerX, centerY, angle, pathData) {
    var point = { x: 0, y: 0 };
    for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
        point.x = pathData[i];
        point.y = pathData[i + 1];
        PointRotateAround$1(point, centerX, centerY, angle);
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

const DegToRad = Math$1.DegToRad;
const PointRotateAround = Math$1.RotateAround;

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

        if (this.lastCX !== undefined) {
            var point = { x: this.lastCX, y: this.lastCY };
            PointRotateAround(point, centerX, centerY, angle);
            this.lastCX = point.x;
            this.lastCY = point.y;
        }

        return this;
    },

    scale(centerX, centerY, scaleX, scaleY) {
        if (this.pathData.length === 0) {
            return this;
        }

        Scale(centerX, centerY, scaleX, scaleY, this.pathData);
        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];

        if (this.lastCX !== undefined) {
            this.lastCX = ((this.lastCX - centerX) * scaleX) + centerX;
            this.lastCY = ((this.lastCY - centerY) * scaleY) + centerY;
        }

        return this;
    },

    offset(x, y) {
        if (this.pathData.length === 0) {
            return this;
        }

        Offset(x, y, this.pathData);
        var pathDataCnt = this.pathData.length;
        this.lastPointX = this.pathData[pathDataCnt - 2];
        this.lastPointY = this.pathData[pathDataCnt - 1];

        if (this.lastCX !== undefined) {
            this.lastCX += x;
            this.lastCY += y;
        }

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
        this.firstPointX = this.pathData[0];
        this.firstPointY = this.pathData[1];
        this.lastPointX = this.pathData[this.pathData.length - 2];
        this.lastPointY = this.pathData[this.pathData.length - 1];
        this.resetControlPoint();
        return this;
    },
};

const DistanceBetween = Math$1.Distance.Between;
const Wrap = Math$1.Wrap;
const Linear = Math$1.Linear;

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

        this.firstPointX = this.pathData[0];
        this.firstPointY = this.pathData[1];
        this.lastPointX = this.pathData[this.pathData.length - 2];
        this.lastPointY = this.pathData[this.pathData.length - 1];
        this.resetControlPoint();
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
        this.resetControlPoint();
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

const Polygon = Geom.Polygon;

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
        this.lastCX = undefined;
        this.lastCY = undefined;
        this.lastControlType = undefined;
        this.pathTypeMismatchWarningEnable = true;
        this.accumulationLengths = undefined;
    }

    setIterations(iterations) {
        this.iterations = iterations;
        return this;
    }

    setPathTypeMismatchWarningEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.pathTypeMismatchWarningEnable = enable;
        return this;
    }

    resetControlPoint() {
        this.lastCX = this.lastPointX;
        this.lastCY = this.lastPointY;
        this.lastControlType = undefined;
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

    setPathTypeMismatchWarningEnable(enable) {
        this.builder.setPathTypeMismatchWarningEnable(enable);
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

    smoothQuadraticBezierTo(x, y) {
        this.builder.smoothQuadraticBezierTo(x, y);

        this.dirty = true;
        return this;
    }

    cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
        this.builder.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);

        this.dirty = true;
        return this;
    }

    smoothCubicBezierTo(cx1, cy1, x, y) {
        this.builder.smoothCubicBezierTo(cx1, cy1, x, y);

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

var Utils = Renderer.WebGL.Utils;

let Rectangle$2 = class Rectangle extends BaseGeom {
    constructor(x, y, width, height) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = 0; }
        if (height === undefined) { height = width; }

        super();

        this.pathData = [];

        this.isDashed = false;
        this.strokePathData = undefined;
        this.strokePathMask = undefined;
        this.dashPattern = undefined;
        this.dashOffset = 0;

        this.closePath = true;

        this.setTopLeftPosition(x, y);
        this.setSize(width, height);
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this.dirty = this.dirty || (this._x !== value);
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.dirty = this.dirty || (this._y !== value);
        this._y = value;
    }

    setTopLeftPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.dirty = this.dirty || (this._width !== value);
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.dirty = this.dirty || (this._height !== value);
        this._height = value;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }

    get centerX() {
        return this.x + (this.width / 2);
    }

    set centerX(value) {
        this.x = value - (this.width / 2);
    }

    get centerY() {
        return this.y + (this.height / 2);
    }

    set centerY(value) {
        this.y = value - (this.height / 2);
    }

    setCenterPosition(x, y) {
        this.centerX = x;
        this.centerY = y;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        var x0 = this.x,
            x1 = x0 + this.width,
            y0 = this.y,
            y1 = y0 + this.height;
        this.pathData.push(x0, y0);
        this.pathData.push(x1, y0);
        this.pathData.push(x1, y1);
        this.pathData.push(x0, y1);
        this.pathData.push(x0, y0);

        super.updateData();

        this.buildStrokePath();
        return this;
    }

    webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
        if (this.isFilled) {
            var fillTintColor = Utils.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * alpha);

            var FillRect = gameObject.customRenderNodes.FillRect || gameObject.defaultRenderNodes.FillRect;

            FillRect.run(
                drawingContext,
                calcMatrix,
                submitter,
                -dx + this.x,
                -dy + this.y,
                this.width,
                this.height,
                fillTintColor,
                fillTintColor,
                fillTintColor,
                fillTintColor
            );
        }

        if (this.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillStyleCanvas(ctx, this);
            ctx.fillRect(-dx, -dy, this.width, this.height);
        }

        if (this.isStroked) {
            StrokePathCanvas(ctx, this, dx, dy);
        }
    }
};

Object.assign(
    Rectangle$2.prototype,
    Methods$1,
);

Utils$3.Objects.GetValue;

const Earcut = Geom.Polygon.Earcut;

class Triangle extends BaseGeom {
    constructor(x0, y0, x1, y1, x2, y2) {
        if (x0 === undefined) { x0 = 0; }
        if (y0 === undefined) { y0 = 0; }
        if (x1 === undefined) { x1 = 0; }
        if (y1 === undefined) { y1 = 0; }
        if (x2 === undefined) { x2 = 0; }
        if (y2 === undefined) { y2 = 0; }

        super();

        this.pathData = [];

        this.isDashed = false;
        this.strokePathData = undefined;
        this.strokePathMask = undefined;
        this.dashPattern = undefined;
        this.dashOffset = 0;

        this.pathIndexes = [];
        this.closePath = true;

        this.setP0(x0, y0);
        this.setP1(x1, y1);
        this.setP2(x2, y2);
    }

    get x0() {
        return this._x0;
    }

    set x0(value) {
        this.dirty = this.dirty || (this._x0 !== value);
        this._x0 = value;
    }

    get y0() {
        return this._y0;
    }

    set y0(value) {
        this.dirty = this.dirty || (this._y0 !== value);
        this._y0 = value;
    }

    setP0(x, y) {
        this.x0 = x;
        this.y0 = y;
        return this;
    }

    get x1() {
        return this._x1;
    }

    set x1(value) {
        this.dirty = this.dirty || (this._x1 !== value);
        this._x1 = value;
    }

    get y1() {
        return this._y1;
    }

    set y1(value) {
        this.dirty = this.dirty || (this._y1 !== value);
        this._y1 = value;
    }

    setP1(x, y) {
        this.x1 = x;
        this.y1 = y;
        return this;
    }

    get x2() {
        return this._x2;
    }

    set x2(value) {
        this.dirty = this.dirty || (this._x2 !== value);
        this._x2 = value;
    }

    get y2() {
        return this._y2;
    }

    set y2(value) {
        this.dirty = this.dirty || (this._y2 !== value);
        this._y2 = value;
    }

    setP2(x, y) {
        this.dirty = this.dirty || (this.x2 !== x) || (this.y2 !== y);
        this.x2 = x;
        this.y2 = y;
        return this;
    }

    updateData() {
        this.pathData.length = 0;
        this.pathData.push(this.x0, this.y0);
        this.pathData.push(this.x1, this.y1);
        this.pathData.push(this.x2, this.y2);
        this.pathData.push(this.x0, this.y0);
        this.pathIndexes = Earcut(this.pathData);

        super.updateData();

        this.buildStrokePath();
        return this;
    }

    webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
        if (this.isFilled) {
            FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }

        if (this.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
        }
    }

    canvasRender(ctx, dx, dy) {
        if (this.isFilled) {
            FillPathCanvas(ctx, this, dx, dy);
        }

        if (this.isStroked) {
            StrokePathCanvas(ctx, this, dx, dy);
        }
    }
}

Object.assign(
    Triangle.prototype,
    Methods$1,
);

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

const Rectangle$1 = Geom.Rectangle;

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

        if (hasPath) {
            body.setDashPattern(this.dashPattern, this.dashOffset);
        }
    }
};

const LineToCircle = Geom.Intersects.LineToCircle;

const tmpLine = new Geom.Line();

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

const Rectangle = Geom.Rectangle;
const RectangleContains = Geom.Rectangle.Contains;
const SetInteractiveBase = GameObjects.GameObject.prototype.setInteractive;

const GlobPoint = new Geom.Circle();

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
    SetInteractiveMethods,
    StrokePathConfigMethods
);

class Line extends BaseShapes {
    constructor(scene, points, lineWidth, color, alpha, config) {
        var lineType, pointRadius;
        var headShape, headSize, headColor, headAlpha, headStrokeWidth, headStrokeColor, headStrokeAlpha;
        var tailShape, tailSize, tailColor, tailAlpha, tailStrokeWidth, tailStrokeColor, tailStrokeAlpha;
        var dashPattern, dashOffset;
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

        dashPattern = config.dashPattern;
        dashOffset = config.dashOffset;

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

        this.setDashPattern(dashPattern, dashOffset);

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

const GetAdvancedValue = Utils$3.Objects.GetAdvancedValue;
const GetValue = Utils$3.Objects.GetValue;
const BuildGameObject = GameObjects.BuildGameObject;

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
    if (
        (typeof keys === 'string' && keys.indexOf(delimiter) === -1) ||
        (typeof keys === 'number')
    ) {
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

class LinePlugin extends Plugins.BasePlugin {

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

export { LinePlugin as default };
