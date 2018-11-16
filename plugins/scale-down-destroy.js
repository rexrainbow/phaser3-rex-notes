import Scale from './scale.js';

var ScaleDownDestroy = function (gameObject, duration, axis) {
    defaultConfig.mode = 1;
    switch (axis) {
        case 'x':
            defaultConfig.end = {
                x: 0
            };
            break;
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
    var scale = new Scale(gameObject, defaultConfig);
    scale.start();
    return scale;
};

var defaultConfig = {}; // reuse this config

export default ScaleDownDestroy;