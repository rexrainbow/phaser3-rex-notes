// For when you absolutely know this Set won't be modified during the iteration.
var Iterate = function (set, callback, scope) {
    var i = 0;
    for (var value of set) {
        if (scope) {
            if (callback.call(scope, value, i) === false) {
                break;
            }
        } else {
            if (callback(value, i) === false) {
                break
            };
        }

        i++;
    }
}

export default Iterate;