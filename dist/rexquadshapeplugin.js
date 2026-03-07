(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexquadshapeplugin = factory());
})(this, (function () { 'use strict';

    /*
    shapeData: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$1 = Phaser.Renderer.WebGL.Utils;

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
    var Utils = Phaser.Renderer.WebGL.Utils;

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

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

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

    const Shape = Phaser.GameObjects.Shape;

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
            this.init();

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

            super.updateData();

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
