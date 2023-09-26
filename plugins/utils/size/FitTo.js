var FitTo = function (source, target, scaleUp, out) {
    if (scaleUp === undefined) {
        scaleUp = true;
    }

    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalSize;
    }

    var sourceWidth = source.width,
        sourceHeight = source.height,
        targetWidth = target.width,
        targetHeight = target.height;

    if ((sourceWidth <= targetWidth) && (sourceHeight <= targetHeight)) {
        if (scaleUp) {
            var sourceRatio = sourceWidth / sourceHeight;
            var targetRatio = targetWidth / targetHeight;
            if (targetRatio < sourceRatio) {
                out.width = targetWidth;
                out.height = targetWidth / sourceRatio;
            } else if (targetRatio > sourceRatio) {
                out.width = targetHeight * sourceRatio;
                out.height = targetHeight;
            } else {
                out.width = targetWidth;
                out.height = targetHeight;
            }

        } else {
            out.width = sourceWidth;
            out.height = sourceHeight;
        }

    } else {
        var sourceRatio = sourceWidth / sourceHeight;
        out.width = Math.min(sourceWidth, targetWidth);
        out.height = Math.min(sourceHeight, targetHeight);
        var ratio = out.width / out.height;

        if (ratio < sourceRatio) {
            out.height = out.width / sourceRatio;
        } else if (ratio > sourceRatio) {
            out.width = out.height * sourceRatio;
        }
    }

    return out;
}

var globalSize = {};

export default FitTo;