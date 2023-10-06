var GetOptionIndex = function (options, value) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        if (option.value === value) {
            return i;
        }
    }
    return undefined;
}

var GetOption = function (options, value) {
    var index = GetOptionIndex(options, value);
    if (index == null) {
        return undefined;
    }

    return options[index];
}

export {
    GetOptionIndex,
    GetOption,
}