import DeepClone from './DeepClone';

var DeepMerge = function(toObj?: any, fromObj?: any) {
    if (fromObj === undefined) {
        return toObj;
    }

    for (var key in fromObj) {
        if (!toObj.hasOwnProperty(key)) {
            // Only add nonexistent property
            toObj[key] = DeepClone(fromObj[key]);
        } else {
            var value = toObj[key];
            if (value && (typeof (value) === 'object')) {
                DeepMerge(value, fromObj[key]);
            }
        }
    }
    return toObj;
}

export default DeepMerge;