import PopUp from '../../popup';
import ScaleDownDestroy from '../../scale-down-destroy';
import FadeIn from '../../fade-in';
import FadeOutDestroy from '../../fade-out-destroy';

export default {
    popUp(gameObject?: any, duration?: any) {
        if (gameObject._modalScaleSave !== undefined) {
            gameObject.scaleX = gameObject._modalScaleSave;
            gameObject.scaleY = gameObject._modalScaleSave;
        } else {
            gameObject._modalScaleSave = gameObject.scaleX;
        }

        PopUp(gameObject, duration);
    },

    scaleDown(gameObject?: any, duration?: any) {
        // Don't destroy here
        ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
    },

    fadeIn(gameObject?: any, duration?: any) {
        if (gameObject._modalAlphaSave !== undefined) {
            gameObject.alpha = gameObject._modalAlphaSave;
        } else {
            gameObject._modalAlphaSave = gameObject.alpha;
        }

        FadeIn(gameObject, duration);
    },

    fadeOut(gameObject?: any, duration?: any) {
        // Don't destroy here
        FadeOutDestroy(gameObject, duration, false);
    },
}