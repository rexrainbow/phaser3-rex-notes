import GetWrapCallback from '../utils/wait/GetWrapCallback.js';
import WaitTime from '../utils/wait/WaitTime.js';
import WaitClick from '../utils/wait/WaitClick.js';
import WaitKey from '../utils/wait/WaitKey.js';
import WaitMultiple from '../utils/wait/WaitMultiple.js';

var SetNextPageInput = function (input) {
    var textPlayer = this;

    if (typeof (input) === 'function') {
        this.nextPageInput = function (callback, args, scope) {
            var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);
            input.call(textPlayer, wrapCallback);
        }

    } else if (typeof (input) === 'number') {
        this.nextPageInput = function (callback, args, scope) {
            WaitTime(textPlayer, input, callback, args, scope);
        }

    } else if ((input.length > 1) && (input.indexOf('|') !== -1)) {
        this.nextPageInput = function (callback, args, scope) {
            WaitMultiple(textPlayer, input, callback, args, scope);
        }

    } else if (input === 'click') {
        this.nextPageInput = function (callback, args, scope) {
            WaitClick(textPlayer, callback, args, scope);
        }

    } else {
        this.nextPageInput = function (callback, args, scope) {
            WaitKey(textPlayer, input, callback, args, scope);
        }

    }
}

export default SetNextPageInput;