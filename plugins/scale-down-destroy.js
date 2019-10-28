import Scale from './scale.js';

var ScaleDownDestroy = function (gameObject, duration, orientation, ease, destroyMode, scale) {
    if (destroyMode instanceof Scale) {
        scale = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = true;
    }

    defaultConfig.mode = (destroyMode) ? 1 : 0;
    switch (orientation) {
        case 0:
        case 'x':
            defaultConfig.end = {
                x: 0
            };
            break;
        case 1:
        case 'y':
            defaultConfig.end = {
                y: 0
            };
            break;
        default:
            defaultConfig.end = 0;
            break;
    }
    defaultConfig.duration = duration;
    defaultConfig.ease = (ease === undefined) ? 'Linear' : ease;

    if (scale === undefined) {
        scale = new Scale(gameObject, defaultConfig);
    } else {
        scale.resetFromJSON(defaultConfig);
    }
    scale.restart();

    return scale;
};

var defaultConfig = {}; // reuse this config

export default ScaleDownDestroy;