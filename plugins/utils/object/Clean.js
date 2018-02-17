'use strict'

import IsArray from './../array/IsArray.js';
var Clean = function (obj) {
    if (IsArray(obj)) {
        obj.length = 0;
    } else {
        for (var key in obj) {
            delete obj[key];
        }
    }
}
export default Clean;