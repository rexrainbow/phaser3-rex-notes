function DeepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        // If obj is a primitive value or null, return it directly
        return obj;
    }

    if (Array.isArray(obj)) {
        // If obj is an array, create a new array and clone each element
        return obj.map(item => DeepClone(item));
    }

    if (obj instanceof Date) {
        // If obj is a Date object, create a new Date object with the same value
        return new Date(obj);
    }

    if (obj instanceof RegExp) {
        // If obj is a RegExp object, create a new RegExp object with the same pattern and flags
        return new RegExp(obj);
    }

    if (Object.getPrototypeOf(obj) !== Object.prototype) {
        // If obj is a custom object, return a reference to it
        return obj;
    }

    // If obj is a plain object, create a new object and clone each property
    const clonedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = DeepClone(obj[key]);
        }
    }
    return clonedObj;
}

export default DeepClone;