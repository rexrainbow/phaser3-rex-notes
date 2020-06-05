var Override = function (newCallback, newScope, oldCallback, oldScope) {
    if (oldCallback) {
        return function () {
            oldCallback.apply(oldScope, arguments);
            newCallback.apply(newScope, arguments);
        }
    } else {
        return newCallback.bind(newScope)
    }
}

export default Override;