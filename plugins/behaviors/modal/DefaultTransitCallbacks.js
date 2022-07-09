import PopUp from '../../popup.js';
import ScaleDownDestroy from '../../scale-down-destroy.js';
import FadeIn from '../../fade-in.js';
import FadeOutDestroy from '../../fade-out-destroy.js';

export default {
    popUp: PopUp,

    scaleDown: function (gameObject, duration) {
        // Don't destroy here
        ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
    },

    fadeIn: FadeIn,

    fadeOut: function (gameObject, duration) {
        // Don't destroy here
        FadeOutDestroy(gameObject, duration, false);
    },
}