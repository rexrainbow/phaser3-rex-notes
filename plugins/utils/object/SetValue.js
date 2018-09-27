var isInValidKey = function (keys) {
    return (keys == null) || (keys === "") || (keys.length === 0);
};

var getEntry = function (target, keys, defaultEntry) {
    if (defaultEntry === undefined) {
        defaultEntry = {};
    }
    var entry = target;
    if (isInValidKey(keys)) {
        //entry = root;
    } else {
        if (typeof (keys) === "string") {
            keys = keys.split(".");
        }

        var key;
        for (var i = 0, cnt = keys.length; i < cnt; i++) {
            key = keys[i];
            if ((entry[key] == null) || (typeof (entry[key]) !== "object")) {
                var newEntry;
                if (i === cnt - 1) {
                    newEntry = defaultEntry;
                } else {
                    newEntry = {};
                }

                entry[key] = newEntry;
            }

            entry = entry[key];
        }
    }

    return entry;
};
var SetValue = function (target, keys, value) {
    // no object
    if (typeof (target) !== "object") {
        return;
    }

    // invalid key
    else if (isInValidKey(keys)) {
        // don't erase target
        if (value == null) {
            return;
        }
        // set target to another object
        else if (typeof (value) === "object") {
            target = value;
        }
    } else {
        if (typeof (keys) === "string") {
            keys = keys.split(".");
        }

        var lastKey = keys.pop();
        var entry = getEntry(target, keys);
        entry[lastKey] = value;
    }
};

export default SetValue;