var SetValue = function () {
    var page, row, col, value;

    switch (arguments.length) {
        case 4: // Set col of an item
            [page, row, col, value] = arguments;
            break;
        case 3: // Set item of an user
            [page, row, value] = arguments;
            break;
        case 2: // Set user data
            [page, value] = arguments;
            break;
        case 1: // Set all users data
            value = arguments[0];
            break;
        default: // Clear all user data
            value = null;
            break;
    }

    return this.getKeyRef(page, row, col).set(value);
}

export default SetValue;