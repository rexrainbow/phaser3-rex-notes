var SetValue = function () {
    var userID, itemID, key, value;

    switch (arguments.length) {
        case 4: // Set key of an item
            [userID, itemID, key, value] = arguments;
            break;
        case 3: // Set item of an user
            [userID, itemID, value] = arguments;
            break;
        case 2: // Set user data
            [userID, value] = arguments;
            break;
        case 1: // Set all users data
            value = arguments[0];
            break;
        default: // Clear all user data
            value = null;
            break;
    }

    return this.getKeyRef(userID, itemID, key).set(value);
}

export default SetValue;