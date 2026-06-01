import IsUnsafePropertyName from './IsUnsafePropertyName.js';

var IsObjectLike = function (value) {
    var valueType = typeof (value);
    return value !== null && (valueType === 'object' || valueType === 'function');
}

var HasOwn = function (context, key) {
    return Object.prototype.hasOwnProperty.call(context, key);
}

var HasProperty = function (context, key, safeMode) {
    if (safeMode) {
        if (IsUnsafePropertyName(key)) {
            throw new Error('Unsafe property access: ' + key);
        }
        return HasOwn(context, key);
    } else {
        return key in context;
    }
}

var GetProperty = function (context, key, defaultValue, dotMode, safeMode) {
    if (dotMode === undefined) {
        dotMode = true;
    }
    if (safeMode === undefined) {
        safeMode = false;
    }

    if (!IsObjectLike(context)) {
        return defaultValue;
    } else if (!Array.isArray(key) && HasProperty(context, key, safeMode)) {
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
            } else if (HasProperty(value, key, safeMode)) {
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
