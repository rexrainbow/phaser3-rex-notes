import DefaultTransitCallbacks from './DefaultTransitCallbacks';

var SetTransitInCallback = function (callback) {
    if (callback === undefined) {
        callback = DefaultTransitCallbacks.popUp;
    }

    this.transitInCallback = callback;
    // callback = function(gameObject, duration) {}
    return this;
}

export default SetTransitInCallback;