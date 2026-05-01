(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexroundrectangle = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

    /*
    shapeData: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$1 = phaser.Renderer.WebGL.Utils;

    var FillPathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
        // This is very similar to the FillPath RenderNode, but it already
        // has access to the Earcut indexes, so it doesn't need to calculate them.

        var fillTintColor = Utils$1.getTintAppendFloatAlpha(shapeData.fillColor, shapeData.fillAlpha * alpha);

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
            colors
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
    var Utils = phaser.Renderer.WebGL.Utils;

    var StrokePathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
        var strokeTintColor = Utils.getTintAppendFloatAlpha(shapeData.strokeColor, shapeData.strokeAlpha * alpha);
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
                strokeTintColor,
                strokeTintColor,
                strokeTintColor,
                strokeTintColor
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

    const GetCalcMatrix = phaser.GameObjects.GetCalcMatrix;

    var PolygonWebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
        if (src.dirty) {
            src.updateData();
            src.dirty = false;
        }

        var camera = drawingContext.camera;
        camera.addToRenderList(src);

        var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = src.alpha;

        var submitter = src.customRenderNodes.Submitter || src.defaultRenderNodes.Submitter;

        if (src.isFilled) {
            FillPathWebGL(drawingContext, submitter, calcMatrix, src, src, alpha, dx, dy);
        }

        if (src.isStroked) {
            StrokePathWebGL(drawingContext, submitter, calcMatrix, src, src, alpha, dx, dy);
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

    const SetTransform = phaser.Renderer.Canvas.SetTransform;

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

            if (src.isFilled) {
                FillPathCanvas(ctx, src, dx, dy);
            }

            if (src.isStroked) {
                StrokePathCanvas(ctx, src, dx, dy);
            }

            //  Restore the context saved in SetTransform
            ctx.restore();
        }
    };

    var Render = {
        renderWebGL: PolygonWebGLRenderer,
        renderCanvas: PolygonCanvasRenderer

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

    var Methods = {
        buildStrokePath: BuildStrokePath
    };
    Object.assign(
        Methods,
        StrokePathConfigMethods,
    );

    const Shape = phaser.GameObjects.Shape;

    class PolygnBase extends Shape {
        init() {
            this.isDashed = false;
            this.strokePathData = undefined;
            this.strokePathMask = undefined;
            this.dashPattern = undefined;
            this.dashOffset = 0;
        }

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
            // Update this.pathData
            this.buildStrokePath();
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
        Methods,
        Render
    );

    const GetValue$1 = phaser.Utils.Objects.GetValue;

    let RoundRectangle$1 = class RoundRectangle {
        constructor(x, y, width, height, radiusConfig) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = 0; }
            if (radiusConfig === undefined) { radiusConfig = 0; }

            this.cornerRadius = {};
            this._width = 0;
            this._height = 0;
            this.setTo(x, y, width, height, radiusConfig);
        }

        setTo(x, y, width, height, radiusConfig) {
            this.setPosition(x, y);
            this.setRadius(radiusConfig);
            this.setSize(width, height);
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get minWidth() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
        }

        get minHeight() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
        }

        get width() {
            return this._width;
        }

        set width(value) {
            if (value == null) {
                value = 0;
            }
            this._width = Math.max(value, this.minWidth);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            if (value == null) {
                value = 0;
            }
            this._height = Math.max(value, this.minHeight);
        }

        get radius() {
            var radius = this.cornerRadius;
            return Math.max(
                radius.tl.x, radius.tl.y,
                radius.tr.x, radius.tr.y,
                radius.bl.x, radius.bl.y,
                radius.br.x, radius.br.y
            );
        }

        set radius(value) {
            var defaultRadiusX, defaultRadiusY;
            if (typeof (value) === 'number') {
                defaultRadiusX = value;
                defaultRadiusY = value;
            } else {
                defaultRadiusX = GetValue$1(value, 'x', 0);
                defaultRadiusY = GetValue$1(value, 'y', 0);
            }

            var radius = this.cornerRadius;
            radius.tl = GetRadius(GetValue$1(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(GetValue$1(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(GetValue$1(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(GetValue$1(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
        }

        get radiusTL() {
            var radius = this.cornerRadius.tl;
            return Math.max(radius.x, radius.y);
        }

        set radiusTL(value) {
            SetRadius(this.cornerRadius.tl, value);
        }

        get radiusTR() {
            var radius = this.cornerRadius.tr;
            return Math.max(radius.x, radius.y);
        }

        set radiusTR(value) {
            SetRadius(this.cornerRadius.tr, value);
        }

        get radiusBL() {
            var radius = this.cornerRadius.bl;
            return Math.max(radius.x, radius.y);
        }

        set radiusBL(value) {
            SetRadius(this.cornerRadius.bl, value);
        }

        get radiusBR() {
            var radius = this.cornerRadius.br;
            return Math.max(radius.x, radius.y);
        }

        set radiusBR(value) {
            SetRadius(this.cornerRadius.br, value);
        }
    };

    var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
        if (radius === undefined) {
            radius = {
                x: defaultRadiusX,
                y: defaultRadiusY
            };
        } else if (typeof (radius) === 'number') {
            radius = {
                x: radius,
                y: radius
            };
        }

        SetConvex(radius);
        return radius;

    };

    var SetRadius = function (radius, value) {
        if (typeof (value) === 'number') {
            radius.x = value;
            radius.y = value;
        } else {
            radius.x = GetValue$1(value, 'x', 0);
            radius.y = GetValue$1(value, 'y', 0);
        }

        SetConvex(radius);
    };

    var SetConvex = function (radius) {
        radius.convex = (radius.x >= 0) || (radius.y >= 0);

        radius.x = Math.abs(radius.x);
        radius.y = Math.abs(radius.y);
    };

    var IsArcCorner = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
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

    const DegToRad = phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad(deltaAngle) / iteration;
        startAngle = DegToRad(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
        }
        return pathData;
    };

    const IsPlainObject = phaser.Utils.Objects.IsPlainObject;
    const GetValue = phaser.Utils.Objects.GetValue;
    const Earcut = phaser.Geom.Polygon.Earcut;

    class RoundRectangle extends PolygnBase {
        constructor(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
            var strokeColor, strokeAlpha, strokeWidth, shapeType;
            var dashPattern, dashOffset;
            if (IsPlainObject(x)) {
                var config = x;

                x = config.x;
                y = config.y;
                width = config.width;
                height = config.height;
                radiusConfig = config.radius;
                fillColor = config.color;
                fillAlpha = config.alpha;

                strokeColor = config.strokeColor;
                strokeAlpha = config.strokeAlpha;
                strokeWidth = config.strokeWidth;

                shapeType = config.shape;

                dashPattern = config.dashPattern;
                dashOffset = config.dashOffset;
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 1; }
            if (height === undefined) { height = width; }
            if (radiusConfig === undefined) { radiusConfig = 0; }
            if (shapeType === undefined) { shapeType = 0; }

            var geom = new RoundRectangle$1();  // Configurate it later
            super(scene, 'rexRoundRectangleShape', geom);
            this.init();

            this.setShapeType(shapeType);

            if (this.shapeType === 0) {
                var radius = GetValue(radiusConfig, 'radius', radiusConfig);
                geom.setTo(0, 0, width, height, radius);
            } else {
                var radius = { x: (width / 2), y: (height / 2) };
                geom.setTo(0, 0, width, height, radius);
            }

            this.setIteration(GetValue(radiusConfig, 'iteration', undefined));
            this.setPosition(x, y);

            this.setFillStyle(fillColor, fillAlpha);

            if (strokeWidth === undefined) {
                strokeWidth = 2;
            }
            this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

            if (dashPattern) {
                this.setDashPattern(dashPattern, dashOffset);
            }

            this.updateDisplayOrigin();
            this.dirty = true;
        }

        updateData() {
            var geom = this.geom;
            var pathData = this.pathData;

            pathData.length = 0;

            var width = geom.width,
                height = geom.height,
                cornerRadius = geom.cornerRadius,
                radius,
                iteration = this.iteration + 1;

            // Top-left
            radius = cornerRadius.tl;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = radius.x;
                    var centerY = radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
                } else {
                    var centerX = 0;
                    var centerY = 0;
                    ArcTo(centerX, centerY, radius.x, radius.y, 90, 0, true, iteration, pathData);
                }
            } else {
                LineTo(0, 0, pathData);
            }

            // Top-right
            radius = cornerRadius.tr;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = width - radius.x;
                    var centerY = radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
                } else {
                    var centerX = width;
                    var centerY = 0;
                    ArcTo(centerX, centerY, radius.x, radius.y, 180, 90, true, iteration, pathData);
                }
            } else {
                LineTo(width, 0, pathData);
            }

            // Bottom-right
            radius = cornerRadius.br;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = width - radius.x;
                    var centerY = height - radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
                } else {
                    var centerX = width;
                    var centerY = height;
                    ArcTo(centerX, centerY, radius.x, radius.y, 270, 180, true, iteration, pathData);
                }
            } else {
                LineTo(width, height, pathData);
            }

            // Bottom-left
            radius = cornerRadius.bl;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = radius.x;
                    var centerY = height - radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
                } else {
                    var centerX = 0;
                    var centerY = height;
                    ArcTo(centerX, centerY, radius.x, radius.y, 360, 270, true, iteration, pathData);
                }
            } else {
                LineTo(0, height, pathData);
            }

            pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
            this.pathIndexes = Earcut(pathData);

            super.updateData();

            return this;
        }

        setShapeType(shapeType) {
            if (typeof (shapeType) === 'string') {
                shapeType = ShapeTypeMap[shapeType];
            }

            this.shapeType = shapeType;
            return this;
        }

        setSize(width, height) {
            // Override Shape's setSize method
            if (height === undefined) {
                height = width;
            }
            if ((this.geom.width === width) && (this.geom.height === height)) {
                return this;
            }
            this.geom.setSize(width, height);

            if (this.shapeType === 1) {
                this.setRadius({ x: (width / 2), y: (height / 2) });
            }

            this.updateDisplayOrigin();
            this.dirty = true;

            super.setSize(width, height);
            return this;
        }

        get radius() {
            return this.geom.radius;
        }

        set radius(value) {
            this.geom.setRadius(value);
            this.updateDisplayOrigin();
            this.dirty = true;
        }

        get radiusTL() {
            return this.geom.radiusTL;
        }

        set radiusTL(value) {
            this.geom.radiusTL = value;
            this.dirty = true;
        }

        get radiusTR() {
            return this.geom.radiusTR;
        }

        set radiusTR(value) {
            this.geom.radiusTR = value;
            this.dirty = true;
        }

        get radiusBL() {
            return this.geom.radiusBL;
        }

        set radiusBL(value) {
            this.geom.radiusBL = value;
            this.dirty = true;
        }

        get radiusBR() {
            return this.geom.radiusBR;
        }

        set radiusBR(value) {
            this.geom.radiusBR = value;
            this.dirty = true;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setRadiusTL(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusTL = value;
            return this;
        }

        setRadiusTR(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusTR = value;
            return this;
        }

        setRadiusBL(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusBL = value;
            return this;
        }

        setRadiusBR(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusBR = value;
            return this;
        }

        get cornerRadius() {
            return this.geom.cornerRadius;
        }

        set cornerRadius(value) {
            this.radius = value;
        }

        setCornerRadius(value) {
            return this.setRadius(value);
        }

        get iteration() {
            return this._iteration;
        }

        set iteration(value) {
            // Set iteration first time
            if (this._iteration === undefined) {
                this._iteration = value;
                return;
            }

            // Change iteration value
            if (this._iteration === value) {
                return;
            }

            this._iteration = value;
            this.dirty = true;
        }

        setIteration(iteration) {
            if (iteration === undefined) {
                iteration = 6;
            }
            this.iteration = iteration;
            return this;
        }

    }

    const ShapeTypeMap = {
        rectangle: 0,
        circle: 1
    };

    return RoundRectangle;

}));
