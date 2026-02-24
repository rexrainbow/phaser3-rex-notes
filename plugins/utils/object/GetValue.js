var GetValue = function (source, key, defaultValue, altSource) {
    var isValidSource = source && (typeof source === 'object' || typeof source === 'function');
    var isValidAltSource = altSource && (typeof altSource === 'object' || typeof altSource === 'function')

    if (!isValidSource && !isValidAltSource) {
        return defaultValue;
    }

    var keyPath = String(key);

    // Shortcut:
    // If obj[keyPath] can be read (including prototype chain), return it directly.
    // This also supports literal keys like "a.b".
    if (isValidSource && (keyPath in source)) {
        return source[keyPath];
    }
    if (isValidAltSource && (keyPath in altSource)) {
        return altSource[keyPath];
    }

    // If there is no dot, we already know it's missing.
    if (keyPath.indexOf('.') === -1) {
        return defaultValue;
    }

    var keys = keyPath.split('.');

    // 1) Try source path first
    if (isValidSource) {
        var sourceResult = WalkPath(source, keys, defaultValue);
        if (sourceResult.found) {
            return sourceResult.value;
        }
    }

    // 2) Then try altSource path
    if (isValidAltSource) {
        var altSourceResult = WalkPath(altSource, keys, defaultValue);
        if (altSourceResult.found) {
            return altSourceResult.value;
        }
    }

    return defaultValue;
};


var WalkPath = function (source, keys, defaultValue) {
    var parent = source;
    var value = defaultValue;

    var found;
    for (var index = 0, cnt = keys.length; index < cnt; index++) {
        var partKey = keys[index];

        if (parent && (typeof parent === 'object' || typeof parent === 'function')) {
            found = (partKey in parent);
        } else {
            found = false;
        }

        if (!found) {
            WalkPathResult.found = false;
            return WalkPathResult;
        }

        value = parent[partKey];
        parent = value;
    }

    WalkPathResult.found = true;
    WalkPathResult.value = value;
    return WalkPathResult;
};

var WalkPathResult = {}

export default GetValue;
