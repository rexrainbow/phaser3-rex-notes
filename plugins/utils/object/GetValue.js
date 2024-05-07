var GetValue = function (source, key, defaultValue) {
    if (!source || typeof source === 'number') {
        return defaultValue;
    }

    if (typeof (key) === 'string') {
        if (source.hasOwnProperty(key)) {
            return source[key];
        }
        if (key.indexOf('.') !== -1) {
            key = key.split('.');
        } else {
            return defaultValue;
        }
    }

    var keys = key;
    var parent = source;
    var value = defaultValue;

    //  Use for loop here so we can break early
    for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        if (parent.hasOwnProperty(key)) {
            //  Yes it has a key property, let's carry on down
            value = parent[key];

            parent = value;
        }
        else {
            //  Can't go any further, so reset to default
            value = defaultValue;
            break;
        }
    }

    return value;
};

export default GetValue;
