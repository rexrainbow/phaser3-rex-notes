var GetOptionText = function (options, value) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        if (option.value === value) {
            return option.text;
        }
    }
    return undefined;
}

var GetOptionValue = function (options, text) {
    for (var i = 0, cnt = options.length; i < cnt; i++) {
        var option = options[i];
        if (option.text === text) {
            return option.value;
        }
    }
    return undefined;
}

export {
    GetOptionText, GetOptionValue
}