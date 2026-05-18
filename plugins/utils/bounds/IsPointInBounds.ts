import { GetBounds } from './GetBounds';

var IsPointInBounds = function(gameObject?: any, x?: any, y?: any, preTest?: any, postTest?: any) {
    // Can't get bounds
    if (!gameObject) {
        return false;
    }

    if (preTest && !preTest(gameObject, x, y)) {
        return false;
    }

    var boundsRect = GetBounds(gameObject, true);
    if (!boundsRect.contains(x, y)) {
        return false;
    }

    if (postTest && !postTest(gameObject, x, y)) {
        return false;
    }

    return true;
}

export default IsPointInBounds;