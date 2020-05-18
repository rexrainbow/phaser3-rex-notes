var IsPointInBounds = function (gameObject, x, y, preTest, postTest) {
    // Can't get bounds
    if (!gameObject || !gameObject.getBounds) {
        return false;
    }

    if (preTest && !preTest(gameObject, x, y)) {
        return false;
    }

    globRect = gameObject.getBounds(globRect);

    if (!globRect.contains(x, y)) {
        return false;
    }

    if (postTest && !postTest(gameObject, x, y)) {
        return false;
    }

    return true;
}

var globRect = undefined;

export default IsPointInBounds;