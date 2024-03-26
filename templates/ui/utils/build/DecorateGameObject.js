const Properties = [
    'alpha', 'tint'
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

    return gameObject;
}

export default DecorateGameObject;