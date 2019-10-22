import IsFunction from './IsFunction.js';

var CountMatching = function (obj, cmpValue) {
    var value, total = 0, isEqual;
    var isFunction = IsFunction(cmpValue);
    for (var k in obj) {
        value = obj[k];
        if (isFunction) {
            isEqual = cmpValue(value, k)
        } else {
            isEqual = (value === cmpValue);
        }

        total += (isEqual) ? 1 : 0;
    }

    return total;
}

export default CountMatching;