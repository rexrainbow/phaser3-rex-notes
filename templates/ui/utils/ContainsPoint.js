import IsPointInBounds from '../../../plugins/utils/bounds/IsPointInBounds.js';

var ContainsPoint = function (gameObject, x, y, preTest, postTest) {
    return IsPointInBounds(
        gameObject,
        x, y,
        GetPreTestCallback(preTest),
        postTest
    );
}

var IsShownSizer = function (gameObject) {
    var isHiddenSizer = gameObject.rexSizer && gameObject.rexSizer.hidden;
    return !isHiddenSizer;
}

var GetPreTestCallback = function (preTest) {
    if (!preTest) {
        return IsShownSizer;
    }

    return function (gameObject, x, y) {
        if (!IsShownSizer(gameObject)) {
            return false;
        }
        preTest(gameObject, x, y);
        return true;
    }
}

export default ContainsPoint;