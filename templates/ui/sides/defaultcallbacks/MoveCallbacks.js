var GetCallback = function (duration, ease) {
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            if (reset) {
                sides.moveChild(child, 0);
            } else {
                sides.moveChild(child, duration, ease);
            }
        }
    }
}

export default {
    show: GetCallback,
    hide: GetCallback
}