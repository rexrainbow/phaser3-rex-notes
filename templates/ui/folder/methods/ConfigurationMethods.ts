import ScaleMethods from '../../basesizer/ScaleMethods';

var DefaultExpandCallback = function(gameObject?: any, duration?: any) {
    ScaleMethods.popUp.call(gameObject, duration, this.expandDirection);
};

var DefaultCollapseCallback = function(gameObject?: any, duration?: any) {
    ScaleMethods.scaleDown.call(gameObject, duration, this.expandDirection)
}

export default {
    setTransitionDuration(duration?: any) {
        this.transitionDuration = duration;

        this.childTransition
            .setTransitInTime(duration)
            .setTransitOutTime(duration);

        return this;
    },

    setExpandCallback(callback?: any) {
        if (callback === undefined) {
            callback = DefaultExpandCallback.bind(this);
        }
        this.childTransition.setTransitInCallback(callback);
        return this;
    },

    setCollapseCallback(callback?: any) {
        if (callback === undefined) {
            callback = DefaultCollapseCallback.bind(this);
        }
        this.childTransition.setTransitOutCallback(callback);
        return this;
    }
}