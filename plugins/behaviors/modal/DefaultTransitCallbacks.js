import PopUp from '../../popup.js';
import ScaleDownDestroy from '../../scale-down-destroy.js';
import FadeIn from '../../fade-in.js';
import FadeOutDestroy from '../../fade-out-destroy.js';

export default {
    popUp: function (gameObject, duration) {
        PopUp(gameObject, duration);
    },

    scaleDown: function (gameObject, duration) {
        // Don't destroy here
        ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
    },

    fadeIn: function (gameObject, duration) {
        FadeIn(gameObject, duration);
    },

    fadeOut: function (gameObject, duration) {
        // Don't destroy here
        FadeOutDestroy(gameObject, duration, false);
    },
}