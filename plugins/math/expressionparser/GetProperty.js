var GetProperty = function (context, key, defaultValue, dotMode) {
    if (!context || typeof (context) === 'number' || typeof (context) === 'string') {
        return defaultValue;
    } else if (HasProperty(context, key)) {
        return context[key];
    } else if (dotMode && key.indexOf('.') !== -1) {
        var keys = key.split('.');
        var value = context;
        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (HasProperty(value, key)) {
                value = value[key];
            }
            else {
                value = defaultValue;
                break;
            }
        }

        return value;
    } else {
        return defaultValue;
    }
}

var HasProperty = function (obj, name) {
    return obj.hasOwnProperty(name) || obj[name];
}

export default GetProperty;