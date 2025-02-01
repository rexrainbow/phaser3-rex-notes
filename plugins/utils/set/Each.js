// Use this function when you know this Set will be modified during the iteration, otherwise use `iterate`.
var Each = function (set, callback, scope) {
    set = Array.from(set); // Clone one
    for (var i = 0, cnt = set.length; i < cnt; i++) {
        if (scope) {
            if (callback.call(scope, set[i], i) === false) {
                break;
            }
        } else {
            if (callback(set[i], i) === false) {
                break
            };
        }
    }
}

export default Each;