var IsObjectLike = function (value) {
    var valueType = typeof (value);
    return value !== null && (valueType === 'object' || valueType === 'function');
}

var GetProperty = function (context, key, defaultValue, dotMode) {
    if (dotMode === undefined) {
        dotMode = true;
    }

    if (!IsObjectLike(context)) {
        return defaultValue;
    } else if (key in context) {
        return context[key];
    } else if (dotMode &&
        (Array.isArray(key) || ((typeof (key) === 'string') && (key.indexOf('.') !== -1)))
    ) {
        var keys = (Array.isArray(key)) ? key : key.split('.');
        var value = context;
        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (!IsObjectLike(value)) {
                value = defaultValue;
                break;
            } else if (key in value) {
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

export default GetProperty;
