var HasProperty = function(obj?: any, prop?: any) {
    if (!obj) {
        return false;
    }

    if (obj.hasOwnProperty(prop)) {
        return true;
    }

    while (obj?: any) {
        if (Object.getOwnPropertyDescriptor(obj, prop)) {
            return true;
        }
        obj = obj.__proto__;
    }

    return false;
}

export default HasProperty;