import Scale from './scale.js';

var PopUp = function (gameObject, duration, orientation, ease, scale) {
    var start;
    switch (orientation) {
        case 0:
        case 'x':
            start = { x: 0 };
            break;
        case 1:
        case 'y':
            start = { y: 0 };
            break;
        default:
            start = 0;
            break;
    }

    var config = {
        mode: 0,
        start: start,
        end: 1,
        duration: duration,
        ease: (ease === undefined) ? 'Cubic' : ease
    }

    if (scale === undefined) {
        scale = new Scale(gameObject, config);
    } else {
        scale.resetFromJSON(config);
    }
    scale.restart();

    return scale;
};

export default PopUp;