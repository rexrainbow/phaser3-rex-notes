import EaseMove from './behaviors/easemove/EaseMove.js';

var EaseMoveTo = function (gameObject, duration, endX, endY, ease, destroyMode, easeMove) {
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

var EaseMoveToDestroy = function (gameObject, duration, startX, startY, ease, easeMove) {
    return EaseMoveTo(gameObject, duration, startX, startY, ease, true, easeMove);
}

var EaseMoveFrom = function (gameObject, duration, startX, startY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    var config = {};
    config.mode = (destroyMode) ? 1 : 0;
    if (startX !== undefined) {
        config.startX = ParseValue(startX, gameObject.x);
        config.endX = gameObject.x;
    }
    if (startY !== undefined) {
        config.startY = ParseValue(startY, gameObject.y);
        config.endY = gameObject.y;
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
}

var EaseMoveFromDestroy = function (gameObject, duration, startX, startY, ease, easeMove) {
    return EaseMoveFrom(gameObject, duration, startX, startY, ease, true, easeMove);
}

var ParseValue = function (propertyValue, startValue) {
    // propertyValue : number or string
    if (typeof (propertyValue) === 'number') {
        return propertyValue;
    } else {
        var op = propertyValue[0];
        var num = parseFloat(propertyValue.substr(2));
        switch (op) {
            case '+': return startValue + num;
            case '-': return startValue - num;
            case '*': return startValue * num;
            case '/': return startValue / num;
        }
    }
}

export { EaseMove, EaseMoveTo, EaseMoveToDestroy, EaseMoveFrom, EaseMoveFromDestroy };