import GetWrapCallback from './GetWrapCallback.js';
import DelayCall from '../DelayCall.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitTime = function (textPlayer, time, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);

    var timer;

    // Remove all wait events
    textPlayer.once(RemoveWaitEvents, function () {
        if (timer) {
            timer.remove();
            timer = undefined;
        }
    });

    timer = DelayCall(textPlayer, time, wrapCallback);

    textPlayer.emit('wait.time', time);
}

export default WaitTime;