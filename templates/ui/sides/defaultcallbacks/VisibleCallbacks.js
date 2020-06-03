var GetCallback = function () {
    return function (child, key, sides, reset) {
        if (key !== 'panel') {
            sides.setChildVisible(child);
        }
    }
}

export default {
    show: GetCallback,
    hide: GetCallback
}