import ResizeGameObject from './ResizeGameObject.js';
import IsGameObject from '../../utils/system/IsGameObject.js'

var FitTo = function (source, target, fitMode, out) {
    if (fitMode === undefined) {
        fitMode = 0;
    } else {
        var fitModeType = typeof (fitMode);
        if (fitModeType === 'boolean') {
            out = fitMode;
            fitMode = 0;
        } else if (fitModeType === 'string') {
            fitMode = FitModeMap[fitMode];
        }
    }

    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalSize;
    }

    var scaleX = target.width / source.width;
    var scaleY = target.height / source.height;
    var scale = (!fitMode) ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
    var newWidth = source.width * scale;
    var newHeight = source.height * scale;

    if (IsGameObject(out)) {
        ResizeGameObject(out, newWidth, newHeight);
    } else {
        out.width = newWidth;
        out.height = newHeight;
    }

    return out;
}

const FitModeMap = {
    'fit': 0,
    'FIT': 0,
    'envelop': 1,
    'ENVELOP': 1
}

var globalSize = {};

export default FitTo;