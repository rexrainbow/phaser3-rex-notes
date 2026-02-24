var IsNil = function (value) {
    return value === null || value === undefined;
}

var IsObjectLike = function (value) {
    return value !== null && typeof value === 'object';
};

var NormalizePath = function (path, delimiter) {
    if (Array.isArray(path)) {
        // Do nothing
    } else if (typeof path !== 'string') {
        path = [];
    } else if (path.trim() === '') {
        path = [];
    } else {
        path = path.split(delimiter).filter(Boolean);
    }
    return path;
}

/**
 * Set a nested value into target by path (mutates target).
 *
 * - If keys is a string and does NOT contain delimiter, write directly.
 * - Intermediate non-plain-object values are always overwritten with {}.
 *
 * @param {object} target
 * @param {string|string[]} keys
 * @param {*} value
 * @param {string} [delimiter='.']
 * @returns {object} the same target reference
 */
var SetValue = function (target, keys, value, delimiter = '.') {
    if (!IsObjectLike(target)) {
        return target;
    }

    // Invalid key: no-op; don't replace root
    if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
        return target;
    }

    // Fast path: single key
    if (typeof keys === 'string' && keys.indexOf(delimiter) === -1) {
        target[keys] = value;
        return target;
    }

    var pathSegments = NormalizePath(keys, delimiter);
    if (pathSegments.length === 0) {
        return target;
    }

    var cursor = target;
    var pathSegmentsCount = pathSegments.length;

    for (var index = 0; index < pathSegmentsCount - 1; index++) {
        var segment = pathSegments[index];
        var next = cursor[segment];

        if (!IsObjectLike(next)) {
            // Force overwrite intermediates
            cursor[segment] = {};
        }

        cursor = cursor[segment];
    }

    cursor[pathSegments[pathSegmentsCount - 1]] = value;
    return target;
}

export default SetValue;