import ScaleMethods from '../../basesizer/ScaleMethods.js';
import FadeMethods from '../../basesizer/FadeMethods.js';

export default {
    transitIn(gameObject, duration, parent) {
        switch (parent.queueDirection) {
            case 0:  // bottom-to-top
                gameObject.setOrigin(0.5, 1);
                ScaleMethods.popUp.call(gameObject, duration, 'y');
                break;
            case 1:  // top-to-bottom
                gameObject.setOrigin(0.5, 0);
                ScaleMethods.popUp.call(gameObject, duration, 'y');
                break;
            case 2: // right-to-left
                gameObject.setOrigin(1, 0.5);
                ScaleMethods.popUp.call(gameObject, duration, 'x');
                break;
            case 3: // left-to-right
                gameObject.setOrigin(0, 0.5);
                ScaleMethods.popUp.call(gameObject, duration, 'x');
                break;
        }

        FadeMethods.fadeIn.call(gameObject, duration);
    },

    transitOut(gameObject, duration, parent) {
        FadeMethods.fadeOut.call(gameObject, duration);
    }
}