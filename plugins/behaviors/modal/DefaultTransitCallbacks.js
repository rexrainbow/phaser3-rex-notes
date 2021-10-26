import PopUp from '../../popup.js';
import ScaleDownDestroy from '../../scale-down-destroy.js';
import FadeIn from '../../fade-in.js';
import FadeOutDestroy from '../../fade-out-destroy.js';

export default {
    popUp: function (gameObject, cover, duration) {
        PopUp(gameObject, duration);

        if (cover) {
            FadeIn(cover, duration, cover.alpha);
        }
    },

    scaleDown: function (gameObject, cover, duration) {
        ScaleDownDestroy(gameObject, duration);

        if (cover) {
            FadeOutDestroy(cover, duration);
        }
    },

    fadeIn: function (gameObject, cover, duration) {
        FadeIn(gameObject, duration);

        if (cover) {
            FadeIn(cover, duration, cover.alpha);
        }
    },

    fadeOut: function (gameObject, cover, duration) {
        FadeOutDestroy(gameObject, duration);

        if (cover) {
            FadeOutDestroy(cover, duration);
        }
    },
}