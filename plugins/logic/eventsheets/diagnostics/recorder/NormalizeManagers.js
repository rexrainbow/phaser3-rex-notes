var NormalizeManagers = function (manager, managers) {
    var output;

    if (managers === undefined) {
        if (manager === undefined) {
            return [];
        } else if (Array.isArray(manager)) {
            output = manager.slice();
        } else {
            output = [manager];
        }
    } else if (Array.isArray(managers)) {
        output = managers.slice();
    } else {
        output = [managers];
    }

    return output.filter(function (manager) {
        return !!manager;
    });
}

export default NormalizeManagers;
