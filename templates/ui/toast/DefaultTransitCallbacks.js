export default {
    popUp: function (gameObject, duration) {
        gameObject.popUp(duration);
    },

    scaleDown: function (gameObject, duration) {
        gameObject.scaleDownDestroy(duration, undefined, undefined, false);
    },

    fadeIn: function (gameObject, duration) {
        gameObject.fadeIn(duration);
    },

    fadeOut: function (gameObject, duration) {
        gameObject.fadeOut(duration, false);
    },
}