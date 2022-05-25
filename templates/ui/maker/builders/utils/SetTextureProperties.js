const ProperiteList = ['tint', 'alpha', 'visible', 'flipX', 'flipY'];

var SetTextureProperties = function (gameObject, data) {
    for (var i = 0, cnt = ProperiteList.length; i < cnt; i++) {
        var key = ProperiteList[i];
        var value = data[key];
        if (value !== undefined) {
            gameObject[key] = value;
        }
    }
    return gameObject;
}

export default SetTextureProperties;