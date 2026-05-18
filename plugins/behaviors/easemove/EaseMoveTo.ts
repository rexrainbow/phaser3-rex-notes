import EaseMove from './EaseMove';
import ParseValue from './ParseValue';

var EaseMoveTo = function(gameObject?: any, duration?: any, endX?: any, endY?: any, ease?: any, destroyMode?: any, easeMove?: any) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    var config = {};
    config.mode = (destroyMode) ? 1 : 0;
    if (endX !== undefined) {
        config.startX = gameObject.x;
        config.endX = ParseValue(endX, gameObject.x);
    }
    if (endY !== undefined) {
        config.startY = gameObject.y;
        config.endY = ParseValue(endY, gameObject.y);
    }
    config.duration = duration;
    config.ease = (ease === undefined) ? 'Linear' : ease;

    if (easeMove === undefined) {
        easeMove = new EaseMove(gameObject, config);
    } else {
        easeMove.resetFromJSON(config);
    }
    easeMove.restart();

    return easeMove;
};

export default EaseMoveTo;