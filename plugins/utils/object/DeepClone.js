var DeepClone = function (inObject) {
    var outObject;
    var value;
    var key;

    if ((typeof inObject !== 'object') || (inObject === null)) {
        //  inObject is not an object
        return inObject;
    }

    //  Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
        value = inObject[key];

        //  Recursively (deep) copy for nested objects, including arrays
        outObject[key] = DeepClone(value);
    }

    return outObject;
};

export default DeepClone;