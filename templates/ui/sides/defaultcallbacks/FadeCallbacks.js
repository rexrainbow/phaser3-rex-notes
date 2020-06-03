var GetCallback = function (duration, alpha) {
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            if (reset) {
                sides.fadeChild(child, 0);
            } else {
                sides.fadeChild(child, duration, alpha);
            }
        }
    }
}

export default {
    show: GetCallback,
    hide: GetCallback
}