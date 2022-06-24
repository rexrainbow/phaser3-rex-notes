import GetWrapCallback from './GetWrapCallback.js';
import DelayCall from '../DelayCall.js';
import { RemoveWaitEvents } from '../Events.js';

var WaitTime = function (tagPlayer, time, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope, 'time');

    var timer;

    // Remove all wait events
    tagPlayer.once(RemoveWaitEvents, function () {
        if (timer) {
            timer.remove();
            timer = undefined;
        }
    });

    timer = DelayCall(tagPlayer, time, wrapCallback);

    tagPlayer.emit('wait.time', time);
}

export default WaitTime;