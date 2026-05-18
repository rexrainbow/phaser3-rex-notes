import NOOP from '../../../utils/object/NOOP';

export default {
    setTransitInTime(time?: any) {
        this.transitInTime = time;
        return this;
    },

    setTransitOutTime(time?: any) {
        this.transitOutTime = time;
        return this;
    },

    setTransitInCallback(callback?: any) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitInCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

    setTransitOutCallback(callback?: any) {
        if (!callback) {
            callback = NOOP;
        }

        this.transitOutCallback = callback;
        // callback = function(gameObject?: any, duration?: any) {}
        return this;
    },

}