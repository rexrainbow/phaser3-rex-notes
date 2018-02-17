'use strict'

import Clean from './Clean.js';
import IsArray from './../array/IsArray.js';

/**
 * Shallow Object Clone. Will not clone nested objects.
 * @param {object} obj JSON object
 * @param {object} ret JSON object to return, set null to return a new object
 * @returns {object} this object
 */
var Clone = function (obj, ret) {
    var clone;

    if (ret != null) {
        clone = ret;
        Clean(clone);
    } else {
        clone = (IsArray(obj)) ? [] : {};
    }

    for (var key in obj) {
        if (IsArray(obj[key])) {
            clone[key] = obj[key].slice(0);
        }
        else {
            clone[key] = obj[key];
        }
    }

    return clone;
};

export default Clone;
