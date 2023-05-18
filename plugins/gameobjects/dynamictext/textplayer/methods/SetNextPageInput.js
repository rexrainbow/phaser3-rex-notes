import GetWrapCallback from './utils/wait/GetWrapCallback.js';
import WaitAny from './utils/wait/WaitAny.js';

var SetNextPageInput = function (input) {
    var textPlayer = this;
    if (!input) {
        this.nextPageInput = null;

    } else if (typeof (input) === 'function') {
        this.nextPageInput = function (callback, scope) {
            var wrapCallback = GetWrapCallback(textPlayer, callback, scope);
            input.call(textPlayer, wrapCallback);
        }

    } else {
        this.nextPageInput = function (callback, scope) {
            WaitAny(textPlayer, input, callback, scope);
        }
    }
}

export default SetNextPageInput;