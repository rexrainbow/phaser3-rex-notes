import Clear from './Clear.js';

/**
 * Shallow Object Clone. Will not clone nested objects.
 * @param {object} obj JSON object
 * @param {object} ret JSON object to return, set null to return a new object
 * @returns {object} this object
 */
var Clone = function (obj, ret) {
    var clone;
    var objIsArray = Array.isArray(obj);

    if (ret != null) {
        clone = ret;
        Clear(clone);
    } else {
        clone = (objIsArray) ? [] : {};
    }

    if (objIsArray) {
        clone.length = obj.length;
    }
    for (var key in obj) {
        clone[key] = obj[key];
    }

    return clone;
};

export default Clone;
