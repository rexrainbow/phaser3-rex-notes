import { RemoveWaitEvents } from '../Events.js';

var GetWrapCallback = function (textPlayer, callback, scope, removeFrom) {
    return function () {
        textPlayer.emit(RemoveWaitEvents, removeFrom); // Remove all wait events
        callback.call(scope);
    }
}
export default GetWrapCallback;