import Scale from './scale.js';

var ScaleDownDestroy = function (gameObject, duration, orientation, ease) {
    defaultConfig.mode = 1;
    switch (orientation) {
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
    defaultConfig.ease = (ease === undefined) ? 'Linear' : ease;
    var scale = new Scale(gameObject, defaultConfig);
    scale.start();
    return scale;
};

var defaultConfig = {}; // reuse this config

export default ScaleDownDestroy;