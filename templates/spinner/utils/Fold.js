var Fold = function (t, reverse) {
    if (reverse === undefined) {
        reverse = false;
    }

    t = Math.abs(0.5 - t) * 2;
    if (!reverse) {
        t = 1 - t;
    }
    return t;
}

export default Fold;