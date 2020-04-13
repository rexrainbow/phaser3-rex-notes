import EaseMove from './behaviors/easemove/EaseMove.js';

var EaseMoveTo = function (gameObject, duration, endX, endY, ease, destroyMode, easeMove) {
    if (destroyMode instanceof EaseMove) {
        easeMove = destroyMode;
        destroyMode = undefined;
    }

    if (destroyMode === undefined) {
        destroyMode = false;
    }

    defaultConfig.mode = (destroyMode) ? 1 : 0;
    if (endX !== undefined) {
        defaultConfig.startX = gameObject.x;
        defaultConfig.endX = ParseValue(endX, gameObject.x);
    }
    if (endY !== undefined) {
        defaultConfig.startY = gameObject.y;
        defaultConfig.endY = ParseValue(endY, gameObject.y);
    }
    defaultConfig.duration = duration;
    defaultConfig.ease = (ease === undefined) ? 'Linear' : ease;

    if (easeMove === undefined) {
        easeMove = new EaseMove(gameObject, defaultConfig);
    } else {
        easeMove.resetFromJSON(defaultConfig);
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

    defaultConfig.mode = (destroyMode) ? 1 : 0;
    if (startX !== undefined) {
        defaultConfig.startX = ParseValue(startX, gameObject.x);
        defaultConfig.endX = gameObject.x;
    }
    if (startY !== undefined) {
        defaultConfig.startY = ParseValue(startY, gameObject.y);
        defaultConfig.endY = gameObject.y;
    }
    defaultConfig.duration = duration;
    defaultConfig.ease = (ease === undefined) ? 'Linear' : ease;

    if (easeMove === undefined) {
        easeMove = new EaseMove(gameObject, defaultConfig);
    } else {
        easeMove.resetFromJSON(defaultConfig);
    }
    easeMove.restart();

    return easeMove;
}

var EaseMoveFromDestroy = function (gameObject, duration, startX, startY, ease, easeMove) {
    return EaseMoveFrom(gameObject, duration, startX, startY, ease, true, easeMove);
}

var ParseValue = function (propertyValue, startValue) {
    if (propertyValue === undefined) {
        return undefined;
    } else if (typeof (propertyValue) === 'number') {
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

var defaultConfig = {}; // reuse this config

export { EaseMove, EaseMoveTo, EaseMoveToDestroy, EaseMoveFrom, EaseMoveFromDestroy };