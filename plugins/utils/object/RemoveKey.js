var IsInValidKey = function (keys) {
    return (keys == null) || (keys === '') || (keys.length === 0);
};

var GetEntry = function (target, keys, defaultEntry) {
    var entry = target;
    if (IsInValidKey(keys)) {
        //entry = root;
    } else {
        if (typeof (keys) === 'string') {
            keys = keys.split('.');
        }

        var key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            key = keys[i];
            if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                return;
            }

            entry = entry[key];
        }
    }

    return entry;
};

var RemoveKey = function (target, keys, delimiter) {
    if (delimiter === undefined) {
        delimiter = '.';
    }

    // no object
    if (typeof (target) !== 'object') {
        return;
    }

    // invalid key
    else if (IsInValidKey(keys)) {
    } else {
        if (typeof (keys) === 'string') {
            keys = keys.split(delimiter);
        }

        var lastKey = keys.pop();
        var entry = GetEntry(target, keys);
        if (entry) {
            delete entry[lastKey];
        }
    }

    return target;
};

export default RemoveKey;