var ExtractByPrefix = function (obj, prefix, out) {
    if (out === undefined) {
        out = {};
    }

    if (!obj) {
        return out;
    }

    for (var key in obj) {
        if (!key.startsWith(prefix)) {
            continue;
        }

        out[key.replace(prefix, '')] = obj[key];
        delete obj[key];
    }
    return out;
}

export default ExtractByPrefix;