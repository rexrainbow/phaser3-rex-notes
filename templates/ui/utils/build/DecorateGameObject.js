const Properties = [
    'alpha', 'tint', 'flipX', 'flipY'
]

var DecorateGameObject = function (gameObject, config) {
    if (!config) {
        return gameObject;
    }

    for (var i = 0, cnt = Properties.length; i < cnt; i++) {
        var propertyName = Properties[i];
        if ((propertyName in config) && (propertyName in gameObject)) {
            gameObject[propertyName] = config[propertyName];
        }
    }

    if (('origin' in config) && ('originX' in gameObject)) {
        gameObject.setOrigin(config.origin);
    } else {
        var originX, originY;
        if (('originX' in config) && ('originX' in gameObject)) {
            originX = config.originX;
        }
        if (('originY' in config) && ('originY' in gameObject)) {
            originY = config.originY;
        }
        if ((originX !== undefined) && (originY !== undefined)) {
            gameObject.setOrigin(originX, originY);
        }
    }

    return gameObject;
}

export default DecorateGameObject;