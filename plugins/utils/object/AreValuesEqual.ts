var AreValuesEqual = function(obj1?: any, obj2?: any) {
    if (!(IsObjectType(obj1)) || !IsObjectType(obj2)) {
        return false;
    }

    var keys1 = Object.keys(obj1),
        keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every(function(key?: any) {
        if (!obj2.hasOwnProperty(key)) {
            return false;
        }

        var value1 = obj1[key];
        var value2 = obj2[key];
        if (IsObjectType(value1)) {
            return AreValuesEqual(value1, value2);
        }

        return value1 === value2;
    })
}

var IsObjectType = function(value?: any) {
    return (typeof (value) === 'object') && (value !== null);
}

export default AreValuesEqual;