var GetValue = function (source, key, defaultValue) {
    if (source === null || typeof source !== 'object') {
        return defaultValue;
    }

    if (typeof key !== 'string' && typeof key !== 'number') {
        return defaultValue;
    }

    var keyPath = String(key);

    // Shortcut:
    // If obj[keyPath] can be read (including prototype chain), return it directly.
    // This also supports literal keys like "a.b".
    if (keyPath in source) {
        return source[keyPath];
    }

    // If there is no dot, we already know it's missing.
    if (keyPath.indexOf('.') === -1) {
        return defaultValue;
    }

    var keys = keyPath.split('.');
    var parent = source;

    for (var index = 0; index < keys.length; index++) {
        var propertyKey = keys[index];

        if (parent === null || typeof parent !== 'object') {
            return defaultValue;
        }

        if (propertyKey in parent) {
            parent = parent[propertyKey];
        } else {
            return defaultValue;
        }
    }

    return parent;
};

export default GetValue;
