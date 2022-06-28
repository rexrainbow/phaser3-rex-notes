import DefaultTransitCallbacks from './DefaultTransitCallbacks';

var SetTransitOutCallback = function (callback) {
    if (callback === undefined) {
        callback = DefaultTransitCallbacks.scaleDownDestroy;
    }

    this.transitOutCallback = callback;
    // callback = function(gameObject, duration) {}
    return this;
}

export default SetTransitOutCallback;