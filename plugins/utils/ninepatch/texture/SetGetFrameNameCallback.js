import DefaultGetFrameNameCallback from '../utils/DefaultGetFrameNameCallback.js';

var SetGetFrameNameCallback = function (callback) {
    if (callback === undefined) {
        callback = DefaultGetFrameNameCallback;
    }
    this.getFrameNameCallback = callback;
    return this;
}

export default SetGetFrameNameCallback;