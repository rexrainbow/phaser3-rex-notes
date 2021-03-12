var GetProperty = function (context, key, defaultValue, dotMode) {
    if (!context) {
        return defaultValue;
    } else if (context.hasOwnProperty(key) || context[key]) {
        return context[key];
    } else if (dotMode && key.indexOf('.') !== -1) {
        var keys = key.split('.');
        var parent = context;
        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (parent.hasOwnProperty(key) || parent[key]) {
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
    } else {
        return defaultValue;
    }
}

export default GetProperty;