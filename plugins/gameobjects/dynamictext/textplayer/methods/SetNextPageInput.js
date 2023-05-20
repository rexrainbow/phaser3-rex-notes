import WaitAny from './utils/wait/WaitAny.js';

var SetNextPageInput = function (input) {
    var textPlayer = this;
    if (!input) {
        this.nextPageInput = null;

    } else if (typeof (input) === 'function') {
        this.nextPageInput = function (callback, scope) {
            var waitEventManager = textPlayer.waitEventManager;
            waitEventManager
                .clearWaitCompleteCallbacks()
                .addWaitCompleteCallback(callback, scope)

            var waitCompleteTriggerCallback = waitEventManager.getWaitCompleteTriggerCallback();
            input.call(textPlayer, waitCompleteTriggerCallback);
        }

    } else {
        this.nextPageInput = function (callback, scope) {
            WaitAny(textPlayer, input, callback, scope);
        }
    }
}

export default SetNextPageInput;