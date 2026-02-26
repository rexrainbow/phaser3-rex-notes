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

export default BuildDashStroke;
