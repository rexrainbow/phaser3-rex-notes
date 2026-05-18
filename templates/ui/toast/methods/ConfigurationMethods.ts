import DefaultTransitionCallbacks from './DefaultTransitionCallbacks';
import NOOP from '../../../../plugins/utils/object/NOOP';
import TransitionMode from './TransitionMode';

export default {    
    setDisplayTime(time?: any) {
        this.displayTime = time;
        return this;
    },

    setTransitOutTime(time?: any) {
        this.transitOutTime = time;
        return this;
    },

    setTransitInTime(time?: any) {
        this.transitInTime = time;
        return this;
    },

    setTransitInCallback(callback?: any) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback?: any) {
            case TransitionMode.popUp:
                callback = DefaultTransitionCallbacks.popUp;
                break;
            case TransitionMode.fadeIn:
                callback = DefaultTransitionCallbacks.fadeIn;
                break;
        }

        if (!callback) {
            callback = NOOP;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    setTransitOutCallback(callback?: any) {
        if (typeof (callback) === 'string') {
            callback = TransitionMode[callback];
        }

        switch (callback?: any) {
            case TransitionMode.scaleDown:
                callback = DefaultTransitionCallbacks.scaleDown;
                break;
            case TransitionMode.fadeOut:
                callback = DefaultTransitionCallbacks.fadeOut;
                break;
        }

        if (!callback) {
            callback = NOOP;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

}