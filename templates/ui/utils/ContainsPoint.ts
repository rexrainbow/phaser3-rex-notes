import IsPointInBounds from '../../../plugins/utils/bounds/IsPointInBounds';

var ContainsPoint = function(gameObject?: any, x?: any, y?: any, preTest?: any, postTest?: any) {
    return IsPointInBounds(
        gameObject,
        x, y,
        GetPreTestCallback(preTest),
        postTest
    );
}

var IsShownSizer = function(gameObject?: any) {
    var isHiddenSizer = gameObject.rexSizer && gameObject.rexSizer.hidden;
    return !isHiddenSizer;
}

var GetPreTestCallback = function(preTest?: any) {
    if (!preTest) {
        return IsShownSizer;
    }

    return function(gameObject?: any, x?: any, y?: any) {
        if (!IsShownSizer(gameObject)) {
            return false;
        }
        preTest(gameObject, x, y);
        return true;
    }
}

export default ContainsPoint;