var HasProperty = function (obj, prop) {
    if (!obj) {
        return false;
    }

    if (obj.hasOwnProperty(prop)) {
        return true;
    }

    while (obj) {
        if (Object.getOwnPropertyDescriptor(obj, prop)) {
            return true;
        }
        obj = obj.__proto__;
    }

    return false;
}

export default HasProperty;